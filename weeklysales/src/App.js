import React from 'react';
import { BrowserRouter as Browser, Route } from "react-router-dom";
import './App.css';

import { AuthProvider } from './components/utils/Auth'
import PrivateRoute from './components/utils/PrivateRoute'
import Login from './components/Login'
import TabsPage from './components/TabsPage'
import SemanticTable from './components/SemanticTable';


const App = () => {

  return (
    <AuthProvider>
      <Browser>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={SemanticTable} />
      </Browser>
    </AuthProvider>
  )

}

export default App;
