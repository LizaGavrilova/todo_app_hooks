import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.scss';

export default function NewTaskForm({onItemAdded}) {
  const [label, setLabel] = useState('');

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onItemAdded(label);
    setLabel('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        id='newTaskForm'
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired
};