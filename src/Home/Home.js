import React from "react";
import firebase from "../firebase";
import { Link } from "react-router-dom";

import Chatbox from "./Chatbox";

function Home() {
  return (
    <div className="home--container">
      <h1>Welcome to the chat!</h1>
    </div>
  );
}

export default Home;
