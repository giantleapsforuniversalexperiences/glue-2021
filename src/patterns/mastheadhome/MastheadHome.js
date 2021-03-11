import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './MastheadHome.scss';

const Content = loadable(() => import('components/content/Content'));

const defaultProps = {
    strapline: '',
    title: [],
};

const propTypes = {
    strapline: PropTypes.string,
    title: PropTypes.array,
};

function MastheadHome({
    strapline,
    title,
}) {
    return (
        <>
            {title?.[0]?.text && (
                <Content
                    className="hero"
                    content={title}
                />
            )}
            {strapline && (
                <p className="byline">{strapline}</p>
            )}
        </>
    );
}

MastheadHome.propTypes = propTypes;
MastheadHome.defaultProps = defaultProps;

export default MastheadHome;