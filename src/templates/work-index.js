import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import { renderComponents } from 'utility/renderComponents';
import Shell from 'patterns/shell/Shell';
import loadable from '@loadable/component';

import '../scss/main.scss';

const Masthead = loadable(() => import('patterns/masthead/Masthead'));
const Pagination = loadable(() => import('patterns/pagination/Pagination'));
const WorkList = loadable(() => import('patterns/worklist/WorkList'));

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function WorkIndexPage({
    data,
    location: {
        pathname,
    },
}) {
	const siteData = data?.prismicSiteData;
	const pageData = data?.prismicWorkIndexPage?.data;
	const pageDarkMode = (pageData?.page_dark_mode) ? 'dark' : '';
	const pageMetaDescription = pageData?.page_meta_description?.text;
	const pageMetaTitle = pageData?.page_meta_title?.text;
    const pageSocialShareImage = pageData?.page_social_share_image?.url;
    const mastheadContent = pageData?.masthead_content?.raw;
	const mastheadOverline = pageData?.masthead_overline?.text;
    const mastheadTitle = pageData?.masthead_heading?.raw;
    const workList = pageData?.work_list;
    const paginationSize = 9;
    const [loadedArticles, setLoadedArticles] = useState([...workList.slice(0, paginationSize)]);
    const [loadMore, setLoadMore] = useState(false);
    const [hasMore, setHasMore] = useState(workList.length > 0);
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
                {loadedArticles && (
                    <>
                        <WorkList
                            items={loadedArticles}
                        />
                        {hasMore && (
                            <Pagination
                                allArticles={workList}
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
    query($id: String!) {
		prismicSiteData {
            ...HeaderQuery
        }
        prismicWorkIndexPage(id: { eq: $id }) {
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
                work_list {
                    work_article {
                        document {
                            ... on PrismicWorkIndividualPage {
                                data {
                                    masthead_client_logo {
                                        document {
                                            ... on PrismicClientsData {
                                                data {
                                                    client_logo {
                                                        alt
                                                        url
                                                    }
                                                    client_name {
                                                        text
                                                    }
                                                }
                                            }
                                        }
                                    }
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
                                }
                                type
                                uid
                            }
                        }
                    }
                }
                body {
					... on PrismicWorkIndexPageBodyBlogListFeatured {
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
                    ... on PrismicWorkIndexPageBodyButton {
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
					... on PrismicWorkIndexPageBodyClientList {
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
					... on PrismicWorkIndexPageBodyContent {
						primary {
							content {
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
					... on PrismicWorkIndexPageBodyContentImage {
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
					... on PrismicWorkIndexPageBodyContentImageList {
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
					... on PrismicWorkIndexPageBodyHr {
						slice_type
					}
					... on PrismicWorkIndexPageBodyImage {
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
					... on PrismicWorkIndexPageBodyIndustryList {
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
					... on PrismicWorkIndexPageBodyLinkList {
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
                    ... on PrismicWorkIndexPageBodySectionTitle {
                        primary {
                            section_title {
                                raw
							}
                        }
                        slice_type
					}
					... on PrismicWorkIndexPageBodyStatList {
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
					... on PrismicWorkIndexPageBodyTeamList {
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
					... on PrismicWorkIndexPageBodyTestimonial {
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
					... on PrismicWorkIndexPageBodyVideo {
						primary {
							video_caption {
								raw
							}
							video_youtube_or_vimeo_video {
								html
							}
						}
						slice_type
					}
					... on PrismicWorkIndexPageBodyWorkListFeatured {
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
                }
            }
        }
    }
`;

WorkIndexPage.propTypes = propTypes;
WorkIndexPage.defaultProps = defaultProps;

export default withPreview(WorkIndexPage);
