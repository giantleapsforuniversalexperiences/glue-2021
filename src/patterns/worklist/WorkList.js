import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './WorkList.scss';

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

function WorkList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`tiles ${className}`}>
                {items.map(({ work_article }) => {
                    index++;
                    const clientLogo = work_article?.document?.data?.masthead_client_logo?.document?.data?.client_logo;
                    const clientLogoAlt = (clientLogo?.alt) ? clientLogo?.alt : '';
                    let clientLogoUrl = clientLogo?.url;
                    const extension = (clientLogoUrl) ? clientLogoUrl.split('.').pop().split('?')[0] : '';
                    clientLogoUrl = (extension !== 'svg') ? `${clientLogoUrl}&q=65&w=200` : clientLogoUrl;
                    const clientName = work_article?.document?.data?.masthead_client_logo?.document?.data?.client_name?.text;
                    const image = work_article?.document?.data?.masthead_image;
                    const imageAlt = (image?.alt) ? image?.alt : '';
                    const imageHeight = image?.dimensions?.height;
                    const imageUrl = image?.url;
                    const imageWidth = image?.dimensions?.width;
                    const linkUrl = {
                        link_type: 'Document',
                        type: work_article?.document?.type,
                        uid: work_article?.document?.uid,
                    };
                    const title = work_article?.document?.data?.masthead_heading?.text;

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
                                        <img src={clientLogoUrl} alt={clientLogoAlt} loading="lazy" />
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

WorkList.propTypes = propTypes;
WorkList.defaultProps = defaultProps;

export default WorkList;