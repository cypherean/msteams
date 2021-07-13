import logo from "../logo.svg";
import group from "../group.svg"; 

import React, { useRef, useState, useEffect } from "react";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Linki from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import firebase from "../firebase.js";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Navbar from "../Components/Nav";

const auth = firebase.auth();
const firestore = firebase.firestore();

function CreateTeam() {
  const [teamname, setTeamname] = useState("");

  const [teamID, setTeamID] = useState("");

  const createTeam = async (e) => {
    e.preventDefault();
    if (formValue.length === 0) {
      alert("Enter team name");
      return;
    }
    const groupDetails = firestore.collection("groups");
    // const user = auth.currentUser;
    const { uid, email, displayName, photoURL } = auth.currentUser;
    groupDetails
      .add({
        name: formValue,
      })
      .then((data) => {
        setTeamID(data.id);
        console.log("aaaaaaaaaaa");
        console.log(data.id);
        const group = firestore
          .collection("groups/" + data.id + "/members")
          .doc(uid)
          .set({
            uid,
            email,
            displayName,
            photoURL,
          });
        const text = firestore.collection("groups/" + data.id + "/texts").add({
          text: "Welcome",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL,
        });
        const team = firestore
          .collection("users/" + uid + "/teams")
          .doc(data.id)
          .set({
            teamID: data.id,
            teamName: formValue,
          });
        window.location.href = "/chat?id=" + data.id;
      });
    console.log(teamID);
  };

  const [formValue, setFormValue] = useState("");

  return (
    <div>
      <div>
        <div class="container-3">
          <div class="card-3">
            <img
              src={group}
              alt="Person"
              class="card__image"
            />
            <p class="card__name">Create a Team</p>
            {!teamID && (
              <>
                <div class="grid-container">
                  Enter team name and share the generated team code with your
                  friends
                </div>
                <input
                  required="true"
                  class="btn draw-border"
                  type="text"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                />
                <button class="btn draw-border" onClick={createTeam}>
                  Create
                </button>
              </>
            )}
            {teamID && (
              <div>
                <div class="grid-container">
                  Share the team code with your friends:
                </div>
                <div class="grid-container">{teamID}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <h4></h4>
      {!teamID && (
        <div>
          <p>
            Enter team name and share the generated team code with your friends
          </p>
          <form onSubmit={createTeam}>
            <div>
              <input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
              />
            </div>
            <button type="submit">Create!</button>
          </form>
        </div>
      )}
      {teamID && (
        <div>
          <p>Share the team code with your friends:</p>
          <p>{teamID}</p>
        </div>
      )} */}
    </div>
  );
}

export default CreateTeam;
