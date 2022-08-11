import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Video.scss';

import ReactPlayer from 'react-player/lazy';
import Content from 'components/content/Content';

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
    const [embedTouched, setEmbedTouched] = useState(false);

    function playEmbed() {
        setIsPlayingEmbed(!isPlayingEmbed);
        setEmbedTouched(true);
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
                                {!embedTouched && (
                                    <>
                                        <button aria-label="Play full video" className="video__play-button" onClick={playEmbed} type="button">Play</button>
                                        <video autoPlay loop muted playsInline loading="lazy" src={coverVideo}></video>
                                    </>
                                )}
                                {embedTouched && (
                                    <>
                                        <button aria-label={`${isPlayingEmbed} ? 'Play video' : 'Pause video'`} className="video__full-play-button" onClick={() => setIsPlayingEmbed(!isPlayingEmbed)} type="button" />
                                        <ReactPlayer
                                            controls={false}
                                            playing={isPlayingEmbed}
                                            url={videoUrl}
                                            loop={true}
                                        />
                                    </>
                                )}
                            </>
                        )}
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

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;
