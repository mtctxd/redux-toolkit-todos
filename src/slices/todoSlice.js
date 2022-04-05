import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const makeRandomUserId = () => Math.floor(Math.random() * 100) + 1;
const makeRandomNumber = () => Math.floor(Math.random() * 1000000) + 1;
const makeRandomId = () => {
  return new Date().valueOf() + makeRandomNumber();
};

let initialState = {
  todos: [
    {
      userId: 1,
      id: makeRandomId(),
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: makeRandomId(),
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
  ],
  showMethod: 'regular',
  fetchStatus: 'standby',
  activeTodoToChange: null,
};

const emptyState = {
  todos: [],
  activeTodoToChange: null,
  showMethod: 'regular',
  fetchStatus: 'standby',
}

const dataFromLocalStorage = JSON.parse(localStorage.getItem('store'));

if (dataFromLocalStorage) {
  initialState = {
    ...initialState,
    ...dataFromLocalStorage,
  }
}

export const fetchTodos = createAsyncThunk(
  'todos/fetched',
  async (parameters) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?${parameters}`
      );
      const data = await response.json();
      const validData = await data.map((item) => {
        const id = { id: makeRandomId() };
        const itemToPass = Object.assign(item, id);
        
        return itemToPass;
      });
      console.log(validData);

      return validData;
    } catch (error) {
      return error;
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        userId: makeRandomUserId(),
        id: new Date().valueOf(),
        title: action.payload,
        completed: false,
      };

      state.todos.push(todo);
    },
    toggleCompletedTodo: (state, action) => {
      const matchedTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );

      matchedTodo.completed = !matchedTodo.completed;
    },
    changeTitleOfTodo: (state, action) => {
      const matchedTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      matchedTodo.title = action.payload.title;
    },
    setActiveTodo: (state, action) => {
      state.activeTodoToChange = action.payload || null;
    },
    setAllTodosAsCompleted: (state) => {
      state.todos = state.todos.map(todo => ({
        ...todo,
        completed: true,
      }))
    },
    changeShowMethod: (state, action) => {
      switch (action.payload) {
        case 'notCompletedItems':
          state.showMethod = action.payload;
          break;

        case 'completedItems':
          state.showMethod = action.payload;
          break;

        default:
          state.showMethod = 'regular';
          break;
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    clearAllTodos: (state) => {
      state.todos = [];
    },
    resetStorage: (state) => {
      state.todos = emptyState.todos;
      state.fetchStatus = emptyState.fetchStatus;
      state.showMethod = emptyState.showMethod;
      //repeating code
      state.activeTodoToChange = emptyState.activeTodoToChange 
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.fetchStatus = 'Pending';
    },

    [fetchTodos.fulfilled]: (state, action) => {
      state.fetchStatus = 'Fulfilled';
      state.todos = state.todos.concat(action.payload);
    },

    [fetchTodos.rejected]: (state) => {
      state.fetchStatus = 'Rejected';
    },
  },
});

export const {
  addTodo,
  toggleCompletedTodo,
  changeTitleOfTodo,
  changeShowMethod,
  clearCompleted,
  clearAllTodos,
  resetStorage,
  setActiveTodo,
  setAllTodosAsCompleted,
} = todoSlice.actions;

export default todoSlice;
