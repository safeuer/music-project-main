import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { Component } from 'react';
import Root from './Root'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";


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

class MainPage extends React.Component {
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


  renderSong = (songID, songTitle, songArtist) => {
    axios
      .get("http://localhost:8000/api/ratings")
      .then(response => response.data.filter(
        rating => rating.song === songID
      ))
      .then(ratings => ratings.map(rating => rating.num_rate))
      .then(ratingNums => (ratingNums.reduce((a, b) => a+b, 0))/ratingNums.length)
      .then(avRating => this.setState( {activeSong: {songTitle: songTitle, artist: songArtist, userRated: true, avgRating: avRating}
      }))
      .then(x => this.setState( {displayActiveSong: true }))
    }

  createSongDiv = (title, artist, songID) => {
    return (<div className="song-button">
      <button onClick={() => this.renderSong(songID, title, artist)}>{title} - {artist}</button>
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
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = {<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/mainpage" element={<MainPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    ) ;
  }
}

export default App;
