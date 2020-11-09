import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminPanel from './pages/admin/AdminPanel';
import UserPanel from './pages/user/UserPanel';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/admin' component={AdminPanel} />
        <Route path='/' component={UserPanel} />
      </Switch>
    </Router>
  );
};

export default App;
