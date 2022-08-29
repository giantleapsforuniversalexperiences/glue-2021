import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Video.scss';

import ReactPlayer from 'react-player/lazy';
import Vimeo from '@u-wave/react-vimeo';
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
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [embedTouched, setEmbedTouched] = useState(false);

    function playEmbed() {
        setEmbedTouched(true);
        setIsPlayingEmbed(true);
	}

    // alert(isPlayingEmbed)
    console.log(isPlayingAudio)

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
                                        <button aria-label={`${isPlayingEmbed} ? 'Play video' : 'Pause video'`} className="video__full-play-button" onClick={() => setIsPlayingAudio(!isPlayingAudio)} type="button" />

                                        <svg className={`video__volume-on ${isPlayingAudio && 'visible'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3832 4.23347C13.6584 2.97466 12.0796 2.49663 10.7783 3.14198C10.3593 3.34976 9.99525 3.77632 9.64355 4.245C9.27178 4.74043 8.81351 5.42784 8.22707 6.3075L8.21268 6.32909C7.95868 6.71009 7.88712 6.81099 7.81032 6.88724C7.63739 7.0589 7.41807 7.17628 7.17932 7.22494C7.07327 7.24655 6.94963 7.25012 6.49172 7.25012L6.00005 7.25012L5.88425 7.2501C5.06629 7.24983 4.50814 7.24964 4.02948 7.3779C2.73538 7.72465 1.72458 8.73545 1.37783 10.0295C1.24957 10.5082 1.24975 11.0664 1.25002 11.8843L1.25005 12.0001L1.25002 12.1159C1.24975 12.9339 1.24957 13.492 1.37783 13.9707C1.72458 15.2648 2.73538 16.2756 4.02948 16.6223C4.50813 16.7506 5.06627 16.7504 5.88421 16.7501L5.88426 16.7501L6.00005 16.7501L6.49172 16.7501C6.94963 16.7501 7.07327 16.7537 7.17932 16.7753C7.41807 16.824 7.63739 16.9413 7.81032 17.113C7.88712 17.1892 7.95868 17.2901 8.21268 17.6711L8.2271 17.6928C8.81352 18.5724 9.27179 19.2598 9.64355 19.7552C9.99525 20.2239 10.3593 20.6505 10.7783 20.8583C12.0796 21.5036 13.6584 21.0256 14.3832 19.7668C14.6166 19.3615 14.6829 18.8046 14.7155 18.2196C14.7501 17.6011 14.7501 16.775 14.75 15.7179L14.75 15.7178L14.75 15.7178L14.75 15.7178L14.75 15.6918L14.75 8.30844L14.75 8.28249L14.75 8.28245L14.75 8.28241L14.75 8.28237C14.75 7.22522 14.7501 6.39909 14.7155 5.78068C14.6829 5.19562 14.6166 4.63878 14.3832 4.23347ZM16.3763 9.5836C16.6064 9.23914 17.0721 9.14638 17.4166 9.37641C18.2402 9.92647 18.75 10.9168 18.75 12.0001C18.75 13.0835 18.2402 14.0738 17.4166 14.6238C17.0721 14.8539 16.6064 14.7611 16.3763 14.4166C16.1463 14.0722 16.2391 13.6064 16.5835 13.3764C16.9555 13.128 17.25 12.626 17.25 12.0001C17.25 11.3742 16.9555 10.8722 16.5835 10.6238C16.2391 10.3938 16.1463 9.92807 16.3763 9.5836ZM18.4166 5.37641C18.0721 5.14637 17.6064 5.23914 17.3763 5.5836C17.1463 5.92807 17.2391 6.39379 17.5835 6.62383C19.1511 7.67064 20.25 9.66501 20.25 12.0001C20.25 14.3352 19.1511 16.3296 17.5835 17.3764C17.2391 17.6064 17.1463 18.0722 17.3763 18.4166C17.6064 18.7611 18.0721 18.8539 18.4166 18.6238C20.4359 17.2753 21.75 14.7927 21.75 12.0001C21.75 9.20754 20.4359 6.72491 18.4166 5.37641Z" fill="currentColor"/>
                                        </svg>

                                        <svg className={`video__volume-off ${!isPlayingAudio && 'visible'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.53038 2.46967C3.23748 2.17678 2.76261 2.17678 2.46972 2.46967C2.17682 2.76256 2.17682 3.23744 2.46972 3.53033L6.18939 7.25L6.00005 7.25L5.88425 7.24998L5.88425 7.24998L5.88424 7.24998L5.88424 7.24998C5.06628 7.24971 4.50813 7.24952 4.02948 7.37778C2.73538 7.72453 1.72458 8.73533 1.37783 10.0294C1.24957 10.5081 1.24975 11.0662 1.25002 11.8842L1.25005 12L1.25002 12.1158C1.24975 12.9338 1.24957 13.4919 1.37783 13.9706C1.72458 15.2647 2.73538 16.2755 4.02948 16.6222C4.50814 16.7505 5.06629 16.7503 5.88425 16.75L6.00005 16.75L6.49172 16.75C6.94963 16.75 7.07327 16.7536 7.17932 16.7752C7.41807 16.8238 7.63739 16.9412 7.81032 17.1129C7.88712 17.1891 7.95868 17.29 8.21268 17.671L8.22706 17.6926C8.8135 18.5723 9.27178 19.2597 9.64355 19.7551C9.99525 20.2238 10.3593 20.6504 10.7783 20.8581C12.0796 21.5035 13.6584 21.0255 14.3832 19.7666C14.6166 19.3613 14.6829 18.8045 14.7155 18.2194C14.749 17.6193 14.75 16.8234 14.75 15.8107L20.4697 21.5303C20.7626 21.8232 21.2375 21.8232 21.5304 21.5303C21.8233 21.2374 21.8233 20.7626 21.5304 20.4697L14.5304 13.4697L8.33084 7.27013L3.53038 2.46967ZM14.3832 4.23335C13.6584 2.97454 12.0796 2.49651 10.7783 3.14186C10.4569 3.30122 10.1827 3.57888 9.93648 3.8731C9.67948 4.18023 9.39033 4.58409 9.05356 5.07675C8.84995 5.3746 8.88727 5.77521 9.14239 6.03033L13.4697 10.3577C13.6842 10.5722 14.0068 10.6363 14.2871 10.5202C14.5673 10.4042 14.75 10.1307 14.75 9.82733L14.75 8.30833L14.75 8.28237L14.75 8.28233L14.75 8.28229L14.75 8.28225C14.75 7.2251 14.7501 6.39897 14.7155 5.78056C14.6829 5.1955 14.6166 4.63866 14.3832 4.23335ZM16.3763 9.58348C16.6064 9.23902 17.0721 9.14625 17.4166 9.37629C18.2402 9.92635 18.75 10.9167 18.75 12C18.75 12.457 18.6599 12.8943 18.4955 13.2886C18.3361 13.6709 17.897 13.8516 17.5147 13.6923C17.1323 13.5329 16.9516 13.0937 17.111 12.7114C17.1989 12.5006 17.25 12.2595 17.25 12C17.25 11.3741 16.9555 10.8721 16.5835 10.6237C16.2391 10.3937 16.1463 9.92795 16.3763 9.58348ZM18.4166 5.37629C18.0721 5.14625 17.6064 5.23902 17.3763 5.58348C17.1463 5.92795 17.2391 6.39367 17.5835 6.62371C19.1511 7.67052 20.25 9.66489 20.25 12C20.25 12.976 20.0575 13.8955 19.7174 14.7114C19.5859 15.0267 19.4326 15.3263 19.2599 15.6077C19.0432 15.9607 19.1537 16.4225 19.5068 16.6392C19.8598 16.8559 20.3216 16.7453 20.5383 16.3923C20.7521 16.0439 20.9409 15.6748 21.1019 15.2886C21.5185 14.2891 21.75 13.1734 21.75 12C21.75 9.20742 20.4358 6.72479 18.4166 5.37629Z" fill="currentColor"/>
                                        </svg>
                                        
                                        {videoUrl.includes('vimeo') && (
                                            <Vimeo
                                                autoplay
                                                controls={false}
                                                muted={true}
                                                paused={!isPlayingEmbed}
                                                playsinline={true}
                                                loop={true}
                                                video={videoUrl}
                                                volume={isPlayingAudio ? 1 : 0}
                                            />
                                        )}
                                        {!videoUrl.includes('vimeo') && (
                                            <ReactPlayer
                                                controls={true}
                                                muted={true}
                                                playsinline={true}
                                                playing={isPlayingEmbed}
                                                loop={true}
                                                url={videoUrl}
                                            />
                                        )}
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
