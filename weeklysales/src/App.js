import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

import Login from './components/Login'
import TabsPage from './components/TabsPage'

const App = () => {

  return (
    <>
      <Route exact path='/' component={Login} />
      <Route exact path='/home' component={TabsPage} />
    </>
  )
}

export default App;
