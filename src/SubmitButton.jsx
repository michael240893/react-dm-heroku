import { makeStyles } from '@material-ui/core/styles';
import {Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root:{
        "&:disabled":{
            color:"#fff",
            backgroundColor:theme.palette.secondary.light,
        }
    },

}));



export default function SubmitButton (props){

    const classes=useStyles();

    return <Button {...props} variant="contained" color="secondary" className={classes.root}>
        {props.children}
    </Button>
}


