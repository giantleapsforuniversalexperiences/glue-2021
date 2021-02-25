import React from 'react';
import PropTypes from 'prop-types';

import SEO from 'patterns/seo/SEO';
import Cookiebar from 'patterns/cookiebar/Cookiebar';
import Footer from 'patterns/footer/Footer';
import Header from 'patterns/header/Header';

const defaultProps = {
    bodyClassName: '',
    children: null,
    seoDescription: '',
    seoImage: null,
    seoTitle: '',
    siteData: {},
};

const propTypes = {
    bodyClassName: PropTypes.string,
    children: PropTypes.node,
    pathname: PropTypes.string.isRequired,
    seoDescription: PropTypes.string,
    seoImage: PropTypes.string,
    seoTitle: PropTypes.string,
    siteData: PropTypes.object,
};

function Shell({
    bodyClassName,
    children,
    pathname,
    seoDescription,
    seoImage,
    seoTitle,
    siteData,
}) {
    const showCookiePopup = siteData?.data?.show_cookie_popup;

    return (
        <>
            <SEO
                bodyClassName={bodyClassName}
                pageDescription={seoDescription}
                pageSocialImage={seoImage}
                pageTitle={seoTitle}
                pathname={pathname}
            />
            <Header siteData={siteData} />
            {children}
            {showCookiePopup && (
                <Cookiebar siteData={siteData} />
            )}
            <Footer siteData={siteData} />
        </>
    );
}

Shell.propTypes = propTypes;
Shell.defaultProps = defaultProps;

export default Shell;