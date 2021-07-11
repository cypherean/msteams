import logo from "../logo.svg";
import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import PersonIcon from "@material-ui/icons/Person";

import firebase from "../firebase.js";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const auth = firebase.auth();
const firestore = firebase.firestore();

function JoinTeam() {
  const joinTeam = async (e) => {
    e.preventDefault();
    const { uid, email, displayName, photoURL } = auth.currentUser;
    const id = formValue;

    var name = "";
    firestore
      .collection("groups/" + id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          name = doc.name;
        }
      });

    const group = firestore.collection("groups/" + id + "/members").add({
      uid,
      email,
      displayName,
      photoURL,
    });
    // const text = firestore.collection("groups/" + data.id + "/texts").add({
    //   text: "Welcome",
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //   uid,
    //   photoURL,
    // });
    const team = firestore.collection("users/" + uid + "/teams").doc(id).add({
      teamID: id,
      teamName: name,
    });
  };

  const [formValue, setFormValue] = useState("");

  return (
    <>
      <h4>Join a team</h4>
      <p>Enter the team code to join a team</p>
      <form onSubmit={joinTeam}>
        <div>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
        </div>
        <button type="submit">Join</button>
      </form>
    </>
  );
}

export default JoinTeam;
