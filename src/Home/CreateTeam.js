import logo from "../logo.svg";
import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import PersonIcon from "@material-ui/icons/Person";

import firebase from "../firebase.js";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

function CreateTeam() {
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
    <>
      <form onSubmit={createTeam}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateTeam;
