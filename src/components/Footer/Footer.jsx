import React from 'react';
import PropTypes from 'prop-types';

import {TasksFilter} from '../TasksFilter';

import './Footer.scss';

export default function Footer({toDo, filter, onFilterChange, onDeleteCompleted}) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>

      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={() => onDeleteCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  toDo: 0,
  filter: 'all',
  onFilterChange: () => {},
  onDeleteCompleted: () => {}
};

Footer.propTypes = {
  toDo: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onDeleteCompleted: PropTypes.func
};