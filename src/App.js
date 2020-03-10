import React from 'react';
import './App.css';
import Header from './components/header/Header'
import Main from './components/main/Main'
import Game from './components/game/game'


class App extends React.Component {
  state = {
    showGame: false,
    difficulty: 3
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
    this.setState({showGame: false})
  };

  render() {
    if (this.state.showGame) {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame}/>
           <Main addDifficulty={this.addDifficulty} removeDifficulty={this.removeDifficulty} difficulty={this.state.difficulty}/>
           <Game difficulty={this.state.difficulty}/>
         </div>
      )
    } else {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame}/>
           <Main addDifficulty={this.addDifficulty} removeDifficulty={this.removeDifficulty} difficulty={this.state.difficulty}/>
         </div>)
    }
  }
}

export default App;
