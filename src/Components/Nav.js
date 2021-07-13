import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import firebase, { auth, provider } from "../firebase.js";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#2f5061",
    color: "white",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    marginLeft: -100,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  function path(arg) {
    window.location.href = arg;
  }
  function logOutUser() {
    firebase
      .auth()
      .signOut()
      .then((window.location.href = "/login"));
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{top:0}} className={classes.header}>
        <Toolbar>
          <Button onClick={() => path("/")} color="inherit">
            Home
          </Button>
          <Button onClick={() => path("/video")} color="inherit">
            Video Call
          </Button>
          <Typography variant="h6" className={classes.title}>
            MS Teams
          </Typography>
          <Button onClick={logOutUser} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
