import logo from "../logo.svg";
import group from "../group.svg"; 
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
    if (formValue.length === 0) {
      alert("Enter team code");
      return;
    }
    const { uid, email, displayName, photoURL } = auth.currentUser;
    const id = formValue;

    var tname = "";
    await firestore
      .collection("groups")
      .get()
      .then((querySnapshot) => {
        let documents = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        documents.forEach((doc) => {
          if (doc.id == id) {
            tname = doc.name;
          }
        });
      });

    const group = await firestore.collection("groups/" + id + "/members").add({
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
    const team = await firestore
      .collection("users/" + uid + "/teams")
      .doc(id)
      .set({
        teamID: id,
        teamName: tname,
      });
    window.location.href = "/chat?id=" + id;
  };

  const [formValue, setFormValue] = useState("");

  return (
    <>
      <div class="container-3">
        <div class="card-3">
          <img
            src={group}
            alt="Person"
            class="card__image"
          />
          <p class="card__name">Join a team</p>
          <div class="grid-container">Enter the team code to join a team</div>
          <input
            required
            class="btn draw-border"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button class="btn draw-border" onClick={joinTeam} type="submit">
            Join
          </button>
        </div>
      </div>
    </>
  );
}

export default JoinTeam;
