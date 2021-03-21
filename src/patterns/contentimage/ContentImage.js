import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './ContentImage.scss';

const Content = loadable(() => import('components/content/Content'));
const Image = loadable(() => import('components/image/Image'));
const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
    content: [],
    image: {},
    linkText: [],
    linkUrl: {},
    title: [],
};

const propTypes = {
    className: PropTypes.string,
    content: PropTypes.array,
    image: PropTypes.object,
    linkText: PropTypes.array,
    linkUrl: PropTypes.object,
    title: PropTypes.array,
};

function ContentImage({
    className,
    content,
    image,
    linkText,
    linkUrl,
    title
}) {
    const imageAlt = (image?.alt) ? image?.alt : '';
    const imageHeight = image?.dimensions?.height;
    const imageUrl = image?.url;
    const imageWidth = image?.dimensions?.width;

    return (
        <>
            <div className={`content-list ${className}`}>
                <div className="content-block">
                    {title?.[0]?.text && (
                        <Content content={title} />
                    )}
                    {content?.[0]?.text && (
                        <Content content={content} />
                    )}
                    {(linkText && (linkUrl?.url || linkUrl?.uid)) && (
                        <div className="link-block">
                            <Link className="link" to={linkUrl}><Content content={linkText} /></Link>
                        </div>
                    )}
                </div>
                <div className="content-block">
                    {imageUrl && (
                        <div className="hero-wrapper">
                            <Image
                                image={{
                                    alt: imageAlt,
                                    dimensions: {
                                        height: imageHeight,
                                        width: imageWidth,
                                    },
                                    url: imageUrl,
                                }}
                                size="xlarge"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

ContentImage.propTypes = propTypes;
ContentImage.defaultProps = defaultProps;

export default ContentImage;