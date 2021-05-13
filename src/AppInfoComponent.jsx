import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    position:"fixed",
    width:"100%",
    zIndex:1,
    bottom:0
  },
  content:{
    padding:theme.spacing(2),
    zIndex:1,

  }

}));




export default function AppInfoComponent(props){

    const classes=useStyles();

    return(
        <div className={classes.root}>
            <Divider/>
            <Box align="center" className={classes.content}>
                <Typography variant="subtitle1" color="textSecondary">Created by Susanne Zaunmayr and Michael Schimpelsberger as an assignment for the course Data Mining at the Johannes Kepler University Linz during the summer term 2021</Typography>
            </Box>
        </div>
    )
}