import React from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import { renderComponents } from 'utility/renderComponents';
import Shell from 'patterns/shell/Shell';
import loadable from '@loadable/component';

import '../scss/main.scss';
import './blog-individual.scss';

import BlogListFeatured from 'patterns/bloglistfeatured/BlogListFeatured';
import Hr from 'patterns/hr/Hr';
import MastheadBlog from 'patterns/mastheadblog/MastheadBlog';
import SectionTitle from 'patterns/sectiontitle/SectionTitle';

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function BlogIndividualPage({
    data,
    location: {
        pathname,
    },
}) {
	const siteData = data?.prismicSiteData;
    const pageData = data?.prismicBlogIndividualPage?.data;
    const pageAuthorImage = pageData?.page_author?.document?.data?.team_image?.url;
    const pageAuthorName = pageData?.page_author?.document?.data?.team_name?.text;
	const pageDarkMode = (pageData?.page_dark_mode) ? 'dark' : '';
	const pageMetaDescription = pageData?.page_meta_description?.text;
	const pageMetaTitle = pageData?.page_meta_title?.text;
    const pageSocialShareImage = pageData?.page_social_share_image?.url;
    const mastheadDate = pageData?.page_date;
    const mastheadImage = pageData?.masthead_image;
    const mastheadTitle = pageData?.masthead_heading?.text;
    const components = pageData?.body;
    const relatedPosts = pageData?.related_posts;
    const relatedPostsTitle = pageData?.related_posts_title?.raw;
    const structuredData = {
        '@context': 'http://schema.org',
        '@type': 'NewsArticle',
        author: {
            '@type': 'Person',
            name: (pageAuthorName) ? pageAuthorName : 'Glue',
        },
        dateModified: mastheadDate,
        datePublished: mastheadDate,
        description: pageMetaDescription,
        headline: pageMetaTitle,
        image: (pageSocialShareImage) ? pageSocialShareImage : mastheadImage?.url,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${process.env.GATSBY_SITE_URL}${pathname.substring(1)}`,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Glue',
            logo: {
                '@type': 'ImageObject',
                url: `${process.env.GATSBY_SITE_URL}images/gatsby-icon.png`,
            },
        },
    };

    return (
        <Shell
			bodyClassName={pageDarkMode}
			pathname={pathname}
			seoDescription={pageMetaDescription}
			seoImage={pageSocialShareImage}
			seoTitle={pageMetaTitle}
			siteData={siteData}
        >
            <main className="blog-individual">
                {(mastheadTitle) && (
                    <MastheadBlog
                        date={mastheadDate}
                        image={mastheadImage}
                        title={mastheadTitle}
                    />
                )}
                {components?.map(component => (
                    renderComponents(component, component?.slice_type)
                ))}
            </main>
            {relatedPosts[0] && (
                <main>
                    <Hr />
                    {relatedPostsTitle && (
                        <SectionTitle
                            title={relatedPostsTitle}
                        />
                    )}
                    <BlogListFeatured
                        items={relatedPosts}
                    />
                </main>
            )}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
        prismicBlogIndividualPage(id: { eq: $id }) {
            data {
                masthead_heading {
                    text
                }
                masthead_image {
                    alt
                    dimensions {
                        height
                        width
                    }
                    url
                }
                page_author {
                    document {
                        ... on PrismicTeamData {
                            data {
                                team_image {
                                    url
                                }
                                team_name {
                                    text
                                }
                            }
                        }
                    }
                }
                page_dark_mode
                page_date(formatString: "MMM DD, YYYY")
                page_meta_description {
                    text
                }
                page_meta_title {
                    text
                }
                page_social_share_image {
                    url
                }
                body {
                    ... on PrismicBlogIndividualPageBodyContent {
                        primary {
                            content {
                                raw
                            }
                        }
                        slice_type
                    }
                    ... on PrismicBlogIndividualPageBodyImage {
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
                    ... on PrismicBlogIndividualPageBodyVideo {
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
                }
                related_posts {
                    related_posts_article {
                        document {
                            ... on PrismicBlogIndividualPage {
                                data {
                                    masthead_heading {
                                        text
                                    }
                                    masthead_image {
                                        alt
                                        dimensions {
                                            height
                                            width
                                        }
                                        url
                                    }
                                    page_date(formatString: "MMM DD, YYYY")
                                }
                                type
                                uid
                            }
                        }
                    }
                }
                related_posts_title {
                    raw
                }
            }
        }
    } 
`;

BlogIndividualPage.propTypes = propTypes;
BlogIndividualPage.defaultProps = defaultProps;

export default withPreview(BlogIndividualPage);