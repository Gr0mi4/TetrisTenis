import React from "react";
import about from "./about"

class DescriptionBlock extends React.Component {

  render() {
    return (
       <div className={`main-block`}>
         {about.map((item, index) => (
            <div key={index}>
              <h1 className={'headline'}>{item.header}</h1>
              <p className={'description'}>{item.description}</p>
            </div>
         ))}
       </div>
    )
  }
}

export default DescriptionBlock