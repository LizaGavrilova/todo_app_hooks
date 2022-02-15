import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ChangeTask.scss';

export default function ChangeTask({id, label, onToggleLabel}) {
  const [newLabel, setNewLabel] = useState(label);

  const onLabelChange = (event) => {
    setNewLabel(event.target.value);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      onToggleLabel(id, newLabel);
    };
  };

  return (
    <label>
      <input
        type="text"
        className="edit"
        value={newLabel}
        onChange={onLabelChange}
        onKeyPress={onKeyPress}
        autoFocus
      />
    </label>      
  );
};

ChangeTask.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onToggleLabel: PropTypes.func.isRequired,
};