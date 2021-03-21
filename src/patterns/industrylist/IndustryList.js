import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './IndustryList.scss';

const Content = loadable(() => import('components/content/Content'));
const Image = loadable(() => import('components/image/Image'));

const defaultProps = {
    className: '',
    items: [],
};

const propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
};

function IndustryList({
    className,
    items,
}) {
    let index = 0;

    return (
        <>
            <div className={`industries ${className}`}>
                {items.map(({ industry_image, industry_title }) => {
                    index++;
                    const image = industry_image;
                    const imageAlt = (image?.alt) ? image?.alt : '';
                    const imageHeight = image?.dimensions?.height;
                    const imageUrl = image?.url;
                    const imageWidth = image?.dimensions?.width;
                    const title = industry_title?.raw;

                    return (
                        <div className="industry" key={`${title}${index}`}>
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
                                />
                            )}
                            {title?.[0]?.text && (
                                <Content content={title} />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

IndustryList.propTypes = propTypes;
IndustryList.defaultProps = defaultProps;

export default IndustryList;