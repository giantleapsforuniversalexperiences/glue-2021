import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { HeadingContext } from './HeadingContext';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: '',
};

const Heading = forwardRef(({
    children,
    ...props
}, ref) => (
    <HeadingContext.Consumer>
        {(level) => {
            const H = `h${Math.min(level, 6)}`;

            return (
                <H ref={ref} {...props}>{children}</H>
            );
        }}
    </HeadingContext.Consumer>
));

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;