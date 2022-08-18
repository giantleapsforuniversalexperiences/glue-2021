import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import { renderComponents } from 'utility/renderComponents';
import Shell from 'patterns/shell/Shell';
import loadable from '@loadable/component';

import '../scss/main.scss';

import Masthead from 'patterns/masthead/Masthead';
import Pagination from 'patterns/pagination/Pagination';
import WorkFilter from 'patterns/workfilter/WorkFilter';
import WorkList from 'patterns/worklist/WorkList';

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
	const [filteredWorkList, setFilteredWorkList] = useState(workList);
    const [loadedArticles, setLoadedArticles] = useState([...filteredWorkList.slice(0, paginationSize)]);
    const [loadMore, setLoadMore] = useState(false);
    const [hasMore, setHasMore] = useState(filteredWorkList.length > 0);
	const [activeFilters, setActiveFilters] = useState([]);
    const components = pageData?.body;
	const allArticleIndustryFilters = [];
	const allArticleServiceFilters = [];
	const industryFilters = {};
	const serviceFilters = {};

	pageData?.work_list.map(({ work_article }) => {
		const articleIndustries = work_article?.document?.data?.page_industries;
		const articleServices = work_article?.document?.data?.page_services;

		articleIndustries.map(({ page_industry }) => {
			if (page_industry.document) {
				allArticleIndustryFilters.push(page_industry?.document?.data?.industry_name?.text);
			}
		});

		articleServices.map(({ page_service }) => {
			if (page_service.document) {
				allArticleServiceFilters.push(page_service?.document?.data?.service_name?.text);
			}
		});
	});

	allArticleIndustryFilters.forEach((item) => {
		industryFilters[item] = (industryFilters[item] || 0) + 1;
	});

	allArticleServiceFilters.forEach((item) => {
		serviceFilters[item] = (serviceFilters[item] || 0) + 1;
	});

	useEffect(() => {
		let tempFilteredWorkList = [];

		if (activeFilters.length > 0) {
			activeFilters.forEach((filter) => {
				tempFilteredWorkList.push(workList.filter(item => item.work_article.document.data.page_industries.some(industry => industry?.page_industry?.document?.data.industry_name?.text === filter)));
				tempFilteredWorkList.push(workList.filter(item => item.work_article.document.data.page_services.some(service => service?.page_service?.document?.data.service_name?.text === filter)));
			});
		} else {
			tempFilteredWorkList = workList;
		}

		const flattenedTempFilteredWorkList = [].concat(...tempFilteredWorkList);
		const jsonObject = flattenedTempFilteredWorkList.map(JSON.stringify);
		const uniqueSet = new Set(jsonObject);
		const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

		setFilteredWorkList(uniqueArray);
	}, [activeFilters]);

	useEffect(() => {
		setLoadedArticles([...filteredWorkList.slice(0, paginationSize)]);
		setHasMore(filteredWorkList.length > 0);
	}, [filteredWorkList]);

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
				<WorkFilter
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
					industries={industryFilters}
					services={serviceFilters}
				/>
                {loadedArticles && (
                    <>
                        <WorkList
							className={activeFilters.length > 0 ? 'has-filters' : ''}
                            items={loadedArticles}
                        />
                        {hasMore && (
                            <Pagination
                                allArticles={filteredWorkList}
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
									page_services {
										page_service {
											document {
												... on PrismicServicesData {
													data {
														service_name {
															text
														}
													}
												}
											}
										}
									}
									page_industries {
										page_industry {
											document {
												... on PrismicIndustriesData {
													data {
														industry_name {
															text
														}
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
					work_card_size
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
					... on PrismicWorkIndexPageBodyContent {
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
					... on PrismicWorkIndexPageBodyCallToAction {
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
					... on PrismicWorkIndexPageBodyAccordion {
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
					... on PrismicWorkIndexPageBodyAutoplayVideo {
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
					... on PrismicWorkIndexPageBodyLottieAnimation {
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

WorkIndexPage.propTypes = propTypes;
WorkIndexPage.defaultProps = defaultProps;

export default withPreview(WorkIndexPage);
