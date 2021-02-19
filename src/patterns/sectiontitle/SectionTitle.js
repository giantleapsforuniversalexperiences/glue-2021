import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './SectionTitle.scss';

const Content = loadable(() => import('components/content/Content'));

const defaultProps = {
    className: '',
    title: [],
};

const propTypes = {
    className: PropTypes.string,
    title: PropTypes.array,
};

function SectionTitle({
    className,
    title,
}) {
    return (
        <>
            <Content className={`section-title ${className}`} content={title} />
        </>
    );
}

SectionTitle.propTypes = propTypes;
SectionTitle.defaultProps = defaultProps;

export default SectionTitle;