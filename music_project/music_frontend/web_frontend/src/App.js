import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSong: {
        songTitle: "",
        artist: "",
        songID: 0,
        avgRating: 0,
        userRating: 0
      },
      newSong: {
        songTitle: "",
        artist: "",
        rating: 0
      },
      isLoggedIn: false,
      isMakingAcc: false,
      songList: [],
      displayActiveSong: false,
      username: "",
      logInProps: {userInput: "",
              passwordInput: ""},
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

// this doesn't set state until you click it twice for some reason
  renderSong = (songID, songTitle, songArtist) => {
    axios 
      .get("http://localhost:8000/api/ratings")
      .then(response => response.data.filter(
        rating => rating.song === songID 
      ))
      .then(ratings => ratings.map(rating => rating.num_rate))
      .then(ratingNums => (ratingNums.reduce((a, b) => a+b, 0))/ratingNums.length)
      .then(avRating => this.setState( {activeSong: {songTitle: songTitle, artist: songArtist, songID: songID, avgRating: avRating}
      }))
      .then(() => this.setState( {displayActiveSong: true }));
    }

  createSongDiv = (title, artist, songID) => {
    return (<div className="song-button">
      <button onClick={() => this.renderSong(songID, title, artist)}>{title} - {artist}</button>
    </div>)
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
    if (newSong.rating != 0 && newSong.rating != "none" && newSong.songTitle != "" && newSong.artist != "") {
      axios 
        .post(`http://localhost:8000/api/songs/`, {title: newSong.songTitle, artist: newSong.artist})
        .then(res => axios 
          .get("http://localhost:8000/api/songs")
          .then(response => response.data.filter(
            song => song.title === newSong.songTitle
          ))
        .then(song => song[0].id)
        .then(songID => axios 
                        .post(`http://localhost:8000/api/ratings/`, {num_rate: newSong.rating, user: this.state.username, song: songID})
                        .then(res => this.refreshSongs())
                        .then(() => this.setState({newSong: {songTitle: "", artist: "", rating: 0}}))))
    } else {
      this.refreshSongs();
      this.setState({newSong: {songTitle: "", artist: "", rating: 0}});
      alert("Invalid Song!");
    }
      
  }

  onFormChange = (event) => {
    let {name, value} = event.target;
    console.log(name);
    console.log(value);
    if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5") {
      value = parseInt(value);
    };
    if (value != "none") {
      const activeSong = { ...this.state.activeSong, [name]: value};
      this.setState({activeSong: activeSong});
      console.log(this.state.activeSong);
  }
  }

  onFormSubmit = (event) => {
    const activeSong = this.state.activeSong;
    axios
      .put(`http://localhost:8000/api/songs/${activeSong.songID}/`, {title: activeSong.songTitle, artist: activeSong.artist})
      .then(res => {
          axios 
            .get(`http://localhost:8000/api/ratings/`)
            .then(response => response.data.filter(
              rating => (rating.song === activeSong.songID) && (rating.user === this.state.username)
            ))
            .then(rating => {
              if (rating.length > 0) {
                  axios 
                  .put(`http://localhost:8000/api/ratings/${rating[0].id}/`, {num_rate: activeSong.userRating, user: this.state.username, song: activeSong.songID})
                  .then(() => this.setState({displayActiveSong: false}))
                  .then(() => this.refreshSongs())          
              } else {
                axios
                  .post(`http://localhost:8000/api/ratings/`, {num_rate: activeSong.userRating, user: this.state.username, song: activeSong.songID})
                  .then(() => this.setState({displayActiveSong: false}))
                  .then(() => this.refreshSongs())               
              }
            })
        }
      )
  }

  editRatingSelect = () => {
    return (
      <select name="userRating" onChange={this.onFormChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
    )
  }

  displaySongPlate = () => {
    const userRating = this.state.activeSong.userRating;
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
                  {this.editRatingSelect()}
                </form>
                <button onClick={() => this.onFormSubmit()}>Save</button>
              </div>
          </div>
      </div>
    )
  }

  onLoginClick = (ourUser, ourPassword) =>
  {
    // console.log(ourUser);
    // console.log(ourPassword);
    axios
      .get("http://localhost:8000/api/users")
      .then(response => response.data.filter(userInfo => (userInfo.username === ourUser) && (userInfo.password === ourPassword)))
      .then(userInfo =>
      {
        // console.log(userInfo);
        if (userInfo.length > 0)
          {
            // console.log('The username is about to be updated. It is: ' + userInfo[0].username)
            this.setState({username: userInfo[0].username})
            this.setState({isLoggedIn: true})
            // console.log('The current username is ' + this.state.username)
          }
        else
        {
          alert('The information you entered within the login field is NOT COREECT!')
        }
      })
  }

  onSignupClick = (ourUser, ourPassword) =>
  {
    // console.log(ourUser);
    // console.log(ourPassword);
    axios
      .get("http://localhost:8000/api/users")
      .then(response => response.data.filter(userInfo => (userInfo.username === ourUser)))
      .then(userInfo =>
      {
        // console.log(userInfo);
        if (userInfo.length > 0)
          {
            alert('The username: ' + userInfo[0].username + ' has already been taken. Please select a new username and try again.')
          }
        else
        {
          let payload = { username: ourUser, password: ourPassword}
          axios
            .post("http://localhost:8000/api/users/", payload)
            .then(x => this.setState({username: ourUser}))
            .then(x => this.setState({isLoggedIn: true}))
            .catch(error => console.log(error))
        }
      })
  }

  updateGateField= (event) => {
    const {name, value} = event.target;
    const newlogIn = { ...this.state.logInProps, [name]: value};
    this.setState({logInProps: newlogIn});
  }

  // openSignUp = () => {
  //   alert('Opening the Sign Up Area!')
  // }


  displayGate = (choice) => {
    if (choice)
    {
      return(
        <div className='formWrapper'>
          <div className = 'signupForm'>
            <h1>SIGN UP FOR BOOMTREE</h1>
            <div className='userField'>
              <label>
                Username: 
                <input type="text" name="userInput" onChange={this.updateGateField} id='usernameArea'/>
              </label>
            </div>
            <div className='passField'>
              <label>
                Password: 
                <input type="text" name="passwordInput" onChange={this.updateGateField} id='passwordArea'/>
              </label>
            </div>
            <button onClick={() => this.onSignupClick(this.state.logInProps.userInput, this.state.logInProps.passwordInput)}>Create Account</button>
            <div className='changeFormDiv'>
                  Oh...you WANTED to log in? Well, click <a onClick={() => this.setState({isMakingAcc: false})}>HERE</a>!
            </div>

          </div>
        </div>
      )
    }
    else
    {
      return(
        <div className = 'formWrapper'>
              <div className = 'loginForm'>
                  <h1>LOGIN</h1>
                  <div className='userField'>
                    <label>
                      Username: 
                      <input type="text" name="userInput" onChange={this.updateGateField} id='usernameArea'/>
                    </label>
                  </div>
                  <div className='passField'>
                    <label>
                      Password: 
                      <input type="text" name="passwordInput" onChange={this.updateGateField} id='passwordArea'/>
                    </label>
                  </div>
                <button onClick={() => this.onLoginClick(this.state.logInProps.userInput, this.state.logInProps.passwordInput)}>Login</button>
                <div className='changeFormDiv'>
                  Don't have an account? Sign up by clicking <a onClick={() => this.setState({isMakingAcc: true})}>HERE</a>!
                </div>
              </div>
        </div>)
    }
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

  showSongList = () =>
  {
    const hasActiveSong = this.state.displayActiveSong;
    return(
    <div>
      BoomTree - Signed in as {this.state.username}
        <ul className="song-list">
          {this.renderSongList()}
        </ul>
        {hasActiveSong ? this.displaySongPlate() : null}
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
    </div>)
  }

  render() {
    const hasActiveSong = this.state.displayActiveSong;
    const hasLoggedIn = this.state.isLoggedIn;
    const attemptSignup = this.state.isMakingAcc;
    return (
      <div className="main">
        {!hasLoggedIn ? this.displayGate(this.state.isMakingAcc) : this.showSongList()}
      </div>
    )
  }
}

export default App;