import React from 'react';
import PropTypes from 'prop-types';

import './Hr.scss';

const defaultProps = {
    className: '',
};

const propTypes = {
    className: PropTypes.string,
};

function Hr({
    className,
}) {
    return (
        <>
            <hr className={className} />
        </>
    );
}

Hr.propTypes = propTypes;
Hr.defaultProps = defaultProps;

export default Hr;