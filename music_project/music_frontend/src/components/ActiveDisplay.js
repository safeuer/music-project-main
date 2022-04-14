import React from "react";

class ActiveDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSong: {
                songTitle: this.props.activeSongTitle,
                artist: this.props.activeArtist,
                userRated: this.props.userRated,
                avgRating: this.props.avgRating
            }
        };
    }

    render() {
        return(
            <div className="active-display">
                <h4>hi this is my song {this.state.activeSong.songTitle} </h4>
            </div>
        )
    }
    
}

export default ActiveDisplay;
