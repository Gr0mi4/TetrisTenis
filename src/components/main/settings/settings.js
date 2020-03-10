import React from "react";
import "./settings.css"

class Settings extends React.Component {
  render() {
    return (
       <div className={'difficulty'}>
         <h1>Difficulty</h1>
         <div className={'difficulty-change'}>
           <button onClick={this.props.removeDifficulty}>-</button>
           <p>{this.props.difficulty}</p>
           <button onClick={this.props.addDifficulty}>+</button>
         </div>
       </div>
    )
  }

}

export default Settings