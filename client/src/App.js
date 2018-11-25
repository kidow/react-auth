import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { HomePage, AuthPage } from './pages';
import HeaderContainer from './containers/Base/HeaderContainer';

class App extends Component {
  render() {
    return (
      <Switch>
        <HeaderContainer />
        <Route exact path='/' component={HomePage}/>
        <Route path='/auth' component={AuthPage}/>
      </Switch>
    );
  }
}

export default App;
