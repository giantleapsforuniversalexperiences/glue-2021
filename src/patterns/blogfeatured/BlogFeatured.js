import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import Image from 'components/image/Image';

import './BlogFeatured.scss';

// const Image = loadable(() => import('components/image/Image'));
const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
    date: '',
    image: {},
    linkUrl: {},
    title: '',
};

const propTypes = {
    className: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.object,
    linkUrl: PropTypes.object,
    title: PropTypes.string,
};

function Blockquote({
    className,
    date,
    image,
    linkUrl,
    title,
}) {
    const imageAlt = (image?.alt) ? image?.alt : '';
    const imageHeight = image?.dimensions?.height;
    const imageUrl = image?.url;
    const imageWidth = image?.dimensions?.width;

    return (
        <>
            <div className="featured-tile">
                <Link to={linkUrl}>
                    {imageUrl && (
                        <Image
                            image={{
                                alt: imageAlt,
                                dimensions: {
                                    height: imageHeight,
                                    width: imageWidth,
                                },
                                url: imageUrl,
                            }}
                            size="large"
                        />
                    )}
                    {(title || date) && (
                        <div className="hero-wrapper">
                            {title && (
                                <h3>{title}</h3>
                            )}
                            {date && (
                                <p className="date"><span>{date}</span></p>
                            )}
                        </div>
                    )}
                </Link>
            </div>
        </>
    );
}

Blockquote.propTypes = propTypes;
Blockquote.defaultProps = defaultProps;

export default Blockquote;