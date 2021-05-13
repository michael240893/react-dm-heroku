import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box, Toolbar, IconButton, Collapse } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width:"100%",
    zIndex:1,
    transition: "height 4s",

  },
  content:{
    padding:theme.spacing(3),
    flex:1,
    zIndex:1,
  },
  flexLine:{
      display:"flex"
  },
  hideButton:{
      alignSelf:"start"
  },

}));




export default function AppInfoComponent(props){

    const classes=useStyles();

    const [appInfo,setAppInfo]=React.useState(true);


    return(
        <div className={classes.root}>
            <Toolbar></Toolbar>
            {<Collapse in={appInfo}>

                <div className={classes.flexLine}>
                    <Box align="center" className={classes.content}>
                        <Typography variant="subtitle1" color="textSecondary">Created by Susanne Zaunmayr and Michael Schimpelsberger as an assignment for the course Data Mining at the Johannes Kepler University Linz during the summer term 2021</Typography>
                    </Box>
                    <IconButton  className={classes.hideButton} variant="outlined" onClick={()=>setAppInfo(false)} ><CloseIcon fontSize="small"/></IconButton>

                </div>
                <Divider/>
            </Collapse>}
        </div>
    )
}