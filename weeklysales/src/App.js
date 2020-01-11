import React from 'react';
import { BrowserRouter as Browser, Route, Switch } from "react-router-dom";
import './App.css';

import { AuthProvider } from './components/utils/Auth'
import PrivateRoute from './components/utils/PrivateRoute'
import Login from './components/Login'
import TabsPage from './components/TabsPage'


const App = () => {

  return (
    <AuthProvider>
      <Browser>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={TabsPage} />
      </Browser>
    </AuthProvider>
  )

}

export default App;
