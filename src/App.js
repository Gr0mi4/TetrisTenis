import React from 'react';
import Header from './components/header/Header'
import Main from './components/main/Main'
import Game from './components/game/game'

class App extends React.Component {
  state = {
    showGame: false,
    gamePaused: false,
    userName: 'Mister X',
    difficulty: 3
  };

  changeUserName = (name) => {
    this.setState({
         userName:`${name}`
       }
    );
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
    this.setState({gamePaused : true});
    setTimeout(() => {
      this.setState({showGame: false});
    }, 1000)
  };

  render() {
    if (this.state.showGame) {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame} gamePaused={this.state.gamePaused} pauseSwitch={this.gamePauseSwitch}/>
           <Main addDifficulty={this.addDifficulty} removeDifficulty={this.removeDifficulty} difficulty={this.state.difficulty} changeName={event => this.changeUserName(event.target.value)} userName={this.state.userName}/>
           <Game difficulty={this.state.difficulty} gamePaused={this.state.gamePaused} pauseSwitch={this.gamePauseSwitch} userName={this.state.userName}/>
         </div>
      )
    } else {
      return (
         <div>
           <Header showGame={this.startGame} hideGame={this.endGame} gamePaused={this.state.gamePaused} pauseSwitch={this.gamePauseSwitch}/>
           <Main addDifficulty={this.addDifficulty} removeDifficulty={this.removeDifficulty} difficulty={this.state.difficulty} changeUserName={this.changeUserName} userName={this.state.userName}/>
         </div>)
    }
  }
}

export default App;
