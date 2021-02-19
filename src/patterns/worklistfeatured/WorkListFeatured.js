import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './WorkListFeatured.scss';

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

function WorkListFeatured({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`tiles ${className}`}>
                {items.map(({ work_list_featured_article, related_posts_article }) => {
                    index++;
                    const data = (work_list_featured_article)? work_list_featured_article : related_posts_article;
                    const clientLogo = data?.document?.data?.masthead_client_logo?.document?.data?.client_logo;
                    const clientLogoAlt = (clientLogo?.alt) ? clientLogo?.alt : '';
                    const clientLogoUrl = clientLogo?.url;
                    const clientName = data?.document?.data?.masthead_client_logo?.document?.data?.client_name?.text;
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
                                            size="medium"
                                        />
                                    </div>
                                )}
                                {clientLogoUrl && (
                                    <div className="client">
                                        <img src={clientLogoUrl} alt={clientLogoAlt} />
                                        {clientName && (
                                            <span>{clientName}</span>
                                        )}
                                    </div>
                                )}
                                {title && (
                                    <h3>{title}</h3>
                                )}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

WorkListFeatured.propTypes = propTypes;
WorkListFeatured.defaultProps = defaultProps;

export default WorkListFeatured;