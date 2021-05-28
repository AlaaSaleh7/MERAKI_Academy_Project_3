import {React,useState} from 'react';
import './App.css';
import Register from './components/Register'
import Navigator from './components/Navigator'
import {BrowserRouter as Router,Route}from 'react-router-dom'
import Login from './components/Login';


export default function App() {
  const [token, setToken] = useState("")
  return (
    
    <div className='App'>
      
      <Navigator/>
       <Route exact path="/login" render={()=> <Login setToken={setToken}/>}/>
       <Route exact path="/register" component={Register} />
    </div>
  );
}
