import React, { useState, useEffect, Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import $ from 'jquery';

import firebase from "../firebase.js";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

const user = auth.currentUser ? auth.currentUser.displayName : "shreya";

function Meet() {
	useEffect(() => {
		window.onload = function () {
			$("input[name='sessionname']").val(Math.floor(Math.random() * 10));
			$("input[name='data']").val(user);
		}
	}, []);

	const sendData=() =>{
		window.location.href = '/video/room?id=' + $("input[name='sessionname']").val();
	}

	const element = (
		< div >
			<div id="main-container" className="container">
				<div id="logged">
					<div id="join" className="vertical-center">
						<div id="img-div"><img src="images/openvidu_grey_bg_transp_cropped.png" /></div>
						<div id="join-dialog" className="jumbotron">
							<h1>Join a video session</h1>
							<div className="form-group">
								<p>
									<label>Session</label>
									<input className="form-control" type="text" name="sessionname" required="true" />
								</p>
								<p className="text-center">
									<button className="btn btn-lg btn-success" type="submit" onClick={sendData}>Join!</button>
								</p>
							</div>
							<hr />
							<div id="login-info">
								<div>Logged as <span id="name-user">{user}</span></div>
								<form action="/logout" method="post">
									<button id="logout-btn" className="btn btn-warning" type="submit">Log out</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
	return element;
}

export { Meet };
