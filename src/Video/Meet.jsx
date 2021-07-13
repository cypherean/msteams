import React, { useState, useEffect, Component } from "react";
import vc from "../group.svg"; 
import { NavLink, Route } from "react-router-dom";
import $ from "jquery";
import "./Video.css";

import firebase from "../firebase.js";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DuoIcon from "@material-ui/icons/Duo";
import VideocamIcon from "@material-ui/icons/Videocam";

const auth = firebase.auth();
const firestore = firebase.firestore();

const user = auth.currentUser ? auth.currentUser.displayName : "shreya";

function Meet() {
  useEffect(() => {
    $("input[name='sessionname']").val(
      Math.floor(Math.random() * 100000) + 10000
    );
    $("input[name='data']").val(user);
  }, []);

  const sendData = () => {
    window.location.href =
      "/video/room?id=" + $("input[name='sessionname']").val();
  };

  const element = (
    <div>
      <div class="container-2">
        <div class="card">
          <img
            src={vc}
            alt="Person"
            class="card__image"
          />
          <p class="card__name">Video Call</p>
          <div class="grid-container">
            Click on join to start an instant meeting or enter the session ID
            you wish to join.
          </div>
            <input
              class="btn draw-border"
              type="text"
              name="sessionname"
              required="true"
            />
          <button class="btn draw-border" onClick={sendData}>Join</button>
        </div>
      </div>
    </div>
  );
  return element;
}

export { Meet };
