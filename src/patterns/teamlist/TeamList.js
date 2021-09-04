import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './TeamList.scss';

import Image from 'components/image/Image';

const defaultProps = {
    className: '',
    items: [],
};

const propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
};

function TeamList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`tiles ${className}`}>
                {items.map(({ team_member }) => {
                    index++;
                    const image = team_member?.document?.data?.team_image;
                    const imageAlt = (image?.alt) ? image?.alt : '';
                    const imageHeight = image?.dimensions?.height;
                    const imageUrl = image?.url;
                    const imageWidth = image?.dimensions?.width;
                    const jobTitle = team_member?.document?.data?.team_job_title?.text;
                    const name = team_member?.document?.data?.team_name?.text;

                    return (
                        <div className="tile" key={`${name}${index}`}>
                            {imageUrl && (
                                <div className="hero-wrapper">
                                    <Image
                                        image={{
                                            alt: imageAlt,
                                            dimensions: {
                                                height: imageHeight,
                                                width: imageWidth,
                                            },
                                            url: imageUrl,
                                        }}
                                        size="medium"
                                    />
                                </div>
                            )}
                            {name && (
                                <h4>{name}</h4>
                            )}
                            {jobTitle && (
                                <p>{jobTitle}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

TeamList.propTypes = propTypes;
TeamList.defaultProps = defaultProps;

export default TeamList;