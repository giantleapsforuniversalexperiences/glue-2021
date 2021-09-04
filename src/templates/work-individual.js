import React from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import { renderComponents } from 'utility/renderComponents';
import Shell from 'patterns/shell/Shell';
import loadable from '@loadable/component';

import '../scss/main.scss';
import './work-individual.scss';

import Hr from 'patterns/hr/Hr';
import MastheadWork from 'patterns/mastheadwork/MastheadWork';
import SectionTitle from 'patterns/sectiontitle/SectionTitle';
import WorkListFeatured from 'patterns/worklistfeatured/WorkListFeatured';

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function WorkIndividualPage({
    data,
    location: {
        pathname,
    },
}) {
	const siteData = data?.prismicSiteData;
	const pageData = data?.prismicWorkIndividualPage?.data;
	const pageDarkMode = (pageData?.page_dark_mode) ? 'dark' : '';
	const pageMetaDescription = pageData?.page_meta_description?.text;
	const pageMetaTitle = pageData?.page_meta_title?.text;
    const pageSocialShareImage = pageData?.page_social_share_image?.url;
    const mastheadClientLogo = pageData?.masthead_client_logo?.document?.data?.client_logo;
    const mastheadClientName = pageData?.masthead_client_logo?.document?.data?.client_name?.text;
    const mastheadImage = pageData?.masthead_image;
    const mastheadTitle = pageData?.masthead_heading?.raw;
	const components = pageData?.body;
	const relatedPosts = pageData?.related_posts;
	const relatedPostsTitle = pageData?.related_posts_title?.raw;

    return (
        <Shell
			bodyClassName={pageDarkMode}
			pathname={pathname}
			seoDescription={pageMetaDescription}
			seoImage={pageSocialShareImage}
			seoTitle={pageMetaTitle}
			siteData={siteData}
        >
            <main className="work-single">
                {(mastheadTitle) && (
                    <MastheadWork
                        clientLogo={mastheadClientLogo}
                        clientName={mastheadClientName}
                        image={mastheadImage}
                        title={mastheadTitle}
                    />
                )}
                {components?.map(component => (
                    renderComponents(component, component?.slice_type)
                ))}
            </main>
			{relatedPosts[0]?.related_posts_article?.document && (
                <main>
                    {relatedPostsTitle && (
                        <SectionTitle
                            title={relatedPostsTitle}
                        />
                    )}
                    <WorkListFeatured
                        items={relatedPosts}
                    />
                </main>
            )}
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
        prismicWorkIndividualPage(id: { eq: $id }) {
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
                    raw
                }
                masthead_image {
                    alt
                    dimensions {
                        height
                        width
                    }
                    url
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
                body {
					... on PrismicWorkIndividualPageBodyBlogListFeatured {
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
                    ... on PrismicWorkIndividualPageBodyButton {
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
					... on PrismicWorkIndividualPageBodyClientList {
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
					... on PrismicWorkIndividualPageBodyContent {
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
					... on PrismicWorkIndividualPageBodyContentImage {
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
					... on PrismicWorkIndividualPageBodyContentImageList {
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
					... on PrismicWorkIndividualPageBodyHr {
						slice_type
					}
					... on PrismicWorkIndividualPageBodyImage {
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
					... on PrismicWorkIndividualPageBodyIndustryList {
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
					... on PrismicWorkIndividualPageBodyLinkList {
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
                    ... on PrismicWorkIndividualPageBodySectionTitle {
                        primary {
                            section_title {
                                raw
							}
                        }
                        slice_type
					}
					... on PrismicWorkIndividualPageBodyStatList {
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
					... on PrismicWorkIndividualPageBodyTeamList {
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
					... on PrismicWorkIndividualPageBodyTestimonial {
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
					... on PrismicWorkIndividualPageBodyVideo {
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
					... on PrismicWorkIndividualPageBodyWorkListFeatured {
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
				related_posts {
                    related_posts_article {
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
                related_posts_title {
                    raw
                }
            }
        }
    } 
`;

WorkIndividualPage.propTypes = propTypes;
WorkIndividualPage.defaultProps = defaultProps;

export default withPreview(WorkIndividualPage);