import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './LinkList.scss';

const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
    items: [],
};

const propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
};

function LinkList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`link-block ${className}`}>
                {items.map(({ link_list_link_text, link_list_link_url }) => {
                    index++;
                    const linkText = link_list_link_text?.text;
                    const linkUrl = link_list_link_url;

                    return (
                        <div className="link-wrapper" key={`${linkText}${index}`}>
                            <Link className="link" to={linkUrl}>{linkText}</Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

LinkList.propTypes = propTypes;
LinkList.defaultProps = defaultProps;

export default LinkList;