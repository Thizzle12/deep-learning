import React, { Component } from 'react';
import './App.css';
import {Router, Route, Switch} from 'react-router';
import createBrowserHistory from 'history/createHashHistory';
import MainPage from './MainPage'
import NumberPrediction from './projects/NumberPrediction'
import TicTacToe from './projects/TicTacToe'
import UserCreation from './login/UserCreation'

const history = createBrowserHistory();

class App extends Component {



  render() {
    return (

      <div className="App">
        <Router history={history} >
          <Switch>
            <Route path="/tictactoe"  component={TicTacToe}/>
            <Route path="/numbers" component={NumberPrediction}/>
            <Route path="/createuser" component={UserCreation}/>
            <Route path="/"  component={MainPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
