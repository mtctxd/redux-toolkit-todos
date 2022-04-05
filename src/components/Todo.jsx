import { useDispatch, useSelector } from 'react-redux';
import {
  changeTitleOfTodo,
  resetActiveTodo,
  setActiveTodo,
  toggleCompletedTodo,
} from '../slices/todoSlice';

export const Todo = ({ todo, handleInput, setInputs, inputs }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { activeTodoToChange } = store;

  const handleTodoTitleKeyDown = (event, title, id) => {
    if (event.key === 'Enter') {
      const info = { id, title };

      dispatch(changeTitleOfTodo(info));
      dispatch(resetActiveTodo());
    }
  };

  const toogleTodoInputActive = (id) => {
    dispatch(setActiveTodo(id));
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
      {/* <span onClick={() => toogleTodoInputActive(todo.id) }> */}
      <span onClick={() => toogleTodoInputActive(todo.id)}>
        {activeTodoToChange === todo.id ? (
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
