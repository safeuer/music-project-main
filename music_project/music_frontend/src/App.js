import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from 'react';

// class Song extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       songTitle: this.props.songTitle,
//       artist: this.props.artist
//     };
//   }

//   render() {
//     return (<div className="song-button">
//     <button>{this.state.songTitle} - {this.state.artist}</button>
//   </div>)
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSong: {
        songTitle: "",
        artist: "",
        songID: 0,
        userRated: false,
        avgRating: 0
      },
      songList: [],
      displayActiveSong: false,
      username: "Amelia-Earhart"
    };
  }

  componentDidMount() {
    this.refreshSongs();
  }

  refreshSongs = () => {
    axios
      .get("http://localhost:8000/api/songs")
      .then(response => this.setState({ songList: response.data }))
      .catch(error => console.log(error))
  }


  renderSong = (songID, songTitle, songArtist) => {
    axios 
      .get("http://localhost:8000/api/ratings")
      .then(response => response.data.filter(
        rating => rating.song === songID 
      ))
      .then(ratings => ratings.map(rating => rating.num_rate))
      .then(ratingNums => (ratingNums.reduce((a, b) => a+b, 0))/ratingNums.length)
      .then(avRating => this.setState( {activeSong: {songTitle: songTitle, artist: songArtist, songID: songID, userRated: true, avgRating: avRating}
      }))
      .then(x => this.setState( {displayActiveSong: true }))
    }

  createSongDiv = (title, artist, songID) => {
    return (<div className="song-button">
      <button onClick={() => this.renderSong(songID, title, artist)}>{title} - {artist}</button>
    </div>)
  }

  // deleteRating = (songID, username) => {
  //   console.log(songID);
  //   console.log(username);
  //   axios 
  //     .get("http://localhost:8000/api/ratings/")
  //     .then(response => response.data.filter(
  //       rating => (rating.song === songID) && (rating.user === username)
  //     ))
  //     .then(rating => console.log(rating))
  //     .then(rating => {
  //       const ratingID = rating['id'];
  //       axios
  //         .delete(`http://localhost:8000/api/ratings/${ratingID}`)
  //         .then(response => this.refreshSongs());
  //     })
  //     .catch(error => console.log(error));
  // }

  getSongTitle = (song_id) => {
    axios
      .get("http://localhost:8000/api/songs")
      .then(response => response.data.filter(
        song => song.id === song_id 
      ))
      .then(song => song.title)
      .catch(error => console.log(error))
  }

  renderSongList = () => {
    var songList = this.state.songList;
    return songList.map(song => (
      <li key={song.id}
      className="song-in-list">
        {this.createSongDiv(song.title, song.artist, song.id)}
      </li>
    ))
  }

  render() {
    const hasActiveSong = this.state.displayActiveSong;
    return (
      <div className="main">
        BoomTree
        <ul className="song-list">
          {this.renderSongList()}
        </ul>
        {hasActiveSong ? (<div className="activeSongDiv">
          Song is {this.state.activeSong.songTitle} by {this.state.activeSong.artist} with an average rating of {this.state.activeSong.avgRating}
        </div>) : null}
        {/* <button onClick={() => this.deleteRating(this.state.activeSong.songID, this.state.username)}>Delete Active Rating</button> */}
      </div>
    )
  }
}

export default App;
