import React from "react";
import description from "./History"
import about from  "./about"

class DescriptionBlock extends React.Component {

    createState = () => {
        if (this.props.class === 'history') {this.state = description}
        else if (this.props.class === 'about-game') {this.state = about}
    };

    render() {
        this.createState();
        return (
            <div className={this.props.class + ` main-block`}>
                <h1 className={'headline'}>{this.state.header}</h1>
                <p className={'description'}>{this.state.description}</p>
            </div>
        )
    }
}

export default DescriptionBlock