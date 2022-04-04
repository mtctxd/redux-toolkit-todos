import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Todo } from './components/Todo.tsx';
import { addTodo, changeShowMethod, clearAllTodos, clearCompleted, fetchTodos } from './slices/todoSlice';

const initilaInputsState = {
  newTodoTitle: '',
  inputToChange: '',
};

function App() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(initilaInputsState);

  const todos = useSelector((state) => state.todos);
  const showMethod = useSelector((state) => state.showMethod);
  const fetchStatus = useSelector(state => state.fetchStatus);

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
      <div>
        <input
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
        <button
          onClick={() => dispatch(clearAllTodos())}
        >
          Clear all
        </button>
        <button
          onClick={() => dispatch(fetchTodos())}
        >
          fetch fome todos
        </button>
        {(fetchStatus === 'Rejected') && (
          <span>
            {'could not load data :<'}
            {console.log(fetchStatus)}
          </span>
        )}
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
        {(fetchStatus === 'Pending') && (
          <div>
            Loading....
          </div>
        )}
      </ul>
    </div>
  );
}

export default App;
