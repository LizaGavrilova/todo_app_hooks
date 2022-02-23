import React from 'react';
import PropTypes from 'prop-types';

import { NewTaskForm } from '../NewTaskForm';

import './Header.scss';

export default function Header({ onItemAdded }) {
  return (
    <div className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdded={onItemAdded} />
    </div>
  );
}

Header.defaultProps = {
  onItemAdded: () => {},
};

Header.propTypes = {
  onItemAdded: PropTypes.func,
};
