import React, { useState } from 'react';
import shortid from "shortid";

import {Header} from '../Header';
import {TaskList} from '../TaskList';
import {Footer} from '../Footer';

import './App.scss';


export default function App() {

  const createTodoItem = (label, min = 25, sec = 0) => {
    const createTime = new Date();
    const minutes = (min === '') ? 25 : Number(min);
    const seconds = (sec === '') ? 0 : Number(sec);
    return {
      id: shortid.generate(),
      label,
      done: false,
      editing: false,
      dateCreate: createTime,
      minutes,
      seconds
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink tea'),
    createTodoItem('Pet the cat')
  ]);
  const [filter, setFilter] = useState('all');  

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    const newArr = [...todoData];
    newArr.push(newItem);
    return setTodoData([...newArr]);
  };

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    return setTodoData([...newArr]);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'done'));
  };

  const onToggleEdit = (id) => {
    setTodoData(toggleProperty(todoData, id, 'editing'));
  };

  const onFilterChange = (filterName) => {
    setFilter(filterName);
  };

  const onDeleteCompleted = () => {
    setTodoData([...todoData].filter((item) => !item.done));
  };

  const onToggleLabel = (id, label) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, label, done: false, editing: false };
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData([...newArr]);
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const visibleItems = todoData.filter((el) => /\S/.test(el.label));
  const todoCount = todoData.filter((el) => /\S/.test(el.label)).length - doneCount;

  return (
    <div className="todoapp">
      <Header onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          filter={filter}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          onToggleLabel={onToggleLabel}
        />
        <Footer
          toDo={todoCount}
          filter={filter}
          onFilterChange={onFilterChange}
          onDeleteCompleted={onDeleteCompleted}
        />
      </section>
    </div>
  );
};