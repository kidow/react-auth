import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { HomePage, AuthPage } from './pages';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/auth' component={AuthPage}/>
      </Switch>
    );
  }
}

export default App;
