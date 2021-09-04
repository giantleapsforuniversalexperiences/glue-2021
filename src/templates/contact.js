import React from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';
import PropTypes from 'prop-types';
import Shell from 'patterns/shell/Shell';
import loadable from '@loadable/component';

import '../scss/main.scss';
import './contact.scss';

import ContactForm from 'patterns/contactform/ContactForm';
import ContactLinkGroup from 'patterns/contactlinkgroup/ContactLinkGroup';
import Masthead from 'patterns/masthead/Masthead';

const defaultProps = {};

const propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

function ContactPage({
    data,
    location: {
        pathname,
    },
}) {
	const siteData = data?.prismicSiteData;
	const pageData = data?.prismicContactPage?.data;
	const pageMetaDescription = pageData?.page_meta_description?.text;
	const pageMetaTitle = pageData?.page_meta_title?.text;
    const pageSocialShareImage = pageData?.page_social_share_image?.url;
	const mastheadOverline = pageData?.masthead_overline?.text;
    const mastheadTitle = pageData?.masthead_heading?.raw;
    const formTitle = pageData?.form_title?.text;
    const formSubtitle1 = pageData?.form_subtitle_1?.text;
    const formSubtitle2 = pageData?.form_subtitle_2?.text;
    const formInquiryOptions = pageData?.form_inquiry_options;
    const formConfirmationOptions = pageData?.form_confirmation_options;
    const contactLinks = pageData?.body;
    let index = 0;

    return (
        <Shell
			pathname={pathname}
			seoDescription={pageMetaDescription}
			seoImage={pageSocialShareImage}
			seoTitle={pageMetaTitle}
			siteData={siteData}
        >
            <main>
                {(mastheadOverline || mastheadTitle) && (
                    <Masthead
                        overline={mastheadOverline}
                        title={mastheadTitle}
                    />
                )}
                <div className="content-list content-equal-split">
                    <div className="content-block">
                        {formTitle && (
                            <h3 className="section-title">{formTitle}</h3>
                        )}
                        <ContactForm
                            formSubtitle1={formSubtitle1}
                            formSubtitle2={formSubtitle2}
                            formInquiryOptions={formInquiryOptions}
                            formConfirmationOptions={formConfirmationOptions}
                        />
                    </div>
                    <div className="content-block contact-block">
                        {contactLinks.map(({ items, primary }) => {
                            index++;

                            return (
                                <ContactLinkGroup
                                    links={items}
                                    title={primary?.link_group_title?.text}
                                    key={`${primary?.link_group_title?.text}${index}`}
                                />
                            );
                        })}
                    </div>
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
        prismicContactPage(id: { eq: $id }) {
            data {
                masthead_heading {
                    raw
                }
                masthead_overline {
                    text
                }
                page_meta_description {
                    text
                }
                page_meta_title {
                    text
                }
                page_social_share_image {
                    url
                }
                form_confirmation_options {
                    form_confirmation_option {
                        raw
                        text
                    }
                    form_confirmation_option_short {
                        text
                    }
                    form_confirmation_option_required
                }
                form_inquiry_options {
                    form_enquiry_option {
                        text
                    }
                    form_enquiry_option_short {
                        text
                    }
                }
                form_subtitle_1 {
                    text
                }
                form_subtitle_2 {
                    text
                }
                form_title {
                    text
                }
                body {
                    ... on PrismicContactPageBodyLinkGroup {
                        items {
                            link_goup_link_text {
                                text
                            }
                            link_group_link_url {
                                link_type
                                type
                                uid
                                url
                            }
                        }
                        primary {
                            link_group_title {
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

ContactPage.propTypes = propTypes;
ContactPage.defaultProps = defaultProps;

export default withPreview(ContactPage);