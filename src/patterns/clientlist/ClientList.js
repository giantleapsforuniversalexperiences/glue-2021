import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './ClientList.scss';

const Content = loadable(() => import('components/content/Content'));
const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
};

const propTypes = {
    className: PropTypes.string,
};

function ClientList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`our-clients ${className}`}>
                {items.map(({ client_list_content, client_list_logo, client_list_text, client_list_url }) => {
                    index++;
                    const content = client_list_content?.raw;
                    const clientLogo = client_list_logo?.document?.data?.client_logo;
                    const clientLogoAlt = (clientLogo?.alt) ? clientLogo?.alt : '';
                    let clientLogoUrl = clientLogo?.url;
                    const extension = (clientLogoUrl) ? clientLogoUrl.split('.').pop().split('?')[0] : '';
                    clientLogoUrl = (extension !== 'svg') ? `${clientLogoUrl}&q=65&w=200` : clientLogoUrl;
                    const clientName = client_list_logo?.document?.data?.client_name?.text;
                    const linkText = client_list_text?.text;
                    const linkUrl = client_list_url;

                    return (
                        <div className="client-entry" key={`${clientName}${index}`}>
                            {clientLogo && (
                                <div className="client">
                                    <img src={clientLogoUrl} alt={clientLogoAlt} loading="lazy" />
                                    {clientName && (
                                        <span>{clientName}</span>
                                    )}
                                </div>
                            )}
                            {content && (
                                <Content content={content} />
                            )}
                            {(linkText && (linkUrl?.url || linkUrl?.uid)) && (
                                <div className="link-wrapper">
                                    <Link className="link" to={linkUrl}>{linkText}</Link>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

ClientList.propTypes = propTypes;
ClientList.defaultProps = defaultProps;

export default ClientList;