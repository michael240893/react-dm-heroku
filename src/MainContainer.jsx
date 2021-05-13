import React from 'react';
import {Container} from '@material-ui/core';
import {makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content:{
    flexGrow:1,//important for Container to be aligned horizontally centered,

  },
  container: {
    paddingTop:theme.spacing(4),
    paddingBottom:theme.spacing(6),
  },

}));


export default function MainContainer (props) {

  const classes=useStyles();
 
    return (<div className={classes.content}>
              <Container className={classes.container} maxWidth="md">
                {props.children}
              </Container>
              </div>

      );
}