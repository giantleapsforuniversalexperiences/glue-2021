import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';

const defaultProps = {
    className: '',
    image: {},
    size: '',
};

const propTypes = {
    className: PropTypes.string,
    image: PropTypes.PropTypes.shape({
        alt: PropTypes.string,
        dimensions: PropTypes.shape({
            height: PropTypes.number,
            width: PropTypes.number,
        }),
        url: PropTypes.string,
    }),
    size: PropTypes.string,
};

function Image({
    className,
    image,
    size,
}) {
    const imageAlt = (image.alt) ? image.alt : '';
    const imageHeight = image?.dimensions?.height;
    const imageUrl = image?.url;
    const imageWidth = image?.dimensions?.width;
    let supportsPicture = true;
    const losslessWebp = true;
    const qualityDefault = 65;
    const qualityWebp = 65;
    const extension = imageUrl.split('.').pop().split('?')[0];

    if (typeof window !== 'undefined') {
        supportsPicture = window?.HTMLPictureElement ? true : null;
    }

    const defaultImagePath = (function(size) {
        switch(size) {
            case 'xlarge':
                return `${imageUrl}&q=${qualityDefault}&w=375 375w, ${imageUrl}&q=${qualityDefault}&w=480 480w, ${imageUrl}&q=${qualityDefault}&w=768 768w, ${imageUrl}&q=${qualityDefault}&w=960 960w, ${imageUrl}&q=${qualityDefault}&w=1280 1280w, ${imageUrl}&q=${qualityDefault}&w=1920 1920w`;
            case 'large':
                return `${imageUrl}&q=${qualityDefault}&w=375 375w, ${imageUrl}&q=${qualityDefault}&w=480 480w, ${imageUrl}&q=${qualityDefault}&w=768 768w, ${imageUrl}&q=${qualityDefault}&w=960 960w, ${imageUrl}&q=${qualityWebp}&w=1280 1280w`;
            case 'medium':
                return `${imageUrl}&q=${qualityDefault}&w=375 375w, ${imageUrl}&q=${qualityDefault}&w=480 480w, ${imageUrl}&q=${qualityDefault}&w=768 768w`;
            case 'small':
                return `${imageUrl}&q=${qualityDefault}&w=375 375w, ${imageUrl}&q=${qualityDefault}&w=480 480w`;
            case 'xsmall':
                return `${imageUrl}&q=${qualityDefault}&w=375 375w`;
            default:
                return `${imageUrl}&q=${qualityDefault}&w=375 375w, ${imageUrl}&q=${qualityDefault}&w=480 480w, ${imageUrl}&q=${qualityDefault}&w=768 768w, ${imageUrl}&q=${qualityDefault}&w=960 960w`;
        }
    })(size);
    const webpImagePath = (function(size) {
        switch(size) {
            case 'xlarge':
                return `${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=375 375w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=480 480w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=768 768w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=960 960w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=1280 1280w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=1920 1920w`;
            case 'large':
                return `${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=375 375w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=480 480w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=768 768w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=960 960w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=1280 1280w`;
            case 'medium':
                return `${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=375 375w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=480 480w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=768 768w`;
            case 'small':
                return `${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=375 375w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=480 480w`;
            case 'xsmall':
                return `${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=375 375w`;
            default:
                return `${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=375 375w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=480 480w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=768 768w, ${imageUrl}&fm=webp&lossless=${losslessWebp}&q=${qualityWebp}&w=960 960w`;
        }
    })(size);
    const sizes = (function(size) {
        switch(size) {
            case 'xlarge':
                return '1920px';
            case 'large':
                return '1280px';
            case 'medium':
                return '768px';
            case 'small':
                return '480px';
            case 'xsmall':
                return '375px';
            default:
                return '960px';
        }
    })(size);

    return (
        <>
            <div className={`img ${className}`}>
                {imageUrl && (
                    <>
                        {supportsPicture && (
                            <GatsbyImage
                                alt={imageAlt}
                                image={{
                                    height: imageHeight,
                                    images: {
                                        fallback: {
                                            src: `${imageUrl}&q=${qualityDefault}`,
                                            srcSet: defaultImagePath,
                                            sizes: `(min-width: ${sizes}) ${sizes}, 100vw`
                                        },
                                        sources: [
                                            {
                                                srcSet: webpImagePath,
                                                sizes: `(min-width: ${sizes}) ${sizes}, 100vw`,
                                                type: 'image/webp'
                                            }
                                        ],
                                    },
                                    layout: 'constrained',
                                    width: imageWidth,
                                }}
                            />
                        )}
                        {!supportsPicture && (
                            <img alt={imageAlt} src={`${imageUrl}&q=${qualityDefault}&w=1280`} />
                        )}
                    </>
                )}
            </div>
        </>
    );
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;