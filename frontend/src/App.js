import {React,useState} from 'react';
import './App.css';
import Register from './components/Register'
import Navigator from './components/Navigator'
import {BrowserRouter as Router,Route,Switch}from 'react-router-dom'
import Login from './components/Login';
import NewArticle from './components/NewArticle';
import Dashboard from './components/Dashboard';



export default function App() {
  const [token, setToken] = useState("")
  return (
    
    <div className='App'>
      
       <Route render={()=> <Navigator token={token}/>} />
      <Switch>
       <Route exact path="/Login" render={()=> <Login setToken={setToken}/>}/>
       <Route exact path="/Register" component={Register} />
       <Route exact path="/Dashboard" component={Dashboard} />
       <Route exact path="/NewArticle" render={()=> <NewArticle token={token}/>} />
       </Switch>
    </div>
  );
}
