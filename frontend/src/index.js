import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import BrowserRouter and Route
import { BrowserRouter as Router, Route } from 'react-router-dom';
ReactDOM.render(
  <Router>
  <React.StrictMode>
  <Route path="/" component={App} />
  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
