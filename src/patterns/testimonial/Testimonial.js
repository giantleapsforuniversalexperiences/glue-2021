import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Testimonial.scss';

const defaultProps = {
    authorName: '',
    className: '',
    clientLogo: {},
    clientName: '',
    quote: '',
};

const propTypes = {
    authorName: PropTypes.string,
    className: PropTypes.string,
    clientLogo: PropTypes.object,
    clientName: PropTypes.string,
    quote: PropTypes.string,
};

function Testimonial({
    authorName,
    className,
    clientLogo,
    clientName,
    quote,
}) {
    const clientLogoAlt = (clientLogo?.alt) ? clientLogo?.alt : '';
    let clientLogoUrl = clientLogo?.url;
    const extension = clientLogoUrl.split('.').pop().split('?')[0];
    
    clientLogoUrl = (extension !== 'svg') ? `${clientLogoUrl}&q=65&w=200` : clientLogoUrl;

    return (
        <>
            <div className={`quote ${className}`}>
                {(quote || authorName) && (
                    <div className="quote-wrapper">
                        {quote && (
                            <p className="quote-text">{quote}</p>
                        )}
                        {authorName && (
                            <p className="quote-author">{authorName}</p>
                        )}
                    </div>
                )}
                {clientLogo && (
                    <div className="client">
                        <img src={clientLogoUrl} alt={clientLogoAlt} loading="lazy" />
                        {clientName && (
                            <span>{clientName}</span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;