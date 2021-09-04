import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';

import './Footer.scss';

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
    const footerLinks = data?.footer_menu;
    const date = new Date();
    const dateYear = date.getFullYear();

    return (
        <>
            <footer className={`footer ${className}`}>
                <span>&copy; {dateYear} - {copyright}</span>
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
            </footer>
        </>
    );
}

export const query = graphql`
    fragment FooterQuery on PrismicSiteData {
        data {
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
