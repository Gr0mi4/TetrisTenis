import React from "react";
import description from "./History"

class DescriptionBlock extends React.Component {
    constructor() {
        super();
        this.state = description;
    }

    render() {
        return (
            <div>
                <h1 className={'headline'}>{this.state.header}</h1>
                <p className={'description'}>{this.state.description}</p>
            </div>
        )
    }
}

export default DescriptionBlock