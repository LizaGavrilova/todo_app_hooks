import React from 'react';
import PropTypes from 'prop-types';

import {ChangeTask} from '../ChangeTask';

import './Task.scss';

export default function Task({id, label, done, editing, onDeleted, onToggleDone, timeAfterCreate, onToggleEdit, onToggleLabel}) {
  let classNames;
  if (done) {
    classNames = 'completed';
  }
  if (editing) {
    classNames = 'editing';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} checked={done} readOnly />
        <label>
          <span className="description" onClick={onToggleDone} onKeyPress={onToggleDone} role="presentation">
            {label}
          </span>
          <span className="created">created {timeAfterCreate} ago</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit" onClick={onToggleEdit} />
        <button className="icon icon-destroy" type="button" aria-label="Destroy" onClick={onDeleted} />
      </div>
      {editing ? <ChangeTask id={id} label={label} onToggleLabel={onToggleLabel} /> : null}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleLabel: PropTypes.func.isRequired,
  timeAfterCreate: PropTypes.string.isRequired
}
