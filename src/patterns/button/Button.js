import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Button.scss';

const Link = loadable(() => import('components/link/Link'));

const defaultProps = {
    className: '',
    text: '',
    url: {},
};

const propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.object,
};

function Button({
    className,
    text,
    url,
}) {
    return (
        <>
            <Link className={`button ${className}`} to={url}>{text}</Link>
        </>
    );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;