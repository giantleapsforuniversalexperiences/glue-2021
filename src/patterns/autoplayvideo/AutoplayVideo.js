import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './AutoplayVideo.scss';

import Content from 'components/content/Content';

const defaultProps = {
    caption: [],
    className: '',
    videoUrl: '',
};

const propTypes = {
    caption: PropTypes.array,
    className: PropTypes.string,
    videoUrl: PropTypes.string,
};

function AutoplayVideo({
    caption,
    className,
    videoUrl,
}) {

    return (
        <>
            {(videoUrl) && (
                <figure className={`autoplay-video ${className}`}>
                    <div className="autoplay-video-tile">
                        <video autoPlay loop muted playsInline loading="lazy" src={videoUrl}></video>
                    </div>
                    {caption?.[0]?.text && (
                        <figcaption>
                            <Content content={caption} />
                        </figcaption>
                    )}
                </figure>
            )}
        </>
    );
}

AutoplayVideo.propTypes = propTypes;
AutoplayVideo.defaultProps = defaultProps;

export default AutoplayVideo;
