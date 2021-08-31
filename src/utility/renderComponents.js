import React from 'react';
import loadable from '@loadable/component';

const BlogListFeatured = loadable(() => import('patterns/bloglistfeatured/BlogListFeatured'));
const Button = loadable(() => import('patterns/button/Button'));
const ClientList = loadable(() => import('patterns/clientlist/ClientList'));
const Content = loadable(() => import('patterns/content/Content'));
const ContentImage = loadable(() => import('patterns/contentimage/ContentImage'));
const ContentImageList = loadable(() => import('patterns/contentimagelist/ContentImageList'));
const CTA = loadable(() => import('patterns/CTA/CTA'));
const Hr = loadable(() => import('patterns/hr/Hr'));
const Image = loadable(() => import('patterns/image/Image'));
const IndustryList = loadable(() => import('patterns/industrylist/IndustryList'));
const LinkList = loadable(() => import('patterns/linklist/LinkList'));
const SectionTitle = loadable(() => import('patterns/sectiontitle/SectionTitle'));
const StatList = loadable(() => import('patterns/statlist/StatList'));
const TeamList = loadable(() => import('patterns/teamlist/TeamList'));
const Testimonial = loadable(() => import('patterns/testimonial/Testimonial'));
const Video = loadable(() => import('patterns/video/Video'));
const WorkListFeatured = loadable(() => import('patterns/worklistfeatured/WorkListFeatured'));

let index = 0;

function renderComponents(component, type, siteData) {
    switch (type) {
    case 'blog_list_featured':
        index++;
        return (
            <BlogListFeatured
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    case 'button':
        index++;
        return (
            <Button
                key={`${type}-${index}`}
                text={component?.primary?.button_link_text?.text}
                url={component?.primary?.button_link_url}
            />
        );
    case 'call_to_action':
        index++;
        return (
            <CTA
                key={`${type}-${index}`}
                buttonText={component?.primary?.cta_button_text?.text}
                buttonUrl={component?.primary?.cta_button_url}
                emailTitle={component?.primary?.cta_email_title?.text}
                emailLinkText={component?.primary?.cta_email_link_text?.text}
                emailLinkUrl={component?.primary?.cta_email_link_url}
                linkText={component?.primary?.cta_link_text?.text}
                linkUrl={component?.primary?.cta_link_url}
                phoneTitle={component?.primary?.cta_phone_title?.text}
                phoneLinkText={component?.primary?.cta_phone_link_text?.text}
                phoneLinkUrl={component?.primary?.cta_phone_link_url}
                title={component?.primary?.cta_title?.text}
                siteData={siteData}
            />
        );
    case 'client_list':
        index++;
        return (
            <ClientList
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    case 'content':
        index++;
        return (
            <Content
                key={`${type}-${index}`}
                content={component?.primary?.content?.raw}
                contentMore={component?.primary?.content_more?.raw}
                linkText={component?.primary?.content_link_text?.text}
                linkUrl={component?.primary?.content_link_url}
                title={component?.primary?.content_title?.raw}
            />
        );
    case 'content_image':
        index++;
        return (
            <ContentImage
                key={`${type}-${index}`}
                content={component?.primary?.content_image_content?.raw}
                image={component?.primary?.content_image_image}
                linkText={component?.primary?.content_image_link_text?.raw}
                linkUrl={component?.primary?.content_image_link_url}
                title={component?.primary?.content_image_title?.raw}
            />
        );
    case 'content_image_list':
        index++;
        return (
            <ContentImageList
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    case 'hr':
        index++;
        return (
            <Hr
                key={`${type}-${index}`}
            />
        );
    case 'image':
        index++;
        return (
            <Image
                key={`${type}-${index}`}
                caption={component?.primary?.image_caption?.raw}
                image={component?.primary?.image}
            />
        );
    case 'industry_list':
        index++;
        return (
            <IndustryList
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    case 'link_list':
        index++;
        return (
            <LinkList
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    case 'section_title':
        index++;
        return (
            <SectionTitle
                key={`${type}-${index}`}
                title={component?.primary?.section_title?.raw}
            />
        );
    case 'stat_list':
        index++;
        return (
            <StatList
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    case 'team_list':
        index++;
        return (
            <TeamList
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    case 'testimonial':
        index++;
        return (
            <Testimonial
                key={`${type}-${index}`}
                authorName={component?.primary?.testimonial?.document?.data?.testimonial_author_name?.text}
                clientLogo={component?.primary?.testimonial?.document?.data?.testimonial_client_logo?.document?.data?.client_logo}
                clientName={component?.primary?.testimonial?.document?.data?.testimonial_client_logo?.document?.data?.client_name?.text}
                quote={component?.primary?.testimonial?.document?.data?.testimonial_quote?.text}
            />
        );
    case 'video':
        index++;
        return (
            <Video
                key={`${type}-${index}`}
                caption={component?.primary?.video_caption?.raw}
                coverVideo={component?.primary?.video_cover_video?.url}
                title={component?.primary?.video_youtube_or_vimeo_video?.title}
                video={component?.primary?.video_youtube_or_vimeo_video?.html}
            />
        );
    case 'work_list_featured':
        index++;
        return (
            <WorkListFeatured
                key={`${type}-${index}`}
                items={component?.items}
            />
        );
    default:
        return null;
    }
}

export { renderComponents };