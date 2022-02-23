import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ChangeTask } from '../ChangeTask';

import './Task.scss';

export default function Task({
  id,
  item,
  filter,
  onDeleted,
  onToggleDone,
  timeAfterCreate,
  onToggleEdit,
  onToggleLabel,
}) {
  const { label, minutes, seconds, done, editing } = item;
  const [min, setMin] = useState(minutes);
  const [sec, setSec] = useState(seconds);
  const [count, setCount] = useState(true);

  const TimerStart = () => {
    setCount(true);
  };

  const TimerPause = () => {
    setCount(false);
  };

  useEffect(() => {
    let newIntervalId;
    if (count) {
      newIntervalId = setInterval(() => {
        if (done) {
          TimerPause();
        }
        if (!done) {
          setCount(true);
        }
        if (min === 0 && sec === 0) {
          onToggleDone(id);
          setCount(false);
        } else if (sec > 0) {
          setSec(sec - 1);
        } else if (sec === 0 && min > 0) {
          setMin(min - 1);
          setSec(59);
        }
      }, 1000);
    }
    return () => clearInterval(newIntervalId);
  }, [sec, min, onToggleDone, id, count, done]);

  const minutesOutput = min < 10 ? `0${min}` : min;
  const secondsOutput = sec < 10 ? `0${sec}` : sec;

  let classNames;
  if (done) {
    classNames = 'completed';
    if (filter === 'active') {
      classNames += ' hidden';
    } else {
      classNames = 'completed';
    }
  }
  if (filter === 'done' && classNames !== 'completed') {
    classNames = 'hidden';
  }
  if (editing) {
    classNames = 'editing';
  }

  const timer = !done ? (
    <div className="timer">
      <button className="icon-play" type="button" aria-label="Play" onClick={TimerStart} />
      <button className="icon-pause" type="button" aria-label="Pause" onClick={TimerPause} />
      {minutesOutput}:{secondsOutput}
    </div>
  ) : null;

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} checked={done} readOnly />
        <label>
          <span className="description" onClick={onToggleDone} onKeyPress={onToggleDone} role="presentation">
            {label}
          </span>
          {timer}
          <span className="created">created {timeAfterCreate} ago</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit" onClick={onToggleEdit} />
        <button className="icon icon-destroy" type="button" aria-label="Destroy" onClick={onDeleted} />
      </div>
      {editing ? <ChangeTask id={id} label={label} onToggleLabel={onToggleLabel} /> : null}
    </li>
  );
}

Task.defaultProps = {
  id: '',
  item: {
    label: '',
    minutes: 0,
    seconds: 0,
    done: false,
    editing: false,
  },
  filter: 'all',
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onToggleLabel: () => {},
  timeAfterCreate: '',
};

Task.propTypes = {
  id: PropTypes.string,
  item: PropTypes.shape({
    label: PropTypes.string,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    done: PropTypes.bool,
    editing: PropTypes.bool,
  }),
  filter: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleLabel: PropTypes.func,
  timeAfterCreate: PropTypes.string,
};
