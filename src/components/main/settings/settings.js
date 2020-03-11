import React from "react";
import "./settings.css"

class Settings extends React.Component {
  render() {
    let num = 'item';
    let array = [];
    for (let i = 0; i < this.props.difficulty; i++) {array.push(num)}
    let items = array.map((item, index) => <div className={'difficulty-indicator'} key={index}></div>);
    return (
       <div className={'settings main-block'}>
         <h1>Difficulty</h1>
         <div className={'difficulty-change'}>
           <button className={'difficulty-change-button'} onClick={this.props.removeDifficulty}>-</button>
           <div className={'difficulty-field'}>
             {items}
           </div>
           <button className={'difficulty-change-button'} onClick={this.props.addDifficulty}>+</button>
         </div>
       </div>
    )
  }
}

export default Settings