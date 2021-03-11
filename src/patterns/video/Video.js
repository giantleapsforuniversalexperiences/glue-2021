import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Video.scss';

const ReactPlayer = loadable(() => import('react-player/lazy'));
const Content = loadable(() => import('components/content/Content'));

const defaultProps = {
    caption: [],
    className: '',
    coverVideo: '',
    title: '',
    video: '',
};

const propTypes = {
    caption: PropTypes.array,
    className: PropTypes.string,
    coverVideo: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.string,
};

function Video({
    caption,
    className,
    coverVideo,
    title,
    video,
}) {
    const videoUrl = video?.split('src=')[1].split(/[ >]/)[0].slice(1,-1);
    const [isPlayingEmbed, setIsPlayingEmbed] = useState(false);
    const embedControls = (coverVideo) ? false : true;

    function playEmbed() {
        setIsPlayingEmbed(!isPlayingEmbed);
	}

    return (
        <>
            {(coverVideo || videoUrl) && (
                <figure className={`video ${className}`}>
                    <div className="video-tile">
                        {(videoUrl && !coverVideo) && (
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
                        )}
                        {(!videoUrl && coverVideo) && (
                            <video autoPlay loop muted playsInline loading="lazy" src={coverVideo}></video>
                        )}
                        {(videoUrl && coverVideo) && (
                            <>
                                {!isPlayingEmbed && (
                                    <>
                                        <button aria-label="Play full video" className="video__play-button" onClick={playEmbed} type="button">Play</button>
                                        <video autoPlay loop muted playsInline loading="lazy" src={coverVideo}></video>
                                    </>
                                )}
                                {isPlayingEmbed && (
                                    <ReactPlayer
                                        controls={false}
                                        playing={isPlayingEmbed}
                                        url={videoUrl}
                                    />
                                )}
                            </>
                        )}
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