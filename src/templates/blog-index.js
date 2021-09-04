import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import { renderComponents } from 'utility/renderComponents';
import Shell from 'patterns/shell/Shell';
import loadable from '@loadable/component';

import '../scss/main.scss';

import BlogFeatured from 'patterns/blogfeatured/BlogFeatured';
import BlogList from 'patterns/bloglist/BlogList';
import Masthead from 'patterns/masthead/Masthead';
import Pagination from 'patterns/pagination/Pagination';

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function BlogIndexPage({
    data,
    location: {
        pathname,
    },
}) {
	const siteData = data?.prismicSiteData;
	const pageData = data?.prismicBlogIndexPage?.data;
	const pageDarkMode = (pageData?.page_dark_mode) ? 'dark' : '';
	const pageMetaDescription = pageData?.page_meta_description?.text;
	const pageMetaTitle = pageData?.page_meta_title?.text;
    const pageSocialShareImage = pageData?.page_social_share_image?.url;
    const mastheadContent = pageData?.masthead_content?.raw;
	const mastheadOverline = pageData?.masthead_overline?.text;
    const mastheadTitle = pageData?.masthead_heading?.raw;
    const featuredBlogDate = pageData?.featured_blog?.document?.data?.page_date;
    const featuredBlogImage = pageData?.featured_blog?.document?.data?.masthead_image;
    const featuredBlogLinkUrl = {
        link_type: 'Document',
        type: pageData?.featured_blog?.document?.type,
        uid: pageData?.featured_blog?.document?.uid,
    };
    const featuredBlogTitle = pageData?.featured_blog?.document?.data?.masthead_heading?.text;
    const blogList = data?.allPrismicBlogIndividualPage?.nodes;
    const paginationSize = 9;
    const [loadedArticles, setLoadedArticles] = useState([...blogList.slice(0, paginationSize)]);
    const [loadMore, setLoadMore] = useState(false);
    const [hasMore, setHasMore] = useState(blogList.length > 0);
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
            <main>
                {(mastheadOverline || mastheadOverline || mastheadTitle) && (
                    <Masthead
                        content={mastheadContent}
                        overline={mastheadOverline}
                        title={mastheadTitle}
                    />
                )}
                {(featuredBlogLinkUrl && featuredBlogTitle) && (
                    <BlogFeatured
                        date={featuredBlogDate}
                        image={featuredBlogImage}
                        linkUrl={featuredBlogLinkUrl}
                        title={featuredBlogTitle}
                    />
                )}
                {loadedArticles && (
                    <>
                        <BlogList
                            items={loadedArticles}
                        />
                        {hasMore && (
                            <Pagination
                                allArticles={blogList}
                                hasMore={hasMore}
                                loadMore={loadMore}
                                loadedArticles={loadedArticles}
                                paginationSize={paginationSize}
                                setHasMore={setHasMore}
                                setLoadMore={setLoadMore}
                                setLoadedArticles={setLoadedArticles}
                                text="Load more"
                            />
                        )}
                    </>
                )}
                {components?.map(component => (
                    renderComponents(component, component?.slice_type)
                ))}
            </main>
        </Shell>
    );
}

