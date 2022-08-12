import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './WorkList.scss';

import Image from 'components/image/Image';
import Link from 'components/link/Link';

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
            <div className={`tiles work-list ${className}`}>
                {items.map(({ work_article, work_card_size }) => {
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
                    let cardSizeClassName = 'third'

                    if (work_card_size === '100%') {
                        cardSizeClassName = 'full'
                    } else if (work_card_size === '50%') {
                        cardSizeClassName = 'half'
                    }

                    return (
                        <div className={`tile ${cardSizeClassName}`} key={`${title}${index}`}>
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
