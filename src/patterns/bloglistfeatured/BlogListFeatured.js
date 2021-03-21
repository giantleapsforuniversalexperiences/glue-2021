import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './BlogListFeatured.scss';

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

function BlogListFeatured({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`tiles ${className}`}>
                {items.map(({ blog_list_featured_article, related_posts_article }) => {
                    index++;
                    const data = (blog_list_featured_article)? blog_list_featured_article : related_posts_article;
                    const date = data?.document?.data?.page_date;
                    const image = data?.document?.data?.masthead_image;
                    const imageAlt = (image?.alt) ? image?.alt : '';
                    const imageHeight = image?.dimensions?.height;
                    const imageUrl = image?.url;
                    const imageWidth = image?.dimensions?.width;
                    const linkUrl = {
                        link_type: 'Document',
                        type: data?.document?.type,
                        uid: data?.document?.uid,
                    };
                    const title = data?.document?.data?.masthead_heading?.text;

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

BlogListFeatured.propTypes = propTypes;
BlogListFeatured.defaultProps = defaultProps;

export default BlogListFeatured;