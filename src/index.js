import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home/Home";
import "./index.css";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import App from "./App";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import firebase, { auth, provider } from "./firebase.js";
import Chatbox from "./Home/Chatbox";
import { VideoCall } from "./Video/Index";
import VideoRoomComponent from "./Video/VideoRoomComponent";
import CreateTeam from "./Home/CreateTeam";
import JoinTeam from "./Home/JoinTeam";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  logOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then((window.location = "/"));
  };

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="main-nav">
            {!this.state.user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}

            {this.state.user && (
              <div>
                <a href="#!" onClick={this.logOutUser}>
                  Logout
                </a>
                <Link to="/chat">Chat</Link>
                <Link to="/video">Video Call</Link>
                <Link to="/createteam">Create Team</Link>
                <Link to="/jointeam">Join Team</Link>
              </div>
            )}
          </nav>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/chat" exact component={Chatbox} />
            <Route path="/video" exact component={VideoCall} />
            <Route path="/video/room" exact component={VideoRoomComponent} />
            <Route path="/createteam" exact component={CreateTeam} />
            <Route path="/jointeam" exact component={JoinTeam} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

ReactDOM.render(<AppRouter />, document.getElementById("root"));
