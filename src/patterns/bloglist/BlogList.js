import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './BlogList.scss';

const Image = loadable(() => import('components/image/Image'));
const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
    items: [],
};

const propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
};

function BlogList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`tiles ${className}`}>
                {items.map(({ data, type, uid }) => {
                    index++;
                    const date = data?.page_date;
                    const image = data?.masthead_image;
                    const imageAlt = (image?.alt) ? image?.alt : '';
                    const imageHeight = image?.dimensions?.height;
                    const imageUrl = image?.url;
                    const imageWidth = image?.dimensions?.width;
                    const linkUrl = {
                        link_type: 'Document',
                        type: type,
                        uid: uid,
                    };
                    const title = data?.masthead_heading?.text;

                    return (
                        <div className="tile" key={`${title}${index}`}>
                            <Link to={linkUrl}>
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
                                {title && (
                                    <h3>{title}</h3>
                                )}
                            </Link>
                            {date && (
                                <p className="date"><span>{date}</span></p>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

BlogList.propTypes = propTypes;
BlogList.defaultProps = defaultProps;

export default BlogList;