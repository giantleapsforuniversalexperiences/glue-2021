import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';
import Cookies from 'universal-cookie';

import './Cookiebar.scss';

const Content = loadable(() => import('components/content/Content'));

const defaultProps = {
    buttonText: 'Accept & Close',
    siteData: {},
};

const propTypes = {
    buttonText: PropTypes.string,
    siteData: PropTypes.object,
};

function Cookiebar({
    buttonText,
    siteData,
}) {
    if (!siteData) return null;
    const data = siteData?.data;
    const cookieMessage = data?.cookie_message?.raw;
    const cookieName = 'GlueCookiePolicy';
    const cookies = new Cookies();
    const [isCookiebarHidden, setIsCookiebarHidden] = useState(true);
    const hiddenClassName = isCookiebarHidden ? 'is-hidden' : '';

    useEffect(function() {
        if (!cookies.get(cookieName)) {
            setIsCookiebarHidden(false);
        }
    }, []);

    function dismissCookiebar() {
        setIsCookiebarHidden(!isCookiebarHidden);
        cookies.set(cookieName, 'true', { path: '/' });
    }

    return (
        <>
            <div className={`cookiebar ${hiddenClassName}`}>
                {cookieMessage?.[0]?.text && (
                    <Content content={cookieMessage} />
                )}
                <button onClick={dismissCookiebar}>{buttonText}</button>
            </div>
        </>
    );
}

export const query = graphql`
    fragment CookiebarQuery on PrismicSiteData {
        data {
            cookie_message {
                raw
            }
            show_cookie_popup
        }
    }
`;

Cookiebar.propTypes = propTypes;
Cookiebar.defaultProps = defaultProps;

export default Cookiebar;
