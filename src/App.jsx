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
    localStorage.setItem('store', JSON.stringify(store));
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

  return (
    <div className="App">
      <ul class="list-group">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
      <div>
        <input
          placeholder="enter todo title"
          type="text"
          name="newTodoTitle"
          value={inputs.newTodoTitle}
          onChange={handleInput}
        />
        <button onClick={handleAddNewTodo}>Add todo</button>
        <button onClick={() => dispatch(changeShowMethod('regular'))}>
          All
        </button>
        <button onClick={() => dispatch(changeShowMethod('notCompletedItems'))}>
          Active
        </button>
        <button onClick={() => dispatch(changeShowMethod('completedItems'))}>
          Completed
        </button>
        {todos.some((todo) => todo.completed) && (
          <button onClick={() => dispatch(clearCompleted())}>
            Clear all completed
          </button>
        )}
      </div>
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
        <span>{inputs.fetchTodoLimit}</span>
        {fetchStatus === 'Rejected' && (
          <span>
            {'could not load data :<'}
            {console.log(fetchStatus)}
          </span>
        )}
      </div>
      <div>
        <button onClick={() => dispatch(clearAllTodos())}>Clear all</button>
        <button onClick={() => dispatch(resetStorage())}>Reset Storage</button>
      </div>
      <div>
        <h2>{`Items left: ${notCompletedItems().length}`}</h2>
      </div>
      <ul>
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
