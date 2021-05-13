import { makeStyles } from '@material-ui/core/styles';
import {Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root:{
        marginRight:theme.spacing(1),
        "&:disabled":{
            color:theme.palette.primary.dark,
            borderColor:theme.palette.primary.dark
        }
    },

}));



export default function SubmitButton (props){

    const classes=useStyles();

    return (
            <Button {...props} variant="outlined" color="primary" className={classes.root}>
                {props.children}
            </Button>
    )
}


