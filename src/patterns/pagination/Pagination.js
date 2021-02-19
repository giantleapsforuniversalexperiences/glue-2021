import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const defaultProps = {
    allArticles: [],
    className: '',
    hasMore: false,
    loadMore: false,
    loadedArticles: [],
    paginationSize: 9,
    setHasMore: () => {},
    setLoadMore: () => {},
    setLoadedArticles: () => {},
    text: '',
};

const propTypes = {
    allArticles: PropTypes.array,
    className: PropTypes.string,
    hasMore: PropTypes.bool,
    loadMore: PropTypes.bool,
    loadedArticles: PropTypes.array,
    paginationSize: PropTypes.number,
    setHasMore: PropTypes.func,
    setLoadMore: PropTypes.func,
    setLoadedArticles: PropTypes.func,
    text: PropTypes.string,
};

function Pagination({
    allArticles,
    className,
    hasMore,
    loadMore,
    loadedArticles,
    paginationSize,
    setHasMore,
    setLoadMore,
    setLoadedArticles,
    text,
}) {
    // Load more button click
    const handleLoadMore = () => {
        setLoadMore(true);
    }

    // Handle loading more articles
    useEffect(() => {
        if (loadMore && hasMore) {
            const currentLength = loadedArticles.length;
            const isMore = currentLength < allArticles.length;
            const nextResults = isMore
                ? allArticles.slice(currentLength, currentLength + paginationSize)
                : [];
            setLoadedArticles([...loadedArticles, ...nextResults]);
            setLoadMore(false);
        }
    }, [loadMore, hasMore]);

    //Check if there is more
    useEffect(() => {
        const isMore = loadedArticles.length < allArticles.length;
        setHasMore(isMore);
    }, [loadedArticles]);

    return (
        <>
            <button className={`pagination ${className}`} onClick={handleLoadMore} type="button">{text}</button>
        </>
    );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;