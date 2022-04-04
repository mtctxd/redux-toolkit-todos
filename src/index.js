import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'

import App from './App';
import todoSlice from './slices/todoSlice';

const store = configureStore({
  reducer: todoSlice.reducer, 
});

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);