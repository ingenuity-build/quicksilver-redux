import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';



import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { configureStore } from '@reduxjs/toolkit'
import {BrowserRouter as Router}  from "react-router-dom";
import rootReducer from './slices/index';
import 'bootstrap/dist/css/bootstrap.css';
const container = document.getElementById('root')!;
const root = createRoot(container);

const store = configureStore({ reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['quicksilver-wallet/setWalletQSSuccess', 'selected-network-wallet/setWalletNetworkSuccess', 'selected-network-wallet/setClientSuccess'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['quicksilver.balances', 'selectedNetworkWallet.client', 'quicksilver.walletQS', 'selectedNetworkWallet.networkBalances', 'selectedNetworkWallet.networkWallet'],
    },
  }), },
  )

// @ts-ignore
window.Buffer = Buffer;

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
