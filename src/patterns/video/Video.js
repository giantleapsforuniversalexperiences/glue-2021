import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Video.scss';

const Content = loadable(() => import('components/content/Content'));

const defaultProps = {
    caption: [],
    className: '',
    title: '',
    video: '',
};

const propTypes = {
    caption: PropTypes.array,
    className: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.string,
};

function Video({
    caption,
    className,
    title,
    video,
}) {
    const videoUrl = video?.split('src=')[1].split(/[ >]/)[0].slice(1,-1);

    return (
        <>
            {video && (
                <figure className={`video ${className}`}>
                    <div className="video-tile">
                        <iframe
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen={true}
                            frameBorder="0"
                            loading="lazy"
                            mozallowfullscreen="true"
                            src={videoUrl}
                            title={title}
                            webkitallowfullscreen="true"
                        />
                    </div>
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