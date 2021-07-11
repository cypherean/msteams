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
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
        .then((window.location = "/"));
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Button onClick={() => path("/")} color="inherit">
                Home
            </Button>
            <Button onClick={() => path("/joinTeam")} color="inherit">
                Join Team
            </Button>
            <Button onClick={() => path("/createteam")} color="inherit">
                Create Team
            </Button>
            <Button onClick={() => path("/video")} color="inherit">
                Video Call
            </Button>
            <Typography variant="h6" className={classes.title}></Typography>
            <Button onClick={() => logOutUser} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
        </div>
    );
}
