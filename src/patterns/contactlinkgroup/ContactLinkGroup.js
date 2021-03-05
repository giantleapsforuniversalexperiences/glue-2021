import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './ContactLinkGroup.scss';

const Hr = loadable(() => import('patterns/hr/Hr'));
const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    links: [],
    title: '',
};

const propTypes = {
    links: PropTypes.array,
    title: PropTypes.string,
};

function ContactLinkGroup({
    links,
    title,
}) {
    let index = 0;

    return (
        <>
            {title && (
                <h3 className="section-title">{title}</h3>
            )}
            {links.map(({ link_goup_link_text, link_group_link_url }) => {
                index++;
                const linkText = link_goup_link_text?.text;
                const linkUrl = link_group_link_url;

                return (
                    (linkText && (linkUrl?.url || linkUrl?.uid)) && (
                        <div className="link-wrapper" key={`${linkText}${index}`}>
                            <Link className="link" to={linkUrl}>{linkText}</Link>
                        </div>
                    )
                );
            })}
            <Hr />
        </>
    );
}

ContactLinkGroup.propTypes = propTypes;
ContactLinkGroup.defaultProps = defaultProps;

export default ContactLinkGroup;
