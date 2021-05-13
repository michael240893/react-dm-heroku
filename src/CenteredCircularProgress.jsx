import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_SIZE=40;

const useStyles = makeStyles((theme) => ({
    root:{       
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width:'100%',
            textAlign:'center',
            marginTop:theme.spacing(2),
            marginBottom:theme.spacing(2)
    },

  }));

const CenteredCircularProgress = (props) => {


    const classes = useStyles();


    return (
        <div>
            <CircularProgress disableShrink className={classes.root} color='primary' size={props.size?props.size:DEFAULT_SIZE}/>
        </div>
    )
}

export default CenteredCircularProgress;