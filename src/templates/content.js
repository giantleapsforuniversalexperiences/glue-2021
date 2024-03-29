import React from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import { renderComponents } from 'utility/renderComponents';
import Shell from 'patterns/shell/Shell';

import '../scss/main.scss';

import Masthead from 'patterns/masthead/Masthead';

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function ContentPage({
    data,
    location: {
        pathname,
    },
}) {
	const siteData = data?.prismicSiteData;
	const pageData = data?.prismicContentPage?.data;
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
            <main>
                {(mastheadOverline || mastheadContent || mastheadTitle) && (
                    <Masthead
                        backgroundImage={mastheadBackgroundImage}
                        content={mastheadContent}
						marginBottom={pageData?.masthead_margin_bottom}
                        overline={mastheadOverline}
                        title={mastheadTitle}
                    />
                )}
                {components?.map(component => (
                    renderComponents(component, component?.slice_type, siteData)
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
		prismicSiteData {
            ...FooterQuery
		}
		prismicSiteData {
            ...CookiebarQuery
        }
		prismicSiteData {
            ...CtaQuery
        }
        prismicContentPage(id: { eq: $id }) {
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
                body {
					... on PrismicContentPageBodyBlogListFeatured {
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
                    ... on PrismicContentPageBodyButton {
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
					... on PrismicContentPageBodyClientList {
						items {
							client_list_content {
								raw
							}
							client_list_image {
								alt
								dimensions {
									height
									width
								}
								url
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
					... on PrismicContentPageBodyContent {
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
					... on PrismicContentPageBodyContentImage {
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
					... on PrismicContentPageBodyContentImageList {
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
					... on PrismicContentPageBodyHr {
						slice_type
					}
					... on PrismicContentPageBodyImage {
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
					... on PrismicContentPageBodyIndustryList {
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
					... on PrismicContentPageBodyLinkList {
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
                    ... on PrismicContentPageBodySectionTitle {
                        primary {
                            section_title {
                                raw
							}
                        }
                        slice_type
					}
					... on PrismicContentPageBodyStatList {
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
					... on PrismicContentPageBodyTeamList {
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
					... on PrismicContentPageBodyTestimonial {
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
					... on PrismicContentPageBodyVideo {
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
					... on PrismicContentPageBodyWorkListFeatured {
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
					... on PrismicContentPageBodyCallToAction {
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
					... on PrismicContentPageBodyAccordion {
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
					... on PrismicContentPageBodyAutoplayVideo {
						primary {
							autoplay_video {
								url
							}
							autoplay_video_caption {
								raw
							}
						}
						slice_type
					}
					... on PrismicContentPageBodyLottieAnimation {
						primary {
							lottie_animation_code {
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

ContentPage.propTypes = propTypes;
ContentPage.defaultProps = defaultProps;

export default withPreview(ContentPage);
