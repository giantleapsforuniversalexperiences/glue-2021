const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
const path = require('path');
const linkResolver = require('./src/utility/prismicLinkResolver');

console.log(`Using environment config: '${activeEnv}'`);

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

process.env.PRISMIC_PREVIEW_PATH = process.env.PRISMIC_PREVIEW_PATH || "/previews";

module.exports = {
    siteMetadata: {
        author: 'Glue',
        description: 'Glue website',
        favicon: 'src/images/gatsby-icon.png',
        languageCode: 'en-GB',
        rss: '/rss.xml',
        siteUrl: process.env.GATSBY_SITE_URL,
        title: 'Glue',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
              id: 'GTM-WVFPKN2',
              includeInDevelopment: false,
              defaultDataLayer: { platform: 'gatsby' },
            },
        },
        'gatsby-plugin-transition-link',
        'gatsby-plugin-image',
        {
            resolve: 'gatsby-plugin-canonical-urls',
            options: {
                siteUrl: process.env.GATSBY_SITE_URL,
            },
        },
        'gatsby-plugin-loadable-components-ssr',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Glue',
                short_name: 'Glue',
                start_url: '/',
                background_color: '#000000',
                theme_color: '#000000',
                display: 'standalone',
                icon: 'src/images/gatsby-icon.png',
            },
        },
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                resolveEnv: () => process.env.GATSBY_ACTIVE_ENV,
                env: {
                    development: {
                        policy: [{ userAgent: '*', disallow: ['/'] }],
                    },
                    production: {
                        policy: [{ userAgent: '*', allow: ['/'] }],
                    },
                },
            },
        },
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                src: path.join(__dirname, 'src'),
                components: path.join(__dirname, 'src/components'),
                patterns: path.join(__dirname, 'src/patterns'),
                templates: path.join(__dirname, 'src/templates'),
                utility: path.join(__dirname, 'src/utility'),
            }
        },
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                exclude: [
                    '/preview',
                    '/preview/*',
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-source-prismic',
            options: {
                accessToken: process.env.GATSBY_PRISMIC_ACCESS_TOKEN,
                linkResolver,
                prismicToolbar: true,
                repositoryName: process.env.GATSBY_PRISMIC_REPO,
                schemas: {
                    blog_index_page: require('./src/schemas/blogindexpage.json'),
                    blog_individual_page: require('./src/schemas/blogindividualpage.json'),
                    categories_data: require('./src/schemas/categoriesdata.json'),
                    clients_data: require('./src/schemas/clientsdata.json'),
                    contact_page: require('./src/schemas/contactpage.json'),
                    content_page: require('./src/schemas/contentpage.json'),
                    home_page: require('./src/schemas/homepage.json'),
                    industries_data: require('./src/schemas/industriesdata.json'),
                    plain_content_page: require('./src/schemas/plaincontentpage.json'),
                    services_data: require('./src/schemas/servicesdata.json'),
                    site_data: require('./src/schemas/sitedata.json'),
                    tags_data: require('./src/schemas/tagsdata.json'),
                    team_data: require('./src/schemas/teamdata.json'),
                    testimonials_data: require('./src/schemas/testimonialsdata.json'),
                    work_index_page: require('./src/schemas/workindexpage.json'),
                    work_individual_page: require('./src/schemas/workindividualpage.json'),
                },
            },
        },
    ],
};
