import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.scss';

export default function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [minValue, setMinValue] = useState('');
  const [secValue, setSecValue] = useState('');
  const [minColor, setMinColor] = useState('');
  const [secColor, setSecColor] = useState('');
  const [formValid, setFormValid] = useState(true);

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onMinChange = (event) => {
    setMinValue(event.target.value);
    if (event.target.value > 9999 || event.target.value < 0) {
      setMinColor('inset 0 0 5px red');
    } else {
      setMinColor('none');
    }
  };

  const onSecChange = (event) => {
    setSecValue(event.target.value);
    if (event.target.value > 59 || event.target.value < 0) {
      setSecColor('inset 0 0 5px red');
    } else {
      setSecColor('none');
    }
  };

  const blurHandler = (event) => {
    if (minValue === '' && event.target.name === 'minutes') {
      setMinColor('inset 0 0 5px red');
    }
    if (secValue === '' && event.target.name === 'seconds') {
      setSecColor('inset 0 0 5px red');
    }
  };

  const onSubmit = (event) => {
    if (event.key === 'Enter') {
      if (minValue === '' || secValue === '') {
        setFormValid(false);
        if (minValue === '') {
          setMinColor('inset 0 0 5px red');
        }
        if (secValue === '') {
          setSecColor('inset 0 0 5px red');
        }
        return;
      }
    }
    if (formValid && event.key === 'Enter') {
      event.preventDefault();
      onItemAdded(label, minValue, secValue);
      setLabel('');
      setMinValue('');
      setSecValue('');
    }
  };

  useEffect(() => {
    if (minColor !== 'none' || secColor !== 'none') {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [formValid, minColor, secColor]);

  return (
    <form className="new-todo-form" onKeyPress={onSubmit}>
      <label htmlFor='newTaskForm' className='hidden' />
      <input
        type="text"
        id="newTaskForm"
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />

      <label htmlFor='minutes' className='hidden' />
      <input
        className="new-todo-form__timer"
        name="minutes"
        id="minutes"
        type="number"
        style={{ boxShadow: minColor }}
        onBlur={(event) => blurHandler(event)}
        onChange={onMinChange}
        placeholder="Min"
        value={minValue}
      />

      <label htmlFor='seconds' className='hidden' />
      <input
        className="new-todo-form__timer"
        name="seconds"
        id='seconds'
        type="number"
        style={{ boxShadow: secColor }}
        onBlur={(event) => blurHandler(event)}
        onChange={onSecChange}
        placeholder="Sec"
        value={secValue}
      />
    </form>
  );
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
