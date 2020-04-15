import React from 'react';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 375,
    textAlign: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function pinAsterisk(pin){
    var count = 0;
    var asteriskString = ""
    while (count < pin.length){
        asteriskString += "*";
        count++;
    }
    
}
function CurrentStudentSignin(props) {

    const { users, newsBulletin, tags } = props
    const classes = useStyles();

    var userMap = {};

    users.map(user => {
        userMap[user.key] = user.value;
    })

    const signIn = newsBulletin[3].value;
    
    console.log(newsBulletin)
    console.log(userMap[signIn.currentUID]);
    return (
        <Card className={classes.root} variant="outlined">
        {signIn.studentSigningIn == "true" ? 
        <CardContent>
          <Typography variant="h5" component="h2">
            STUDENT SIGN-IN IN PROGRESS
          </Typography>
          
          <Typography className={classes.pos} color="textSecondary">
            Current User: {userMap[signIn.currentUID].studentNumber}
          </Typography>
          <Typography variant="body2" component="p">
            Pin Entered: {userMap[signIn.currentUID].currentPinEntry}
            <br />
                
          </Typography>
        </CardContent>
        :
        <CardContent>
            <Typography variant="h5" component="h2">
            STANDBY
          </Typography>
        </CardContent>
        }
        <CardActions>
          <Button size="small">RESET</Button>
        </CardActions>
      </Card>
    )
}

export default CurrentStudentSignin;
