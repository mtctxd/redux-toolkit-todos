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

  const toogleTodoInputActive = (id) => {
    setFocusedTodo(id);
    setInputs((state) => ({
      ...state,
      inputToChange: todo.title,
    }));
  };

  console.log(!focusedTodo);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleCompletedTodo(todo.id))}
      />
      <span onClick={() => toogleTodoInputActive(todo.id) }>
        {(focusedTodo === todo.id) ? (
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
