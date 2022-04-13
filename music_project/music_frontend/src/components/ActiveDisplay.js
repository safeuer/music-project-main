import React from "react";

class ActiveDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSongTitle: this.props.activeSongTitle,
            activeArtist: this.props.activeArtist,
            userRated: this.props.userRated,
            avgRating: this.props.avgRating
        };
    }

    render() {
        return(
            <div className="active-display">
                <h4>hi this is my song {this.state.activeSongTitle} </h4>
            </div>
        )
    }
    
}

export default ActiveDisplay;
