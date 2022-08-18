import React from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import Lottie from 'react-lottie-player';

import './LottieAnimation.scss';

const defaultProps = {
    animationData: {},
    className: '',
};


const propTypes = {
    animationData: PropTypes.object,
    className: PropTypes.string,
};

function LottieAnimation({
    animationData,
    className,
}) {
    return (
        <>
            {animationData && (
                <InView threshold={1} triggerOnce={true}>
                    {({ inView, ref, entry }) => {
                        const isVisible = entry && inView;
                        const isVisibleClass = (isVisible) ? 'is-visible' : '';

                        return (
                            <div className={`lottie-animation ${className} ${isVisibleClass}`} ref={ref}>
                                {isVisible && (
                                    <Lottie animationData={JSON.parse(animationData)} loop play />
                                )}
                            </div>
                        );
                    }}
                </InView>
            )}
        </>
    );
}

LottieAnimation.propTypes = propTypes;
LottieAnimation.defaultProps = defaultProps;

export default LottieAnimation;
