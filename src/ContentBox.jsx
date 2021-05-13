import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles=makeStyles((theme)=>({
    root:{
        padding:theme.spacing(4),
    }
}));

const DANGER={
    backgroundColor:"#ffebee",
}

const NORMAL={
    backgroundColor:"#f5f5f5",
}

export default function ContentBox (props) {

        const classes=useStyles();

        const determineStyles=()=>{
            if (props.type==="danger"){
                return DANGER;
            }
            else return NORMAL;
        }

        return (
            <Box borderRadius={2} className={props.className} style={determineStyles()}>
                <div className={classes.root}>
                {props.children}

                </div>
            </Box>
        )
    


}