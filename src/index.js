import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./app.css"
import {BrowserRouter as Router} from "react-router-dom"

import {UserContextProvider} from '../src/context/userContext'


ReactDOM.render(
  <React.StrictMode>

    <UserContextProvider>
    <Router>
      <App />
    </Router>
    </UserContextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


