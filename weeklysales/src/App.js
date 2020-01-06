import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import PivotTable from './components/PivotTable'

const App = () => {
  return (
    <Router>
      <Route path="/hooks" component={PivotTable} />
    </Router>
  );
}

export default App;
