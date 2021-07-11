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
    const team = firestore.collection("users/" + uid + "/teams").add({
      teamID: id,
      teamName: name,
    });
  };

  const [formValue, setFormValue] = useState("");

  return (
    <>
      <p className="new"> Enter team code</p>
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
