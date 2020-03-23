import React from 'react';
import {Route} from 'react-router-dom'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Game from './components/game/game'


class App extends React.Component {
  state = {
    showGame: false,
    gamePaused: false,
    difficulty: 3
  };

  gamePauseSwitch = () => {
    this.setState(prevState => {
      return {
      gamePaused: !prevState.gamePaused}
    })
  };

  addDifficulty = () => {
    this.setState(prevState => {
      if (this.state.difficulty < 5) {
        return {
          difficulty: prevState.difficulty + 1
        }
      }
    })
  };

  removeDifficulty = () => {
    this.setState(prevState => {
      if (this.state.difficulty > 1) {
        return {
          difficulty: prevState.difficulty - 1
        }
      }
    })
  };

  startGame = () => {
    this.setState({showGame: true})
  };

  endGame = () => {
    this.setState({showGame: false});
  };

  render() {
    if (this.state.showGame) {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame} gamePaused={this.state.gamePaused} pauseSwitch={this.gamePauseSwitch}/>
           <Main addDifficulty={this.addDifficulty} removeDifficulty={this.removeDifficulty} difficulty={this.state.difficulty}/>
           <Game difficulty={this.state.difficulty} gamePaused={this.state.gamePaused} pauseSwitch={this.gamePauseSwitch}/>
         </div>
      )
    } else {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame} gamePaused={this.state.gamePaused} pauseSwitch={this.gamePauseSwitch}/>
           <Main addDifficulty={this.addDifficulty} removeDifficulty={this.removeDifficulty} difficulty={this.state.difficulty}/>
         </div>)
    }
  }
}

export default App;
