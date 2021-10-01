import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './WorkFilter.scss';

const defaultProps = {
    className: '',
    industries: {},
    services: {},
};

const propTypes = {
    className: PropTypes.string,
    industries: PropTypes.object,
    services: PropTypes.object,
};

function WorkFilter({
    activeFilters,
    setActiveFilters,
    className,
    industries,
    services,
}) {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filterGroupOpen, setFilterGroupOpen] = useState(null);

    function handleFilterGroupOpen(filterName) {
        if (filterGroupOpen === filterName) {
            setFilterGroupOpen(null);
        } else {
            setFilterGroupOpen(filterName);
        }
    }

    function removeActiveFilter(event) {
        const copyOfFilters = [...activeFilters];
        const checkboxValue = event.target.getAttribute('data-name');
        const filteredFilters = copyOfFilters.filter(e => e !== checkboxValue);
        setActiveFilters(filteredFilters);
    }

    return (
        <>
            <div className={`work-filter ${className}`}>
                <button className={`work-filter__filter-button ${filtersOpen && 'active'}`} onClick={() => setFiltersOpen(!filtersOpen)}>
                    Filter
                    <svg width="15" height="9" viewBox="0 0 15 9" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7.5 7.5L14 1" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                <div className="work-filter__desktop-filter-group-buttons">
                    <button className={`work-filter__filter-group-button ${filterGroupOpen === 'Industry' && 'active'}`} onClick={() => handleFilterGroupOpen('Industry')}>
                        <span>Industry</span>
                        <svg width="15" height="9" viewBox="0 0 15 9" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7.5 7.5L14 1" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                    </button>
                    <button className={`work-filter__filter-group-button ${filterGroupOpen === 'Service' && 'active'}`} onClick={() => handleFilterGroupOpen('Service')}>
                        <span>Service</span>
                        <svg width="15" height="9" viewBox="0 0 15 9" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7.5 7.5L14 1" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                    </button>
                </div>

                <div className={`work-filter__filters ${filtersOpen && 'open'}`}>
                    <WorkFilterGroup activeFilters={activeFilters} setActiveFilters={setActiveFilters} filters={industries} filterName="Industry" filterGroupOpen={filterGroupOpen} setFilterGroupOpen={setFilterGroupOpen} />
                    <WorkFilterGroup activeFilters={activeFilters} setActiveFilters={setActiveFilters} filters={services} filterName="Service" filterGroupOpen={filterGroupOpen} setFilterGroupOpen={setFilterGroupOpen} />
                </div>

                {activeFilters.length > 0 && (
                    <div className="work-filter__active-filters">
                        <ul className="work-filter__active-filters-list">
                            {activeFilters.map((name) => {
                                return (
                                    <li className="work-filter__active-filters-item" key={name}>
                                        <button className="work-filter__active-filters-button" data-name={name} onClick={removeActiveFilter}>
                                            {name}
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L9 9" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M1 9L9 1" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

function WorkFilterGroup({
    activeFilters,
    setActiveFilters,
    filters,
    filterName,
    filterGroupOpen,
    setFilterGroupOpen,
}) {
    const filterItems = [];

    for (const key in filters) {
        filterItems.push({
            name: key,
            count: filters[key],
        });
    }

    function handleFilterGroupOpen() {
        if (filterGroupOpen === filterName) {
            setFilterGroupOpen(null);
        } else {
            setFilterGroupOpen(filterName);
        }
    }

    function handleFilterChange(event) {
        const copyOfFilters = [...activeFilters];
        const checkboxValue = event.target.value;

        if (event.target.checked) {
            copyOfFilters.push(checkboxValue);
        } else {
            copyOfFilters.splice(copyOfFilters.indexOf(checkboxValue), 1);
        }

        setActiveFilters(copyOfFilters);
    }

    return (
        <>
            <div className={`work-filter__filter-group ${filterGroupOpen !== null && filterGroupOpen !== filterName && 'hidden'}`}>
                <button className={`work-filter__filter-group-button ${filterGroupOpen === filterName && 'active'}`} onClick={handleFilterGroupOpen}>
                    {filterName}
                    <svg width="15" height="9" viewBox="0 0 15 9" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7.5 7.5L14 1" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                
                <ul className={`work-filter__filter-group-list ${filterGroupOpen === filterName && 'open'}`}>
                    {filterItems.map(({ name, count }) => {
                        const checked = activeFilters.indexOf(name) > -1;

                        return (
                            <li className="work-filter__filter-group-item" key={name}>
                                <label className="b-contain">
                                    <span className="work-filter__filter-group-label">{name} <span className="work-filter__filter-group-count">({count})</span></span>
                                    <input onChange={handleFilterChange} checked={checked} type="checkbox" name={`${name}`} value={name} />
                                    <div className="b-input"></div>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

WorkFilter.propTypes = propTypes;
WorkFilter.defaultProps = defaultProps;

export default WorkFilter;