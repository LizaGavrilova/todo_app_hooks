import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.scss';

export default function NewTaskForm({onItemAdded}) {
  const [label, setLabel] = useState('');
  const [minValue, setMinValue] = useState('');
  const [secValue, setSecValue] = useState('');

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onMinChange = (event) => {
    setMinValue(event.target.value); 
  };

  const onSecChange = (event) => {
    setSecValue(event.target.value);
  }

  const onSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onItemAdded(label, minValue, secValue);
      setLabel('');
      setMinValue('');
      setSecValue('');
    };        
  };

  return (
    <form className='new-todo-form' onKeyPress={onSubmit}>
      <input
        type="text"
        id='newTaskForm'
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />

      <input className="new-todo-form__timer"
              onChange={onMinChange}
              placeholder="Min"
              type="number"
              value={minValue}
      />

      <input className="new-todo-form__timer"
              onChange={onSecChange}
              placeholder="Sec"
              type="number"
              value={secValue}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onItemAdded: () => {}
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func
};