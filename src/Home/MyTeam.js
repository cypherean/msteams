import logo from "../logo.svg";
import group from "../group.svg"; 
import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

import firebase from "../firebase.js";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
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

function MyTeam() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(auth.currentUser);
        getTeams();
      }
    });
  }, []);

  const [documents, setDocuments] = useState([]);

  //   const { uid, displayName } = auth.currentUser;

  //   const myteams = firestore
  //     .collection("users/" + uid + "/teams")
  //     .get()
  //     .then((querySnapshot) => {
  //       setDocuments(querySnapshot.docs.map((doc) => doc.data()));
  //       console.log(documents);
  //     });
  function getTeams() {
    const { uid, displayName } = auth.currentUser;

    const myteams = firestore
      .collection("users/" + uid + "/teams")
      .get()
      .then((querySnapshot) => {
        setDocuments(querySnapshot.docs.map((doc) => doc.data()));
        console.log(documents);
      });
  }

  function reroute(teamID) {
    window.location.href = "/chat?id=" + teamID;
  }

  const [formValue, setFormValue] = useState("");

  return (
    <>
      <div>
        <div class="container-3">
          <div class="card-3">
            <img
              src={group}
              alt="Person"
              class="card__image"
            />
            <p class="card__name">My teams</p>
            {documents.length === 0 && (
              <div class="grid-container">You haven't joined a team yet</div>
            )}
            {documents &&
              documents.map((doc) => (
                <div>
                  <button
                    class="btn draw-border"
                    onClick={() => reroute(doc.teamID)}
                  >
                    {doc.teamName}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <h4>My teams</h4>
      {documents.length === 0 && (
        <p> You haven't joined a team yet</p>
        
      )}

      {documents &&
        documents.map((doc) => (
          <div>
            <Button
              background-color="primary"
              onClick={() => reroute(doc.teamID)}
            >
              {doc.teamName}
            </Button>
          </div>
        ))} */}
    </>
  );
}

export default MyTeam;
