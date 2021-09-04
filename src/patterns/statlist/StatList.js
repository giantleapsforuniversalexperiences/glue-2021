import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './StatList.scss';

import Content from 'components/content/Content';
import Link from 'components/link/Link';

const defaultProps = {
    className: '',
    items: [],
};

const propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
};

function StatList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`tiles ${className}`}>
                {items.map(({ stat_list_content, stat_list_link_text, stat_list_link_url, stat_list_stat_text }) => {
                    index++;
                    const content = stat_list_content?.raw;
                    const linkText = stat_list_link_text?.text;
                    const linkUrl = stat_list_link_url;
                    const statText = stat_list_stat_text?.text;

                    return (
                        <div className="tile" key={`${statText}${index}`}>
                            {statText && (
                                <h3>{statText}</h3>
                            )}
                            {content?.[0]?.text && (
                                <Content content={content} />
                            )}
                            {(linkText && (linkUrl?.url || linkUrl?.uid)) && (
                                <div className="link-wrapper">
                                    <Link className="link" to={linkUrl}>{linkText}</Link>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

StatList.propTypes = propTypes;
StatList.defaultProps = defaultProps;

export default StatList;