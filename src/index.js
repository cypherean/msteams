// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

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
