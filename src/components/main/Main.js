import React from "react";
import "./Main.css"
import DescriptionBlock from "./descriptionBlock/DescriptionBlock";
import Settings from "./settings/settings";

class Main extends React.Component {
  render() {
    return (
       <main className={'main'} id={'main'}>
         <Settings addDifficulty={this.props.addDifficulty} removeDifficulty={this.props.removeDifficulty}
                   difficulty={this.props.difficulty}/>
         <DescriptionBlock/>
         <DescriptionBlock/>
       </main>
    )
  }
}

export default Main