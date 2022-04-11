import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from 'react';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songTitle: "",
      artist: ""
    };
  }

  render() {
    return (<div className = "{song.id}">
      <button onClick = "this.displaysong">this.SongTitle</button>
    </div>)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSong: {
        songTitle: "",
        artist: ""
      },
      songList: []
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

  renderSongs = () => {
    songList = this.state.songList;
    return songList.map(song => (
      <li key={song.id}
      className="song-in-list">
        <Song songTitle={song.title} artist={} />
      </li>
    ))
  }
  
}

export default App;
