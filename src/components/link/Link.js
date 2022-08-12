import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import TransitionLink from 'gatsby-plugin-transition-link';
import linkResolver from 'utility/linkResolver';

const activeClassName = 'active';

const defaultProps = {
    className: '',
    children: null,
    partiallyActive: false,
    to: {},
    typename: '',
};

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    partiallyActive: PropTypes.bool,
    to: PropTypes.object,
    typename: PropTypes.string,
};

const Link = forwardRef(({
    className,
    children,
    partiallyActive,
    to,
    typename,
    ...rest
}, ref) => {
    const url = linkResolver()(to);
    const isInternal = /^\/(?!\/)/.test(url);

    if (!isInternal) {
        return (
            <a
                className={className}
                href={url}
                ref={ref}
                rel="noopener noreferrer"
                target="_blank"
                id={`${to?.link_type?.toLowerCase()}-${to?.url?.replace(/[^A-Za-z0-9]/g, '-')}`}
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <TransitionLink
            activeClassName={activeClassName}
            className={className}
            ref={ref}
            partiallyActive={partiallyActive}
            to={url}
            {...rest}
            exit={{
                length: 0.3,
            }}
            entry={{
                delay: 0.3,
                length: 0.6,
            }}
            id={`${to?.link_type?.toLowerCase()}-${to?.uid}`}
        >
            {children}
        </TransitionLink>
    );
});

Link.displayName = 'Link';
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
