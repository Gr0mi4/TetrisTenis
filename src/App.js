import React from 'react';
import './App.css';
import Header from './components/header/Header'
import Main from './components/main/Main'
import Game from './components/game/game'


class App extends React.Component {
  state = {
    showGame: false
  };

  startGame = () => {
    this.setState({showGame: true})
  };

  endGame = () => {
    this.setState({showGame: false})
  };

  render() {
    if (this.state.showGame) {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame}/>
           <Main/>
           <Game/>
         </div>
      )
    } else {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame}/>
           <Main/>
         </div>)
    }
  }
}

export default App;
