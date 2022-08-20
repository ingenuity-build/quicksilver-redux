import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
import { configureStore } from '@reduxjs/toolkit'
import {BrowserRouter as Router}  from "react-router-dom";
import rootReducer from './slices/index';
const store = configureStore({ reducer: rootReducer })


root.render(
  <React.StrictMode>
     <Provider store={store}> 
    <Router>
      <App />
      </Router>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
