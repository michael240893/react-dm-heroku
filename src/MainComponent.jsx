import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import MainContainer from './MainContainer';
import { useBackend } from './providers/BackendProvider';
import PredictionComponent from './PredictionComponent';
import {useQuery} from 'react-query';
import CenteredCircularProgress from './CenteredCircularProgress';
import Message from "./Message";
import AppInfoComponent from './AppInfoComponent';

const useStyles = makeStyles((theme) => ({

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
//const WIND_DIR_PATH="/wind_directions";


export default function MainComponent(props){

    const classes=useStyles();


    const {apiCall}=useBackend();

    const locations=useQuery(
        LOCATION_PATH,
        ()=>apiCall(LOCATION_PATH,"get")
    )
    
    // const windDirections=useQuery(
    //     WIND_DIR_PATH,
    //     ()=>apiCall(WIND_DIR_PATH,"get")
    // )

    return(
        <div>
            <AppBar >
                <Toolbar>
                    <Typography variant="h5">
                        Weather Australia
                    </Typography>
                </Toolbar>
            </AppBar>    
            <AppInfoComponent/>   

            <MainContainer>
                <Typography className={classes.header} variant="h4">Prediction</Typography>  
                {locations.error?<Message severity="error">An error occurred when trying to load the available locations from the server</Message>:null}
                {locations.isLoading&&<CenteredCircularProgress/>}
                {!locations.isLoading&&locations.data&&
                    <PredictionComponent
                        locations={locations.data}
                    />
                }

            </MainContainer>  
        </div>

    )

}