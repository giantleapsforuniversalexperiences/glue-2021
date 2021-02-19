import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Video.scss';

const Content = loadable(() => import('components/content/Content'));

const defaultProps = {
    caption: [],
    className: '',
    video: '',
};

const propTypes = {
    caption: PropTypes.array,
    className: PropTypes.string,
    video: PropTypes.string,
};

function Video({
    caption,
    className,
    video,
}) {
    return (
        <>
            {video && (
                <figure className={`video ${className}`}>
                    <div className="video-tile" dangerouslySetInnerHTML={{ __html: video }} />
                    {caption && (
                        <figcaption>
                            <Content content={caption} />
                        </figcaption>
                    )}
                </figure>
            )}
        </>
    );
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;