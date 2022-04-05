import { useDispatch, useSelector } from 'react-redux';
import {
  changeTitleOfTodo,
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
      dispatch(setActiveTodo(null));
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
    // <li className="list-group-item">
    //   <input
    //     type="checkbox"
    //     checked={todo.completed}
    //     onChange={() => dispatch(toggleCompletedTodo(todo.id))}
    //   />
    //   <span onClick={() => toogleTodoInputActive(todo.id)}>
    //     {activeTodoToChange === todo.id ? (
    //       <input
    //         type="text"
    //         name="inputToChange"
    //         value={inputs.inputToChange}
    //         onKeyDown={(event) =>
    //           handleTodoTitleKeyDown(event, inputs.inputToChange, todo.id)
    //         }
    //         onChange={handleInput}
    //         className="form-control"
    //       />
    //     ) : (
    //       todo.title
    //     )}
    //   </span>
    // </li>
    <li className="list-group-item task-container">
      <div>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          <input
            type="checkbox"
            className="btn-check"
            id={todo.id}
            checked={todo.completed}
            onChange={() => dispatch(toggleCompletedTodo(todo.id))}
          />
          <label className="btn btn-outline-primary" for={todo.id}>
            X
          </label>
        </div>
      </div>
      <div className="task-item">
        {activeTodoToChange === todo.id ? (
          <input
            type="text"
            name="inputToChange"
            value={inputs.inputToChange}
            onKeyDown={(event) =>
              handleTodoTitleKeyDown(event, inputs.inputToChange, todo.id)
            }
            onChange={handleInput}
            className="form-control task-input"
          />
        ) : (
          <span onClick={() => toogleTodoInputActive(todo.id)} className="task-title">
            {todo.title}
          </span>
        )}
      </div>
    </li>
  );
};
