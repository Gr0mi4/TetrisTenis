import React from "react";
import "./settings.css"

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      difficulty: 3
    };
    this.addDifficulty = this.addDifficulty.bind(this);
    this.removeDifficulty = this.removeDifficulty.bind(this);
  }

  addDifficulty() {
    this.setState(prevState => {
      if (this.state.difficulty < 5) {
        return {
          difficulty: prevState.difficulty + 1
        }
      }
    })
  }

  removeDifficulty() {
    this.setState(prevState => {
      if (this.state.difficulty > 1) {
        return {
          difficulty: prevState.difficulty - 1
        }
      }
    })
  }

  render() {
    return (
       <div className={'difficulty'}>
         <h1>Difficulty</h1>
         <div className={'difficulty-change'}>
           <button onClick={this.removeDifficulty}>-</button>
           <p>{this.state.difficulty}</p>
           <button onClick={this.addDifficulty}>+</button>
         </div>
       </div>
    )
  }

}

export default Settings