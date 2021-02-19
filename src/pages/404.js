import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { withUnpublishedPreview } from 'gatsby-source-prismic';
// import ContentPage from 'templates/content';
import Shell from 'patterns/shell/Shell';

import '../scss/main.scss';

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function NotFoundPage({
    data,
    location: {
        pathname,
    },
}) {
    const siteData = data?.prismicSiteData;

    return (
        <Shell
            pathname={pathname}
            seoTitle="Page Not Found"
            siteData={siteData}
        >
            <h1>404</h1>
        </Shell>
    );
}

export const query = graphql`
    query {
		prismicSiteData {
            ...HeaderQuery
        }
    }
`;

NotFoundPage.propTypes = propTypes;
NotFoundPage.defaultProps = defaultProps;

export default NotFoundPage;

// // If an unpublished `page` document is previewed, PageTemplate will be rendered.
// export default withUnpublishedPreview(NotFoundPage, {
//     templateMap: {
//         content: ContentPage,
//     },
// });