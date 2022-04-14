import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from 'react';
import ActiveDisplay from './components/ActiveDisplay';

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
        userRated: false,
        avgRating: 0
      },
      songList: [],
      displayActiveSong: false
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


  renderSong = (songID) => {
    var activeSong = this.state.activeSong;
    if (this.state.displayActiveSong) {
      return(
      <div className = "active-song">
        <ActiveDisplay activeSongTitle={activeSong.songTitle} activeArtist = {activeSong.artist} />
      </div>
      )
    }
  }

  createSongDiv = (title, artist, songID) => {
    return (<div className="song-button">
      <button onClick={this.renderSong(songID)}>{title} - {artist}</button>
    </div>)
  }

  handleDelete = (rating) => {
    axios 
      .delete("http://localhost:8000/api/ratings/{rating.id}")
      .then(response => this.refreshSongs) // make one that refreshes the rating instead? of the open song?
      .catch(error => console.log(error))
  }

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
    return (
      <div className="main">
        BoomTree
        <ul className="song-list">
          {this.renderSongList()}
        </ul>
        {this.renderActiveSong()}
      </div>
    )
  }
  
}

export default App;
