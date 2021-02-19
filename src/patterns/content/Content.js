import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Content.scss';

const ContentComponent = loadable(() => import('components/content/Content'));
const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
    content: [],
    linkText: '',
    linkUrl: {},
    title: [],
};

const propTypes = {
    className: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.object,
    content: PropTypes.array,
    title: PropTypes.array,
};

function Content({
    className,
    content,
    linkText,
    linkUrl,
    title,
}) {
    return (
        <>
            <div className={`content ${className}`}>
                {title.length > 0 && (
                    <ContentComponent className="intro" content={title} />
                )}
                {content && (
                    <ContentComponent className="text" content={content} />
                )}
                {(linkText && (linkUrl?.url || linkUrl?.uid)) && (
                    <div className="link-wrapper">
                        <Link className="link" to={linkUrl}>{linkText}</Link>
                    </div>
                )}
            </div>
        </>
    );
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;