import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';

import './CTA.scss';

import Link from 'components/link/Link';

const defaultProps = {
    buttonText: '',
    buttonUrl: {},
    className: '',
    emailTitle: '',
    emailLinkText: '',
    emailLinkUrl: {},
    linkText: '',
    linkUrl: {},
    phoneTitle: '',
    phoneLinkText: '',
    phoneLinkUrl: {},
    title: '',
};

const propTypes = {
    buttonText: PropTypes.string,
    buttonUrl: PropTypes.object,
    className: PropTypes.string,
    emailTitle: PropTypes.string,
    emailLinkText: PropTypes.string,
    emailLinkUrl: PropTypes.object,
    linkText: PropTypes.string,
    linkUrl: PropTypes.object,
    phoneTitle: PropTypes.string,
    phoneLinkText: PropTypes.string,
    phoneLinkUrl: PropTypes.object,
    title: PropTypes.string,
};

function CTA({
    buttonText,
    buttonUrl,
    className,
    emailTitle,
    emailLinkText,
    emailLinkUrl,
    linkText,
    linkUrl,
    phoneTitle,
    phoneLinkText,
    phoneLinkUrl,
    title,
    siteData,
}) {
    if (!siteData) return null;
    const data = siteData?.data;
    const buttonTextData = buttonText ? buttonText : data?.cta_button_text?.text;
    const buttonUrlData = buttonUrl?.url || buttonUrl?.uid ? buttonUrl : data?.cta_button_url;
    const emailTitleData = emailTitle ? emailTitle : data?.cta_email_title?.text;
    const emailLinkTextData = emailLinkText ? emailLinkText : data?.cta_email_link_text?.text;
    const emailLinkUrlData = emailLinkUrl?.url || emailLinkUrl?.uid ? emailLinkUrl : data?.cta_email_link_url;
    const linkTextData = linkText ? linkText : data?.cta_link_text?.text;
    const linkUrlData = linkUrl?.url || linkUrl?.uid ? linkUrl : data?.cta_link_url;
    const phoneTitleData = phoneTitle ? phoneTitle : data?.cta_phone_title?.text;
    const phoneLinkTextData = phoneLinkText ? phoneLinkText : data?.cta_phone_link_text?.text;
    const phoneLinkUrlData = phoneLinkUrl?.url || phoneLinkUrl?.uid ? phoneLinkUrl : data?.cta_phone_link_url;
    const titleData = title ? title : data?.cta_title?.text;

    return (
        <>
            <div className={`cta ${className}`}>
                <div className="cta_main">
                    {titleData && (
                        <h2>{titleData}</h2>
                    )}
                    <div className="cta_actions">
                        {(buttonTextData && (buttonUrlData?.url || buttonUrlData?.uid)) && (
                            <Link className="button" to={buttonUrlData}>{buttonTextData}</Link>
                        )}
                        {(linkTextData && (linkUrlData?.url || linkUrlData?.uid)) && (
                            <div className="link-wrapper">
                                <Link className="link" to={linkUrlData}>{linkTextData}</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="cta_secondary">
                    {emailTitleData && (
                        <h3>{emailTitleData}</h3>
                    )}
                    {(emailLinkTextData && (emailLinkUrlData?.url || emailLinkUrlData?.uid)) && (
                        <div className="link-wrapper">
                            <Link className="link" to={emailLinkUrlData}>{emailLinkTextData}</Link>
                        </div>
                    )}

                    {phoneTitleData && (
                        <h3>{phoneTitleData}</h3>
                    )}
                    {(phoneLinkTextData && (phoneLinkUrlData?.url || phoneLinkUrlData?.uid)) && (
                        <div className="link-wrapper">
                            <Link className="link" to={phoneLinkUrlData}>{phoneLinkTextData}</Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export const query = graphql`
    fragment CtaQuery on PrismicSiteData {
        data {
            cta_button_text {
                text
            }
            cta_button_url {
                link_type
                type
                uid
                url
            }
            cta_email_link_text {
                text
            }
            cta_email_link_url {
                link_type
                type
                uid
                url
            }
            cta_email_title {
                text
            }
            cta_link_text {
            text
            }
            cta_link_url {
                link_type
                type
                uid
                url
            }
            cta_phone_link_text {
                text
            }
            cta_phone_link_url {
                link_type
                type
                uid
                url
            }
            cta_phone_title {
                text
            }
            cta_title {
                text
            }
        }
    }
`;

CTA.propTypes = propTypes;
CTA.defaultProps = defaultProps;

export default CTA;