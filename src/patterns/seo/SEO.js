import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const defaultProps = {
    bodyClassName: '',
    lang: 'en',
    locale: 'en-GB',
    meta: [],
    pageDescription: '',
    pageSocialImage: null,
    pageTitle: '',
    pageTwitterCard: 'summary_large_image',
    siteAuthor: 'Glue',
    siteName: 'Glue',
    siteUrl: process.env.GATSBY_SITE_URL,
};

const propTypes = {
    bodyClassName: PropTypes.string,
    lang: PropTypes.string,
    locale: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.string),
    pageDescription: PropTypes.string,
    pageSocialImage: PropTypes.string,
    pageTitle: PropTypes.string,
    pageTwitterCard: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    siteAuthor: PropTypes.string,
    siteName: PropTypes.string,
    siteUrl: PropTypes.string,
};

function useGlobalSEO() {
    const data = useStaticQuery(graphql`
        query GlobalSEO {
            allPrismicSiteData {
                nodes {
                    data {
                        site_meta_description {
                            text
                        }
                        site_meta_title {
                            text
                        }
                        site_social_share_image {
                            url
                        }
                    }
                }
            }
        }
    `);

    return data;
}

function SEO({
    bodyClassName,
    lang,
    locale,
    meta,
    pathname,
    pageDescription,
    pageSocialImage,
    pageTitle,
    pageTwitterCard,
    siteAuthor,
    siteName,
    siteUrl,
}) {
    const {
        allPrismicSiteData: {
            nodes
        }
    } = useGlobalSEO();
    const siteDescription = nodes?.[0]?.data?.site_meta_description?.text;
    const siteSocialImage = nodes?.[0]?.data?.site_social_share_image?.url;
    const siteTitle = nodes?.[0]?.data?.site_meta_title?.text;

    const metaDescription = pageDescription || siteDescription;
    const metaSocialImage = pageSocialImage !== null ? pageSocialImage : siteSocialImage;
    const metaTitle = pageTitle !== '' ? `${pageTitle} | ${siteTitle}` : siteTitle;

    const links = [
        {
            as: 'font',
            crossorigin: '',
            href: '/fonts/GT-Super-Display-Super.woff2',
            rel: 'preload',
            type: 'font/woff2',
        },
        {
            as: 'font',
            crossorigin: '',
            href: '/fonts/Karmilla-Bold.woff2',
            rel: 'preload',
            type: 'font/woff2',
        },
        {
            as: 'font',
            crossorigin: '',
            href: '/fonts/Karmilla-Regular.woff2',
            rel: 'preload',
            type: 'font/woff2',
        },
    ];
    
    return (
        <Helmet
            htmlAttributes={{ lang }}
            bodyAttributes={{ class: `${bodyClassName}` }}
            title={pageTitle}
            defaultTitle={siteTitle}
            titleTemplate={`%s | ${siteTitle}`}
            style={[{
                "cssText": `
                    @font-face {
                        font-family: 'Karmilla';
                        src: url('/fonts/Karmilla-Bold.woff2') format('woff2'),
                            url('/fonts/Karmilla-Bold.woff') format('woff');
                        font-weight: bold;
                        font-style: normal;
                        font-display: fallback;
                    }
                    
                    @font-face {
                        font-family: 'Karmilla';
                        src: url('/fonts/Karmilla-Regular.woff2') format('woff2'),
                            url('/fonts/Karmilla-Regular.woff') format('woff');
                        font-weight: normal;
                        font-style: normal;
                        font-display: fallback;
                    }
                    
                    @font-face {
                        font-family: 'GT Super Display Super';
                        src: url('/fonts/GT-Super-Display-Super.woff2') format('woff2'),
                            url('/fonts/GT-Super-Display-Super.woff') format('woff');
                        font-weight: 900;
                        font-style: normal;
                        font-display: fallback;
                    }
                `
            }]}
            link={links}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    name: 'article:author',
                    content: siteAuthor,
                },
                {
                    property: 'og:title',
                    content: metaTitle,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:image',
                    content: metaSocialImage,
                },
                {
                    property: 'og:url',
                    content: `${siteUrl}${pathname}`,
                },
                {
                    property: 'og:locale',
                    content: locale,
                },
                {
                    property: 'og:site_name',
                    content: siteName,
                },
                {
                    name: 'twitter:card',
                    content: pageTwitterCard,
                },
                {
                    name: 'twitter:creator',
                    content: siteAuthor,
                },
                {
                    name: 'twitter:title',
                    content: metaTitle,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
                {
                    name: 'twitter:image',
                    content: metaSocialImage,
                },
                {
                    name: 'twitter:url',
                    content: `${siteUrl}${pathname}`,
                },
                {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black-translucent',
                },
            ].concat(meta)}
        />
    );
}

SEO.propTypes = propTypes;
SEO.defaultProps = defaultProps;

export default SEO;
