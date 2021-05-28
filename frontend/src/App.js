import React from 'react';
import './App.css';
import Register from './components/Register'
import Navigator from './components/Navigator'
import {BrowserRouter as Router,Route}from 'react-router-dom'
import Login from './components/Login';


export default function App() {
  return (
    <div className='App'>
      <Navigator/>
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={Login} />
    </div>
  );
}
