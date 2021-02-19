import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';

import './Header.scss';

const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
    siteData: {},
};

const propTypes = {
    className: PropTypes.string,
    siteData: PropTypes.object,
};

function Header({
    className,
    siteData,
}) {
    let index = 0;
    if (!siteData) return null;
    const data = siteData?.data;
    const navLinks = data?.nav_menu;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuToggleButtonText, setMenuToggleButtonText] = useState('Menu');
	const menuOpenClassName = isMenuOpen ? 'active' : '';
	
	function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
        isMenuOpen ? setMenuToggleButtonText('Menu') : setMenuToggleButtonText('Close');
	}

    return (
        <>
            <header className={`header ${className}`}>
                <div>
                    <div className="header__logo">
                        <Link to={{ link_type: 'Document', type: 'home_page', uid: '/' }}>Glue</Link>
                    </div>
                    <button aria-label={menuToggleButtonText} className={`header__menu-button ${menuOpenClassName}`} onClick={toggleMenu} type="button">{menuToggleButtonText}</button>
                    <nav className={`header__navigation ${menuOpenClassName}`}>
                        <div className="header__logo">
                            <Link to={{ link_type: 'Document', type: 'home_page', uid: '/' }}>Glue</Link>
                        </div>
                        <ul>
                            {navLinks.map(({ nav_link_text, nav_link_url }) => {
                                index++;
                                const linkText = nav_link_text?.text;
                                const linkUrl = nav_link_url;

                                return (
                                    <li key={`${linkText}${index}`}>
                                        <Link className="link" partiallyActive={true} to={linkUrl}>{linkText}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export const query = graphql`
    fragment HeaderQuery on PrismicSiteData {
        data {
            nav_menu {
                nav_link_text {
                    text
                }
                nav_link_url {
                    link_type
                    type
                    uid
                    url
                }
            }
        }
    }
`;

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;