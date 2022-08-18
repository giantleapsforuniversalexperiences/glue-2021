import React from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import { renderComponents } from 'utility/renderComponents';
import Shell from 'patterns/shell/Shell';

import '../scss/main.scss';
import './blog-individual.scss';

import Masthead from 'patterns/masthead/Masthead';

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function PlainContentPage({
    data,
    location: {
        pathname,
    },
}) {
	const siteData = data?.prismicSiteData;
	const pageData = data?.prismicPlainContentPage?.data;
	const pageDarkMode = (pageData?.page_dark_mode) ? 'dark' : '';
	const pageMetaDescription = pageData?.page_meta_description?.text;
	const pageMetaTitle = pageData?.page_meta_title?.text;
    const pageSocialShareImage = pageData?.page_social_share_image?.url;
    const mastheadBackgroundImage = pageData?.masthead_background_image;
    const mastheadContent = pageData?.masthead_content?.raw;
	const mastheadOverline = pageData?.masthead_overline?.text;
    const mastheadTitle = pageData?.masthead_heading?.raw;
    const components = pageData?.body;

    return (
        <Shell
			bodyClassName={pageDarkMode}
			pathname={pathname}
			seoDescription={pageMetaDescription}
			seoImage={pageSocialShareImage}
			seoTitle={pageMetaTitle}
			siteData={siteData}
        >
            <main className="plain-content">
                {(mastheadOverline || mastheadContent || mastheadTitle) && (
                    <Masthead
                        backUrl={pageData?.page_parent}
                        backgroundImage={mastheadBackgroundImage}
                        content={mastheadContent}
						marginBottom={pageData?.masthead_margin_bottom}
                        overline={mastheadOverline}
                        title={mastheadTitle}
                    />
                )}
                <div className="blog-individual">
                    {components?.map(component => (
                        renderComponents(component, component?.slice_type)
                    ))}
                </div>
            </main>
        </Shell>
    );
}

export const query = graphql`
    query($id: String!) {
		prismicSiteData {
            ...HeaderQuery
		}
		prismicSiteData {
            ...FooterQuery
		}
		prismicSiteData {
            ...CookiebarQuery
        }
		prismicSiteData {
            ...CtaQuery
        }
        prismicPlainContentPage(id: { eq: $id }) {
            data {
                masthead_background_image {
                    alt
                    dimensions {
                        height
                        width
                    }
                    url
                }
                masthead_content {
                    raw
                }
                masthead_heading {
                    raw
                }
                masthead_overline {
                    text
                }
				masthead_margin_bottom
                page_dark_mode
                page_meta_description {
                    text
                }
                page_meta_title {
                    text
                }
                page_social_share_image {
                    url
                }
                page_parent {
                    link_type
                    type
                    uid
                }
                body {
                    ... on PrismicPlainContentPageBodyContent {
                        primary {
                            content {
                                raw
                            }
                        }
                        slice_type
                    }
                    ... on PrismicPlainContentPageBodyImage {
                        primary {
                            image {
                                alt
                                dimensions {
                                    height
                                    width
                                }
                                url
                            }
                            image_caption {
                                raw
                            }
                        }
                        slice_type
                    }
                    ... on PrismicPlainContentPageBodyVideo {
                        primary {
                            video_caption {
                                raw
                            }
                            video_cover_video {
								url
							}
                            video_youtube_or_vimeo_video {
                                html
                                title
                            }
                        }
                        slice_type
                    }
                    ... on PrismicPlainContentPageBodyAccordion {
                        items {
                            accordion_content {
                                raw
                            }
                            accordion_title {
                                text
                            }
                        }
                        primary {
                            accordion_header_title {
                                text
                            }
                        }
                        slice_type
                    }
                }
            }
        }
    } 
`;

PlainContentPage.propTypes = propTypes;
PlainContentPage.defaultProps = defaultProps;

export default withPreview(PlainContentPage);
