import React from "react";
import "./Header.css"
import GameMenu from "../GameMenu/GameMenu";

class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "Tetris Tennis",
    }
  }

  render() {
    return (
       <header className={'header'} id={'header'}>
         <h1 className={'game-name'}>{this.state.name}</h1>
         <GameMenu startGame={this.props.showGame} endGame={this.props.hideGame}/>
         <nav className={'navigation'} id={'nav'}>
           <ul>
             <li>Change Parameters</li>
             <li>About Author</li>
             <li>Documentation, Rules, History</li>
           </ul>
         </nav>
       </header>
    )
  }
}

export default Header