/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Todo } from './components/Todo.jsx';
import {
  addTodo,
  changeShowMethod,
  clearAllTodos,
  clearCompleted,
  fetchTodos,
  resetStorage,
  setAllTodosAsCompleted,
} from './slices/todoSlice';

const initilaInputsState = {
  newTodoTitle: '',
  inputToChange: '',
  fetchTodoLimit: '',
};

function App() {
  const dispatch = useDispatch();

  let [inputs, setInputs] = useState(initilaInputsState);

  let store = useSelector((state) => state);

  const { todos, showMethod, fetchStatus } = store;

  useEffect(() => {
    localStorage.setItem(
      'store',
      JSON.stringify({
        ...store,
        activeTodoToChange: null,
      })
    );
  }, [store]);

  const notCompletedItems = () => todos.filter((todo) => !todo.completed);
  const completedItems = () => todos.filter((todo) => todo.completed);
  let todosToShow = todos;

  if (showMethod === 'notCompletedItems') {
    todosToShow = notCompletedItems;
  }

  if (showMethod === 'notCompletedItems') {
    todosToShow = notCompletedItems;
  }

  switch (showMethod) {
    case 'notCompletedItems':
      todosToShow = notCompletedItems();
      break;

    case 'completedItems':
      todosToShow = completedItems();
      break;

    case 'regular':
      todosToShow = todos;
      break;

    default:
      todosToShow = todos;
      break;
  }

  const handleInput = (event) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddNewTodo = () => {
    const newTodoTitle = inputs.newTodoTitle;
    const result = newTodoTitle.trim();

    if (result) {
      dispatch(addTodo(result));
    }

    inputs.newTodoTitle = initilaInputsState.newTodoTitle;
  };

  const handleKeyDownEnterForTodoAdd = (event) => {
    if (event.key === 'Enter') {
      handleAddNewTodo(event)
    }
  };

  return (
    <div className="app">
      <div className="input-group mb-3 inputs-container">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Menu
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(changeShowMethod('regular'))}
            >
              all
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(changeShowMethod('notCompletedItems'))}
            >
              active
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => dispatch(changeShowMethod('completedItems'))}
            >
              completed
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                dispatch(clearAllTodos());
                dispatch(resetStorage())
              }}>
                clear all
            </button>
          </li>
          {todos.some((todo) => todo.completed) && (
            <li>
              <button
                className="dropdown-item"
                onClick={() => dispatch(clearCompleted())}
              >
                clear completed
              </button>
            </li>
          )}
          <li>
              <button
                className="dropdown-item"
                onClick={() => dispatch(setAllTodosAsCompleted())}
              >
                complete all
              </button>
            </li>
        </ul>
        <input
          placeholder="slap your task rigth there"
          type="text"
          name="newTodoTitle"
          value={inputs.newTodoTitle}
          onChange={handleInput}
          onKeyDown={handleKeyDownEnterForTodoAdd}
          className="form-control"
        />
        <button className="btn btn-outline-secondary" type="button" onClick={handleAddNewTodo}>
          ADD TASK
        </button>
      </div>
      <span className='inputs-container_how-many-left fs-6 text-muted'>
        {`left: ${notCompletedItems().length}`}
      </span>
      <div>
        {(inputs.newTodoTitle === 'fetch') && (
          <div>
            <input
              placeholder="how many todos you want"
              type="text"
              name="fetchTodoLimit"
              value={inputs.fetchTodoLimit}
              onChange={handleInput}
            />
            <button
              onClick={() => {
                const searchParams = new URLSearchParams();
                searchParams.set('_limit', inputs.fetchTodoLimit);
                dispatch(fetchTodos(searchParams.toString()));
              }}
            >
              fetch some todos
            </button>
            {fetchStatus === 'Rejected' && (
              <span>
                {'could not load data :<'}
                {console.log(fetchStatus)}
              </span>
            )}
          </div>
        )}
        
      </div>
      <ul className="list-group">
        {todosToShow.map((todo) => (
          <Todo
            todo={todo}
            handleInput={handleInput}
            setInputs={setInputs}
            inputs={inputs}
            key={todo.id}
          />
        ))}
        {fetchStatus === 'Pending' && <div>Loading....</div>}
      </ul>
    </div>
  );
}

export default App;
