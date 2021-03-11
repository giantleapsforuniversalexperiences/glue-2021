import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './MastheadBlog.scss';

const Image = loadable(() => import('components/image/Image'));

const defaultProps = {
    date: '',
    image: {},
    title: '',
};

const propTypes = {
    date: PropTypes.string,
    image: PropTypes.object,
    title: PropTypes.string,
};

function MastheadBlog({
    date,
    image,
    title,
}) {
    const imageAlt = (image?.alt) ? image?.alt : '';
    const imageHeight = image?.dimensions?.height;
    const imageUrl = image?.url;
    const imageWidth = image?.dimensions?.width;

    return (
        <>
            <div className="masthead-blog">
                {date && (
                    <p className="date"><span>{date}</span></p>
                )}
                {title && (
                    <h1>{title}</h1>
                )}
                {imageUrl && (
                    <figure>
                        <Image
                            image={{
                                alt: imageAlt,
                                dimensions: {
                                    height: imageHeight,
                                    width: imageWidth,
                                },
                                url: imageUrl,
                            }}
                            size="xxlarge"
                        />
                    </figure>
                )}
            </div>
        </>
    );
}

MastheadBlog.propTypes = propTypes;
MastheadBlog.defaultProps = defaultProps;

export default MastheadBlog;