import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Axios from 'axios';
// import {APIurl} from './support/api_url'
import Home from './components/home';
import {Route, Switch} from 'react-router-dom';
import Header from './components/header';
import Search from './components/searchpage'


function App() {
  
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/search/:tes' exact component={Search} />
      </Switch>
    </div>
  );
}

export default App;
