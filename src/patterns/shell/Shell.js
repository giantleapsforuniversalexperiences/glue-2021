import React from 'react';
import PropTypes from 'prop-types';

import SEO from 'patterns/seo/SEO';
// import Cookiebar from 'organisms/cookiebar/Cookiebar';
// import Footer from 'organisms/footer/Footer';
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
            {/* 
            <div className="l-shell__header">
                <Header />
            </div>
            <div className="l-shell__main">
                {children}
                <Cookiebar />
            </div>
            <Footer className="l-shell__footer" /> */}
        </>
    );
}

Shell.propTypes = propTypes;
Shell.defaultProps = defaultProps;

export default Shell;