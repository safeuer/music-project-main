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
      newSong: {
        songTitle: "",
        artist: "",
        rating: 0
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

// this doesn't set state until you click it twice for some reason
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
      .then(x => this.setState( {displayActiveSong: true }));
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

  deleteRating = () => {
    const song = this.state.activeSong.songID;
    const user = this.state.username;
    axios
      .get("http://localhost:8000/api/ratings")
      .then(response => response.data.filter(
        rating => (rating.song === song) && (rating.user === user)
      ))
      .then(ratings => ratings[0])
      .then(rating => {
        axios 
          .delete(`http://localhost:8000/api/ratings/${rating.id}`)
          .then(x => this.displaySongPlate())
      })
  }

  deleteSong = () => {
    const songID = this.state.activeSong.songID;
    axios 
      .delete(`http://localhost:8000/api/songs/${songID}`)
      .then(res => this.setState({displayActiveSong: false}))
      .then(() => this.refreshSongs())  
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

  onFormChange = (event) => {
    let {name, value} = event.target;
    const activeSong = { ...this.state.activeSong, [name]: value};
    this.setState({activeSong: activeSong});
  }

  onCreateFormChange = (event) => {
    let {name, value} = event.target;
    if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5") {
      value = parseInt(value);
    };
    const newSong = { ...this.state.newSong, [name]: value};
    this.setState({newSong: newSong});
  }

  onCreateFormSubmit = (event) => {
    const newSong = this.state.newSong;
    console.log("hey");
    console.log(newSong.rating);
    console.log(newSong.songTitle);
    console.log(newSong.artist);
    if (newSong.rating != 0 && newSong.rating != "none" && newSong.songTitle != "" && newSong.artist != "") {
      axios 
        .post(`http://localhost:8000/api/songs/`, {title: newSong.songTitle, artist: newSong.artist})
        .then(res => this.refreshSongs())
        .then(() => this.setState({newSong: {songTitle: "", artist: "", rating: 0}})
        )
    } else {
      this.refreshSongs();
      this.setState({newSong: {songTitle: "", artist: "", rating: 0}});
      alert("Invalid Song!");
    }
      
  }

  onFormSubmit = (event) => {
    const activeSong = this.state.activeSong;
    axios
      .put(`http://localhost:8000/api/songs/${activeSong.songID}/`, {title: activeSong.songTitle, artist: activeSong.artist})
      .then(res => this.setState({displayActiveSong: false}))
      .then(() => this.refreshSongs())
  }

  displaySongPlate = () => {
    return(
      <div className="plateContainer">
          <div className="songInfo">
            <h2>SELECTED SONG</h2>
            Song Title - {this.state.activeSong.songTitle} <br></br>
            Song's Artist - {this.state.activeSong.artist} <br></br>
            Avg. Rating - {this.state.activeSong.avgRating}
              <div className = "songButtons">
                <button onClick={() => this.deleteRating()}>Delete Rating</button>
                <button onClick={() => this.deleteSong()}>Delete Song</button>
                <form>
                  <input name="songTitle" value={this.state.activeSong.songTitle} onChange={this.onFormChange}></input>
                  <input name="artist" value={this.state.activeSong.artist} onChange={this.onFormChange}></input>
                </form>
                <button onClick={() => this.onFormSubmit()}>Save</button>
              </div>
          </div>
      </div>
    )
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
        BoomTree - signed in as {this.state.username}
        <ul className="song-list">
          {this.renderSongList()}
        </ul>
        {hasActiveSong ? this.displaySongPlate() : null}
        {/* {hasActiveSong ? (<div className="activeSongDiv">
          Song is {this.state.activeSong.songTitle} by {this.state.activeSong.artist} with an average rating of {this.state.activeSong.avgRating}
        </div>) : null} */}
        <h3>Add Song</h3>
        <form>
          <input name="songTitle" placeholder="Song Title" onChange={this.onCreateFormChange}></input>
          <input name="artist" placeholder="Artist" onChange={this.onCreateFormChange}></input>
          <select name="rating" onChange={this.onCreateFormChange}>
            <option value="none">-rating-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </form>
        <button onClick={() => this.onCreateFormSubmit()}>Create Song</button>
      </div>
    )
  }
}

export default App;