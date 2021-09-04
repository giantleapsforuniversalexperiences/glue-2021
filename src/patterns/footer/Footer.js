import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';

import './Footer.scss';

import Content from 'components/content/Content';
import Link from 'components/link/Link';

const defaultProps = {
    className: '',
    copyright: 'Giant Leaps For Universal Experiences Ltd.',
    siteData: {},
};

const propTypes = {
    className: PropTypes.string,
    copyright: PropTypes.string,
    siteData: PropTypes.object,
};

function Footer({
    className,
    copyright,
    siteData,
}) {
    let index = 0;
    if (!siteData) return null;
    const data = siteData?.data;
    const address = data?.footer_address?.raw;
    const footerLinks = data?.footer_menu;
    const date = new Date();
    const dateYear = date.getFullYear();

    return (
        <>
            <footer className={`footer ${className}`}>
                <div className="footer__main">
                    <div className="footer__logo-container">
                        <div className="footer__logo">
                            <Link to={{ link_type: 'Document', type: 'home_page', uid: '/' }}>Glue</Link>
                        </div>
                        <span className="footer__logo-strapline"><span>Design experienced by millions</span></span>
                    </div>
                    <address className="footer__address">
                        <strong>Glue</strong>
                        <Content content={address} />
                    </address>
                </div>
                <div className="footer__secondary">
                    <span className="footer__copyright">&copy; {dateYear} - {copyright}</span>
                    {footerLinks && (
                        <ul>
                            {footerLinks.map(({ footer_link_text, footer_link_url }) => {
                                index++;
                                const linkText = footer_link_text?.text;
                                const linkUrl = footer_link_url;

                                return (
                                    <li key={`${linkText}${index}`}>
                                        <Link className="link" to={linkUrl}>{linkText}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </footer>
        </>
    );
}

export const query = graphql`
    fragment FooterQuery on PrismicSiteData {
        data {
            footer_address {
                raw
            }
            footer_menu {
                footer_link_text {
                    text
                }
                footer_link_url {
                    link_type
                    type
                    uid
                    url
                }
            }
        }
    }
`;

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
