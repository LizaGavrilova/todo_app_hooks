import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.scss';

export default function TasksFilter({filter, onFilterChange}) {
  const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames = isActive ? 'selected' : 'button';

    return (
      <li key={name}>
        <button type="button" onClick={() => onFilterChange(name)} className={classNames}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>; 
};

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func
};