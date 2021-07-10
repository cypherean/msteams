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
const Doc

function Team() {
  return (
    <div>
      <section>
        <CreateTeam />
        {/* <JoinTeam /> */}
      </section>
    </div>
  );
}

function CreateTeam() {
  const createTeam = async (e) => {
      e.preventDefault();
    const groupDetails = firestore.collection("groups");
    const { uid, photoURL } = auth.currentUser;
    groupDetails
      .add({
        name: formValue,
      })
      .then((data) => {
        var group = firestore
          .collection("groups")
          .document(data.key)
          .collection("members")
          .add(auth.currentUser);
        const messageRef = firestore
          .collection("groups")
          .document(formValue)
          .collection("texts");
        messageRef.add({
          text: formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL,
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

function ChatRoom() {
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  });

  const messageRef = firestore
    .collection("groups")
    .doc("test")
    .collection("texts");
  const query = messageRef.orderBy("createdAt").limit(30);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const dummy = useRef();
  return (
    <>
      <main>
        <div>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const msgClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${msgClass}`}>
      <img src={photoURL || PersonIcon} />
      <p>{text}</p>
    </div>
  );
}

export default Team;
