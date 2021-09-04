import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Content.scss';

import ContentComponent from 'components/content/Content';
import Link from 'components/link/Link';

const defaultProps = {
    className: '',
    content: [],
    contentMore: [],
    linkText: '',
    linkUrl: {},
    title: [],
};

const propTypes = {
    className: PropTypes.string,
    content: PropTypes.array,
    contentMore: PropTypes.array,
    linkText: PropTypes.string,
    linkUrl: PropTypes.object,
    title: PropTypes.array,
};

function Content({
    className,
    content,
    contentMore,
    linkText,
    linkUrl,
    title,
}) {
    const [isShowingMoreContent, setIsShowingMoreContent] = useState(false);
    const [toggleButtonText, setToggleButtonText] = useState('Read more');

    function toggleMoreContent() {
        setIsShowingMoreContent(!isShowingMoreContent);
        isShowingMoreContent ? setToggleButtonText('Read more') : setToggleButtonText('Read less');
    }

    return (
        <>
            <div className={`content ${className}`}>
                {title?.[0]?.text && (
                    <ContentComponent className="intro" content={title} />
                )}
                {content?.[0]?.text && (
                    <ContentComponent className="text" content={content} />
                )}
                {(content?.[0]?.text && contentMore?.[0]?.text) && (
                    <button className="read-more" onClick={toggleMoreContent} type="button">{toggleButtonText}</button>
                )}
                {(contentMore?.[0]?.text && isShowingMoreContent) && (
                    <ContentComponent className="text" content={contentMore} />
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