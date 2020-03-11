import React from "react";
import "./GameMenu.css"

class GameMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      showStartButton: true
    }
  }

  showCanvas = () => {
    let main = document.getElementById('main');
    let navigation = document.getElementById('nav');
    navigation.classList.add('hidden');
    main.classList.add('hidden');
    main.style.display = "none";
    this.setState({
      showStartButton: false
    });
    this.props.startGame()
  };

  hideCanvas = () => {
    let main = document.getElementById('main');
    let navigation = document.getElementById('nav');
    navigation.classList.remove('hidden');
    main.classList.remove('hidden');
    main.style.display = "flex";
    this.setState({
         showStartButton: true
       });
    this.props.endGame();
  };

  render() {
    if (this.state.showStartButton) {
      return (<button onClick={this.showCanvas} className={'game-link'} id={'link'}>Start Game</button>)
    } else {
      return (
         <div className={'game-buttons'} id={'game-buttons'}>
           <button className={'game-button'} onClick={this.props.pauseSwitch}>{this.props.gamePaused? 'Go' : 'Pause'}</button>
           <button onClick={this.hideCanvas} className={'game-button'}>Stop</button>
         </div>
      )
    }
  }
}

export default GameMenu;