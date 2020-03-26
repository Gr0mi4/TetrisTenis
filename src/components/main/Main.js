import React from "react";
import "./Main.scss"
import DescriptionBlock from "./DescriptionBlock/DescriptionBlock";
import Settings from "./Settings/settings";
import LeaderBoard from "./LeaderBoard/LeaderBoard";

class Main extends React.Component {
  render() {
    return (
       <main className={'main'} id={'main'}>
         <Settings addDifficulty={this.props.addDifficulty} removeDifficulty={this.props.removeDifficulty}
                   difficulty={this.props.difficulty} changeUserName={event => this.props.changeUserName(event.target.value)} userName={this.props.userName}/>
         <LeaderBoard/>
         <DescriptionBlock/>
       </main>
    )
  }
}

export default Main