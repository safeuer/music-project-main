import logo from './logo.svg';
import './App.css';
import axios from "axios";

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songTitle: "",
      artist: ""
    };
  }

  render() {
    <div className = "{song.id}">
      <button onClick = "this.displaysong">this.SongTitle</button>
    </div>
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
      .get("http://localhost:8000/api/songs") // CHANGE
      .then(result => this.setState({ songList: result.data }))
      .catch(error => console.log(error))
  }
}

export default App;
