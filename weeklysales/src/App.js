import React from 'react';
import { BrowserRouter as Browser, Route, Switch } from "react-router-dom";
import './App.css';

import { AuthProvider } from './components/utils/Auth'
import PrivateRoute from './components/utils/PrivateRoute'
import Login from './components/Login'
import TabsPage from './components/TabsPage'

import firebase from './components/firebase'

const App = () => {

  const [sales, setSales] = React.useState()

  /*React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection('sales').get()
      const totals = data.docs.map(doc => doc.data())
      setSales(totals)
    }

    fetchData()
  }, [])*/

  console.log(sales)

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
