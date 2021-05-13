import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

function Message(props) {
    return <MuiAlert style={{marginTop:10, marginBottom:10}} elevation={1} variant="standard" {...props} />;
  }
  
  export default Message;