import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Image.scss';

import Content from 'components/content/Content';
import ImageComponent from 'components/image/Image';

const defaultProps = {
    caption: [],
    className: '',
    image: {},
};

const propTypes = {
    caption: PropTypes.array,
    className: PropTypes.string,
    image: PropTypes.object,
};

function Image({
    caption,
    className,
    image,
}) {
    const imageAlt = (image?.alt) ? image?.alt : '';
    const imageHeight = image?.dimensions?.height;
    const imageUrl = image?.url;
    const imageWidth = image?.dimensions?.width;

    return (
        <>
            {imageUrl && (
                <figure className={`image ${className}`}>
                    <ImageComponent
                        image={{
                            alt: imageAlt,
                            dimensions: {
                                height: imageHeight,
                                width: imageWidth,
                            },
                            url: imageUrl,
                        }}
                        size="xxxlarge"
                    />
                    {caption?.[0]?.text && (
                        <figcaption>
                            <Content content={caption} />
                        </figcaption>
                    )}
                </figure>
            )}
        </>
    );
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;