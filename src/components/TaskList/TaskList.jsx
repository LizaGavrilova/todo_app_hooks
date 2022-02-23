import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'
import { Task } from '../Task';

import './TaskList.scss';

export default function TaskList({ todos, filter, onDeleted, onToggleDone, onToggleEdit, onToggleLabel }) {
  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <Task
          key={item.id}
          id={item.id}
          item={item}
          filter={filter}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          timeAfterCreate={formatDistanceToNow(new Date(item.dateCreate), { includeSeconds: true })}
          onToggleEdit={() => onToggleEdit(item.id)}
          onToggleLabel={onToggleLabel}
        />
      ))}
    </ul>
  );
}
TaskList.defaultProps = {
  todos: [],
  filter: 'all',
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onToggleLabel: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  filter: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleLabel: PropTypes.func,
};