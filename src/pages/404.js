import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { withUnpublishedPreview } from 'gatsby-source-prismic';
import BlogIndexPage from 'templates/blog-index';
import BlogIndividualPage from 'templates/blog-individual';
import ContentPage from 'templates/content';
import HomePage from 'templates/home';
import WorkIndexPage from 'templates/work-index';
import WordIndividualPage from 'templates/work-individual';
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

// If an unpublished `page` document is previewed, PageTemplate will be rendered.
export default withUnpublishedPreview(NotFoundPage, {
    templateMap: {
        blog_index_page: BlogIndexPage,
        blog_individual_page: BlogIndividualPage,
        content_page: ContentPage,
        home_page: HomePage,
        work_index_page: WorkIndexPage,
        work_individual_page: WordIndividualPage,
    },
});