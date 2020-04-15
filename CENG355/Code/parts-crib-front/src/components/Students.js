import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";
import { updateTagsList, update } from "../actions/firebase";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
    table: {
      minWidth: 650,

    },
  }));

function getStudentsOutstanding(users){
    // Check if onboarded
    const usersList = [];

    users.map(user => {
        user = user.value;
        var currentCount = 0;
        if (user.requests){
            var currReqList = Object.values(user.requests);
            currReqList.map( request => {
                if (request.requestStatus == "Outstanding")
                    currentCount++
            })
        }

        usersList.push({ ...user, numOutstandingRequests: currentCount})
    });

    return usersList;
}

function getOnboardingStudents(users, tags){
    const usersList = []
    const tagUserIDs = Object.values(tags);
    
    users.map(user => {
        user = user.value
        var currentTag = null;
        tagUserIDs.map(tag => {
            if (tag.firebaseStudentID === user.id){
                currentTag = tag.id;
            }

        })
        usersList.push({...user, tag: currentTag })

    })

    return usersList;
}


function OnboardingTable({ usersList }){

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
                
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Student Number</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">RFID Status</TableCell>
                    <TableCell align="right">RFID #</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { usersList.map(user => (
                    <TableRow hover key={user.id} >
                        <TableCell component="th" scope="row">{user.studentNumber}</TableCell>
                        <TableCell align="right">{user.firstName}</TableCell>
                        <TableCell align="right">{user.tag ? "Active": "Not Active"}</TableCell>
                        <TableCell align="right">{user.tag ? user.tag : "N/A"}</TableCell>
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    </TableContainer>
    )
}

function OutstandingTable({ usersList }){
    const classes = useStyles();
    
    return (
        <TableContainer component={Paper}>
                
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Student Number</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right"># Of Outstanding Requests</TableCell>
                    <TableCell align="right">Overdue Requests</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { usersList.map( user => (
                    <TableRow hover key={user.id} >
                        <TableCell component="th" scope="row">{user.studentNumber}</TableCell>
                        <TableCell align="right">{user.firstName}</TableCell>
                        <TableCell align="right">{user.numOutstandingRequests}</TableCell>
                        <TableCell align="right">{user.numOutstandingRequests > 2 ? "Yes": "No"}</TableCell>
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    </TableContainer>
    )
}
function Students({ users, tags, bags, currentOnboarding }) {

    const classes = useStyles();
    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    
    const onboardingList = getOnboardingStudents(users, tags);
    const outstandingList = getStudentsOutstanding(users);
    
      return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                    <Tab
                    value="one"
                    label="ONBOARDING"
                    wrapped
                    {...a11yProps('one')}
                    />
                    <Tab value="two" label="OUTSTANDING" {...a11yProps('two')} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
                <OnboardingTable usersList={onboardingList}/>
            </TabPanel>
            <TabPanel value={value} index="two">
                <OutstandingTable usersList={outstandingList}/>
            </TabPanel>

      </div>
      );
}

export default Students;
