import React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic';
import linkResolver from 'utility/prismicLinkResolver';

const PreviewPage = ({ isPreview, isLoading }) => {
    if (isPreview === false) return 'Not a preview!'
    return(<> <p>Loading</p> </>);
}
  
export default withPreviewResolver(PreviewPage, {
    repositoryName: process.env.GATSBY_PRISMIC_REPO,
    linkResolver,
})