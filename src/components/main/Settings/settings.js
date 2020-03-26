import React from "react";
import "./settings.scss"

class Settings extends React.Component {
  render() {
    let num = 'item';
    let array = [];
    for (let i = 0; i < this.props.difficulty; i++) {array.push(num)}
    let items = array.map((item, index) => <div className={'difficulty-indicator'} key={index}></div>);

    return (
       <div className={'Settings main-block'}>
         <h1>Please enter your name</h1>
         <div className={'name-block'}>
           <input type={'text'} id={'inputField'} className={'name-input'} width={40} placeholder={this.props.userName} onChange={this.props.changeUserName}/>
         </div>
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