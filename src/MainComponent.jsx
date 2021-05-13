import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import MainContainer from './MainContainer';
import { useBackend } from './providers/BackendProvider';
import PredictionComponent from './PredictionComponent';
import {useQuery} from 'react-query';
import CenteredCircularProgress from './CenteredCircularProgress';
import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  root: {
    display:"flex",
  },
  contentBox:{
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(2),
  },
  formButtonDiv:{
      textAlign:"right"
  },
  header:{
      marginBottom:theme.spacing(2)
  }

}));

const LOCATION_PATH="/locations";
const WIND_DIR_PATH="/wind_directions";


export default function MainComponent(props){

    const classes=useStyles();

    const {apiCall}=useBackend();

    const locations=useQuery(
        LOCATION_PATH,
        ()=>apiCall(LOCATION_PATH,"get")
    )
    
    const windDirections=useQuery(
        WIND_DIR_PATH,
        ()=>apiCall(WIND_DIR_PATH,"get")
    )

    return(
        <div className={classes.root}>
            <AppBar >
                <Toolbar>
                    <Typography variant="h5">
                        Weather-Australia
                    </Typography>
                </Toolbar>
            </AppBar>    
            <MainContainer>
                <Typography className={classes.header} variant="h4">Weather Prediction</Typography>  
                {(locations.error||windDirections.error)?<Message severity="error">An error occurred when loading the data from the server</Message>:null}
                {(locations.isLoading||windDirections.isLoading)&&<CenteredCircularProgress/>}
                {!locations.isLoading&&locations.data&&!windDirections.isLoading&&windDirections.data&&
                    <PredictionComponent
                        locations={locations.data}
                        windDirections={windDirections.data}
                    />
                }

            </MainContainer>        
        </div>

    )

}