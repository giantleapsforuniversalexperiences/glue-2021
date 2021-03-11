import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './ContentImageList.scss';

const Content = loadable(() => import('components/content/Content'));
const Image = loadable(() => import('components/image/Image'));

const defaultProps = {
    className: '',
    items: [],
};

const propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
};

function ContentImageList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`tiles ${className}`}>
                {items.map(({ content_image_list_content, content_image_list_image, content_image_list_title }) => {
                    index++;
                    const content = content_image_list_content?.raw;
                    const image = content_image_list_image;
                    const imageAlt = (image?.alt) ? image?.alt : '';
                    const imageHeight = image?.dimensions?.height;
                    const imageUrl = image?.url;
                    const imageWidth = image?.dimensions?.width;
                    const title = content_image_list_title?.raw;

                    return (
                        <div className="tile" key={`${title}${index}`}>
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
                                        size="medium"
                                    />
                                </div>
                            )}
                            {title?.[0]?.text && (
                                <Content content={title} />
                            )}
                            {content?.[0]?.text && (
                                <Content content={content} />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

ContentImageList.propTypes = propTypes;
ContentImageList.defaultProps = defaultProps;

export default ContentImageList;