import React from 'react';
import './App.css';
import {NavLink, Route, withRouter} from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Jokes from './components/jokes/Jokes';

function App() {
  return (
    <div className="App">
    <nav>
    <NavLink to='/login'>Login</NavLink>
    &nbsp;   &nbsp;   &nbsp;  
    <NavLink to='/signup'>Signup</NavLink>
    &nbsp;   &nbsp;   &nbsp;  
    <NavLink to='/jokes'>Jokes</NavLink>
    </nav>
    <>
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/jokes' component={Jokes} />
    </>
    </div>
  );
}

export default withRouter(App);
