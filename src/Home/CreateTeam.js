import logo from "../logo.svg";
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

  const createTeam = async (e) => {
    e.preventDefault();
    const groupDetails = firestore.collection("groups");
    const user = auth.currentUser;
    const { uid, email, displayName, photoURL } = auth.currentUser;
    groupDetails
      .add({
        name: formValue,
      })
      .then((data) => {
        console.log(data);
        const group = firestore
          .collection("groups/" + data.id + "/members")
          .add({
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
        const team = firestore.collection("users/" + uid + "/teams").add({
          teamID: data.id,
          teamName: formValue,
        });
      });
  };

  const [formValue, setFormValue] = useState("");

  return (
    <div>
      <Navbar></Navbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Create a Team
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="teamname"
              variant="outlined"
              required
              fullWidth
              id="teamname"
              label="Team name"
              autoFocus
              value={teamname}
              onChange={(e) => setTeamname(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => createTeam}
        >
          Create Team
        </Button>
      </Container>
    </div>
  );
}

export default CreateTeam;
