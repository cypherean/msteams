import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";
const config = {
    apiKey: "AIzaSyBdtgYM5bo79Oo3QeJYpjgk5HSk0EJhpbM",
    authDomain: "teams-clone-20c70.firebaseapp.com",
    projectId: "teams-clone-20c70",
    storageBucket: "teams-clone-20c70.appspot.com",
    messagingSenderId: "802526882733",
    appId: "1:802526882733:web:b8d0fd09af01c4c0f48f24",
    measurementId: "G-DQ6HWE0QF6",
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;