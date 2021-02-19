import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import htmlSerializer from 'utility/htmlSerializer';

const defaultProps = {
    className: '',
    content: [],
};

const propTypes = {
    className: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.object),
};

function Content({
    className,
    content,
}) {
    return (
        <>
            <div className={className}>
                <RichText
                    htmlSerializer={htmlSerializer}
                    render={content}
                />
            </div>
        </>
    );
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;