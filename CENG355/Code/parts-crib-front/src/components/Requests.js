import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    table: {
      minWidth: 650,
    },
  }));

function getAllRequests(users){
    const requests = [];
    console.log(users);
    
    users.map(user => {
        user = user.value;
        if (user.requests){
            var currRequestList = Object.values(user.requests);
            currRequestList.map(request => {
                if (request.requestStatus){
                    requests.push({ studentName: user.firstName, 
                        studentNumber: user.studentNumber, request: request })
                }
            });
        }

    })
    

    return requests;

}

function getSubmitted(){

}

function Requests({ users }) {
    const classes = useStyles();
    console.log(users);
    const requests = getAllRequests(users);
    if (!users){
        return <div>....</div>
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <TableContainer component={Paper}>
                
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Student #</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">ETA</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { requests.map(request => (
                            <TableRow hover key={request.studentNumber + request.request.requestID} >
                                <TableCell component="th" scope="row">{request.studentNumber}</TableCell>
                                <TableCell align="right">{request.studentName}</TableCell>
                                <TableCell align="right">{request.request.requestTimeStamp}</TableCell>
                                <TableCell align="right">{request.request.requestStatus}</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

function mapStateToProps(state){

    return {

    }
};

export default Requests;
