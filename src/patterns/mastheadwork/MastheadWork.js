import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './MastheadWork.scss';

const Content = loadable(() => import('components/content/Content'));
const Image = loadable(() => import('components/image/Image'));

const defaultProps = {
    clientLogo: {},
    clientName: '',
    image: {},
    title: [],
};

const propTypes = {
    clientLogo: PropTypes.object,
    clientName: PropTypes.string,
    image: PropTypes.object,
    title: PropTypes.array,
};

function MastheadWork({
    clientLogo,
    clientName,
    image,
    title,
}) {
    const clientLogoAlt = (clientLogo?.alt) ? clientLogo?.alt : '';
    let clientLogoUrl = clientLogo?.url;
    const extension = (clientLogoUrl) ? clientLogoUrl.split('.').pop().split('?')[0] : '';
    clientLogoUrl = (extension !== 'svg') ? `${clientLogoUrl}&q=65&w=200` : clientLogoUrl;
    const imageAlt = (image?.alt) ? image?.alt : '';
    const imageHeight = image?.dimensions?.height;
    const imageUrl = image?.url;
    const imageWidth = image?.dimensions?.width;

    return (
        <>
            <div className="masthead-work">
                {clientLogo && (
                    <div className="client">
                        <img src={clientLogoUrl} alt={clientLogoAlt} />
                        {clientName && (
                            <span>{clientName}</span>
                        )}
                    </div>
                )}
                {title?.[0]?.text && (
                    <Content
                        content={title}
                    />
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

MastheadWork.propTypes = propTypes;
MastheadWork.defaultProps = defaultProps;

export default MastheadWork;