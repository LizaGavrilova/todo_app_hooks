import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import {Task} from '../Task';

import './TaskList.scss';

export default function TaskList({todos, filter, onDeleted, onToggleDone, onToggleEdit, onToggleLabel}) {
  const elements = todos.map((item) => {
    const timeAfterCreate = formatDistanceToNow(new Date(item.dateCreate), { includeSeconds: true });

    return (
      <Task
        key={item.id}
        id={item.id}
        label={item.label}
        minutes={item.minutes}
        seconds={item.seconds}
        done={item.done}
        editing={item.editing}
        filter={filter}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        timeAfterCreate={timeAfterCreate}
        onToggleEdit={() => onToggleEdit(item.id)}
        onToggleLabel={onToggleLabel}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};
TaskList.defaultProps = {
  todos: [],
  filter: 'all',
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onToggleLabel: () => {}
};

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  filter: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleLabel: PropTypes.func
};