import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
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
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <GatsbyLink
            activeClassName={activeClassName}
            className={className}
            ref={ref}
            partiallyActive={partiallyActive}
            to={url}
            {...rest}
        >
            {children}
        </GatsbyLink>
    );
});

Link.displayName = 'Link';
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;