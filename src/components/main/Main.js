import React from "react";
import "./Main.css"
import DescriptionBlock from "./descriptionBlock/DescriptionBlock";
import Settings from "./settings/settings";

function Main() {
  return (
     <main className={'main'} id={'main'}>
       <Settings/>
       <DescriptionBlock/>
       <DescriptionBlock/>
     </main>
  )
}

export default Main