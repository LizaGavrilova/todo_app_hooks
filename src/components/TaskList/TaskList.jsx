import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import {Task} from '../Task';

import './TaskList.scss';

export default function TaskList({todos, onDeleted, onToggleDone, onToggleEdit, onToggleLabel}) {
  const elements = todos.map((item) => {
    const timeAfterCreate = formatDistanceToNow(new Date(item.dateCreate), { includeSeconds: true });

    return (
      <Task
        key={item.id}
        id={item.id}
        label={item.label}
        done={item.done}
        editing={item.editing}
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

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleLabel: PropTypes.func.isRequired
};