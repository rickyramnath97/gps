import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Requests from './Requests';
import Students from './Students';
import CurrentStudentSignin from './CurrentStudentSignin';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import BuildIcon from '@material-ui/icons/Build';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

import "./tableGrid.css";
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'


const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 100
  },

    drawerPaper: {
      background: "#4c5f77",
      
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

  }));

function Home (props) {

    const { isLoggingOut, logoutError, data } = props;

    useFirebaseConnect([
      {path: 'userdata'},
      {path: 'parts'},
      {path: 'newsBulletin'},
      {path: 'tags'},
    ])

    const users = useSelector(state => state.firebase.ordered.userdata);
    const parts = useSelector(state => state.firebase.ordered.parts);
    const newsBulletin = useSelector(state => state.firebase.ordered.newsBulletin);
    const tags = useSelector(state => state.firebase.ordered.tags);
    if (isLoaded(users)){
      console.log(users)
    }


  const handleLogout = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  };


  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  if (!isLoaded(users) || !isLoaded(parts) || !isLoaded(newsBulletin) || !isLoaded(tags)){
    return <div>Loading...</div>
  }
  
  return (
    <div>

      <CssBaseline />
      <AppBar
        color="white"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap className={classes.title}>
            Parts Crib Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
        
        <main className={classes.content}>
            <div className="currentActivityCard">
              <CurrentStudentSignin users={Object.values(users)} newsBulletin={newsBulletin} tags={tags}/>
            </div>
            <div className="grid2x2">
              <div className="box"><div><Requests  users={Object.values(users)}/></div></div>
              <div className="box"><div><Students users={Object.values(users)} tags={tags} /></div></div>
              <div className="box"><div></div></div>
              <div className="box"><div></div></div>
            </div>
        </main>
        <button onClick={handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
    data: state.data,
  };
}
export default connect(mapStateToProps)(Home);