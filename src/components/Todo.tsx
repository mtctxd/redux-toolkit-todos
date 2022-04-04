import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTitleOfTodo, toggleCompletedTodo } from '../slices/todoSlice';

export const Todo = ({ todo, handleInput, setInputs, inputs }) => {
  const dispatch = useDispatch();
  const [focusedTodo, setFocusedTodo] = useState(null);
  
  const handleTodoTitleKeyDown = (event, title, id) => {
    if (event.key === 'Enter') {
      const info = { id, title };

      dispatch(changeTitleOfTodo(info));
      setFocusedTodo(null);
    }
  };

  const toogleTodoInputActive = (todo) => {
    setFocusedTodo(todo.id);
    setInputs((state) => ({
      ...state,
      inputToChange: todo.title,
    }));
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleCompletedTodo(todo.id))}
      />
      <span onClick={() => toogleTodoInputActive(todo)}>
        {focusedTodo === todo.id ? (
          <input
            type="text"
            name="inputToChange"
            value={inputs.inputToChange}
            onKeyDown={(event) =>
              handleTodoTitleKeyDown(event, inputs.inputToChange, todo.id)
            }
            onChange={handleInput}
          />
        ) : (
          todo.title
        )}
      </span>
    </li>
  );
};
