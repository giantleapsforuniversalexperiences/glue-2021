import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './Masthead.scss';

import Content from 'components/content/Content';
import Image from 'components/image/Image';

const defaultProps = {
    backgroundImage: {},
    content: [],
    marginBottom: false,
    overline: '',
    title: [],
};

const propTypes = {
    backgroundImage: PropTypes.object,
    content: PropTypes.array,
    marginBottom: PropTypes.bool,
    overline: PropTypes.string,
    title: PropTypes.array,
};

function Masthead({
    backgroundImage,
    content,
    marginBottom,
    overline,
    title,
}) {
    const imageAlt = (backgroundImage?.alt) ? backgroundImage?.alt : '';
    const imageHeight = backgroundImage?.dimensions?.height;
    const imageUrl = backgroundImage?.url;
    const imageWidth = backgroundImage?.dimensions?.width;

    return (
        <>
            <div className={`masthead ${marginBottom && 'masthead--margin-bottom'}`}>
                {overline && (
                    <h1>{overline}</h1>
                )}
                {title?.[0]?.text && (
                    <Content
                        content={title}
                    />
                )}
                {content?.[0]?.text && (
                    <Content
                        className="page-intro"
                        content={content}
                    />
                )}
                {imageUrl && (
                    <Image
                        image={{
                            alt: imageAlt,
                            dimensions: {
                                height: imageHeight,
                                width: imageWidth,
                            },
                            url: imageUrl,
                        }}
                        size="xxxlarge"
                    />
                )}
            </div>
        </>
    );
}

Masthead.propTypes = propTypes;
Masthead.defaultProps = defaultProps;

export default Masthead;