export const query = graphql`
    query($id: String!, $featuredBlogUid: String) {
		prismicSiteData {
            ...HeaderQuery
		}
		prismicSiteData {
            ...FooterQuery
		}
		prismicSiteData {
            ...CookiebarQuery
        }
        prismicBlogIndexPage(id: { eq: $id }) {
            data {
                masthead_content {
                    raw
                }
                masthead_heading {
                    raw
                }
                masthead_overline {
                    text
                }
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
                featured_blog {
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
                body {
					... on PrismicBlogIndexPageBodyBlogListFeatured {
						items {
							blog_list_featured_article {
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
						slice_type
					}
                    ... on PrismicBlogIndexPageBodyButton {
						primary {
							button_link_text {
								text
							}
							button_link_url {
								link_type
								type
								uid
								url
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyClientList {
						items {
							client_list_content {
								raw
							}
							client_list_logo {
								document {
									... on PrismicClientsData {
										data {
											client_logo {
												alt
												dimensions {
													height
													width
												}
												url
											}
											client_name {
												text
											}
										}
									}
								}
							}
							client_list_text {
								text
							}
							client_list_url {
								link_type
								type
								uid
								url
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyContent {
						primary {
							content {
								raw
							}
							content_more {
								raw
							}
							content_link_text {
                                text
                            }
                            content_link_url {
                                link_type
                                type
                                uid
                                url
                            }
							content_title {
								raw
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyContentImage {
						primary {
							content_image_content {
								raw
							}
							content_image_image {
								alt
								dimensions {
									height
									width
								}
								url
							}
							content_image_link_text {
								raw
							}
							content_image_link_url {
								link_type
								type
								uid
								url
							}
							content_image_title {
								raw
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyContentImageList {
						items {
							content_image_list_content {
								raw
							}
							content_image_list_image {
								alt
								dimensions {
									height
									width
								}
								url
							}
							content_image_list_title {
								raw
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyHr {
						slice_type
					}
					... on PrismicBlogIndexPageBodyImage {
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
					... on PrismicBlogIndexPageBodyIndustryList {
						items {
							industry_image {
								alt
								dimensions {
									height
									width
								}
								url
							}
							industry_title {
								raw
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyLinkList {
						items {
							link_list_link_text {
								text
							}
							link_list_link_url {
								link_type
								type
								uid
								url
							}
						}
						slice_type
					}
                    ... on PrismicBlogIndexPageBodySectionTitle {
                        primary {
                            section_title {
                                raw
							}
                        }
                        slice_type
					}
					... on PrismicBlogIndexPageBodyStatList {
						items {
							stat_list_content {
								raw
							}
							stat_list_link_text {
								text
							}
							stat_list_link_url {
								link_type
								type
								uid
								url
							}
							stat_list_stat_text {
								text
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyTeamList {
						items {
							team_member {
								document {
									... on PrismicTeamData {
										data {
											team_image {
												alt
												dimensions {
													height
													width
												}
												url
											}
											team_job_title {
												text
											}
											team_name {
												text
											}
										}
									}
								}
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyTestimonial {
						primary {
							testimonial {
								document {
									... on PrismicTestimonialsData {
										data {
											testimonial_author_name {
												text
											}
											testimonial_client_logo {
												document {
													... on PrismicClientsData {
														data {
															client_logo {
																alt
																dimensions {
																	height
																	width
																}
																url
															}
															client_name {
																text
															}
														}
													}
												}
											}
											testimonial_quote {
												text
											}
										}
									}
								}
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyVideo {
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
					... on PrismicBlogIndexPageBodyWorkListFeatured {
						items {
							work_list_featured_article {
								document {
									... on PrismicWorkIndividualPage {
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
											masthead_client_logo {
												document {
													... on PrismicClientsData {
														data {
															client_logo {
																alt
																dimensions {
																	height
																	width
																}
																url
															}
															client_name {
																text
															}
														}
													}
												}
											}
										}
										type
										uid
									}
								}
							}
						}
						slice_type
					}
					... on PrismicBlogIndexPageBodyCallToAction {
						primary {
							cta_button_text {
								text
							}
							cta_button_url {
								link_type
								type
								uid
								url
							}
							cta_email_link_text {
								text
							}
							cta_email_link_url {
								link_type
								type
								uid
								url
							}
							cta_email_title {
								text
							}
							cta_link_text {
							text
							}
							cta_link_url {
								link_type
								type
								uid
								url
							}
							cta_phone_link_text {
								text
							}
							cta_phone_link_url {
								link_type
								type
								uid
								url
							}
							cta_phone_title {
								text
							}
							cta_title {
								text
							}
						}
						slice_type
					}
                }  
            }
        }
        allPrismicBlogIndividualPage(
            filter: {uid: { ne: $featuredBlogUid }},
            sort: {fields: data___page_date, order: DESC}
        ) {
            nodes {
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
`;

BlogIndexPage.propTypes = propTypes;
BlogIndexPage.defaultProps = defaultProps;

export default withPreview(BlogIndexPage);
