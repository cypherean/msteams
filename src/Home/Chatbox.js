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

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function Chatbox() {
  return (
    <div>
      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(auth.currentUser);
        getMembers();
      }
    });
    const teamId = getParameterByName("id");
  }, []);

  const teamId = getParameterByName("id");
  const [members, setMembers] = useState([]);
  function getMembers() {
    const membersRef = firestore
      .collection("groups")
      .doc(teamId)
      .collection("members")
      .get()
      .then((querySnapshot) => {
        console.log("setttttttttttttttt");
        const doz = querySnapshot.docs.map((doc) => doc.data());
        setMembers(querySnapshot.docs.map((doc) => doc.data()));
        console.log(doz);
        console.log(members);
      });
  }

  const messageRef = firestore
    .collection("groups")
    .doc(teamId)
    .collection("texts");
  const query = messageRef.orderBy("createdAt").limit(30);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
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
    <div id="chat" onLoad={() => getMembers}>
      <div id="members">
        {
          <div>
            <h1>Hi</h1>
            <div id="member">{document.displayName}</div>
          </div>
        }
      </div>
      <div id="chatbox">
        <main>
          <div>
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </div>
          <div ref={dummy}></div>
        </main>

        <form id="sendmessage" onSubmit={() => sendMessage}>
          <input
            required
            value={formValue}
            placeholder="Write a message..."
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const msgClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${msgClass}`}>
      <img src={photoURL || "https://source.unsplash.com/random"} />
      <p>{text}</p>
    </div>
  );
}

export default Chatbox;
