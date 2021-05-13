import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



function Alert(props) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}


export default function NotificationBar (props)  {


    return (
        
        <Snackbar 
          anchorOrigin={{
          vertical: props.vertical?props.vertical:'top',
          horizontal: 'center',
        }} open={props.open} autoHideDuration={8000} onClose={props.handleClose} > 
            <Alert  onClose={props.handleClose} severity={props.severity} >
            {props.children}
            </Alert>
        </Snackbar>

    );
    }