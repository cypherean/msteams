import logo from "../logo.svg";
import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";
import { Tooltip } from "@material-ui/core";
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
        getTeamDetails();
      }
    });
  }, []);

  const teamId = getParameterByName("id");
  const [teamDetails, setTeamDeatils] = useState();

  function getTeamDetails() {
    const membersRef = firestore
      .collection("groups")
      .doc(teamId)
      .get()
      .then((data) => {
        setTeamDeatils(data.name);
        console.log(data);
      });
  }
  const [members, setMembers] = useState([]);
  function getMembers() {
    const membersRef = firestore
      .collection("groups")
      .doc(teamId)
      .collection("members")
      .get()
      .then((querySnapshot) => {
        const doz = querySnapshot.docs.map((doc) => doc.data());
        setMembers(doz);
        console.log(doz);
        doz.map(d => console.log(d.displayName))
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
    <div id="chat">
      <div id="members">
        
      <div id="teamName" class="grid-container draw-border" style={{top:100, left:100, position:"fixed"}}>Team Code: {teamId}</div>
        {members.length > 0 &&
          members.map(member => <div class="grid-container" value={member.displayName} />)}
      </div>
      <div id="chatbox">
        <div>
          <div id="test">
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </div>
          <div ref={dummy}></div>
        </div>

        <form id="sendmessage" onSubmit={sendMessage} style={{bottom:0, position:"fixed"}}>
          <input
            required
            value={formValue}
            placeholder="Write a message..."
            onChange={(e) => setFormValue(e.target.value)}
          />
          <Tooltip title="Send message">
            <Fab size="small" id="sendButton-1" onClick={sendMessage}>
              <Send />
            </Fab>
          </Tooltip>
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
