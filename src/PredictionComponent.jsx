import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useBackend } from './providers/BackendProvider';
import NotificationBar from './NotificationBar';
import CenteredCircularProgress from './CenteredCircularProgress';
import ContentBox from './ContentBox';
import ResetButton from './ResetButton';
import PredictionResult from './PredictionResult';
import SubmitButton from './SubmitButton';
import {TextField, Grid} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    display:"flex",
  },
  contentBox:{
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(2),
  },
  formButtonDiv:{
      marginTop:theme.spacing(1),
      textAlign:"right"
  },
  header:{
      marginBottom:theme.spacing(2)
  },

}));

const PREDICTIONS_PATH="/weather";

const initialState={
    result:"",
    error:undefined,
    isLoading:false
}

function reducer(state, action) {
    switch (action.type) {
      case 'success':
        return {result:action.result, error:undefined, isLoading:false};
      case 'error':
        return {result:"", error:action.error, isLoading:false};
      case 'start':
          return {...state, isLoading:true}
      case 'reset':{
          return {...initialState}
      }
      default:
        throw new Error("reducer called with invalid type parameter");
    }
  }


export default function PredictionComponent(props){

    const classes=useStyles();

    const {apiCall}=useBackend();

    const [location, setLocation]=React.useState(props.locations[0]);
    const [humidity, setHumidity]=React.useState(0);
    const [pressure, setPressure]=React.useState(0);
    const [cloud, setCloud]=React.useState(0);
    const [sunshine, setSunshine]=React.useState(0);
    const [rainfall, setRainfall]=React.useState(0);


    const reset=()=>{
        dispatch({type:"reset"});
        setLocation(props.locations[0]);
        setHumidity(0);
        setPressure(0);
        setCloud(0);
        setSunshine(0);
        setRainfall(0);
    }

    const [state,dispatch]=React.useReducer(reducer, initialState);

    const handleSubmit=(e)=>{
        e.preventDefault();
        getPrediction();
    }

    const getPrediction=()=>{
        let params={
            location:location,
            humidity:humidity,
            pressure:pressure,
            rainfall:rainfall,
            sunshine:sunshine,
            cloud:cloud
        }
        dispatch({type: 'start'})
        apiCall(PREDICTIONS_PATH,"get",params).then(res=>{
            dispatch({type:"success", result:res})            
        }).catch(()=>{
            dispatch({type:"error",error:"An error occurred"});
        })
    }

    return(
        <React.Fragment>

            <ContentBox className={classes.contentBox}>
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <Autocomplete
                                value={location}
                                onChange={(event, newValue) => {
                                  if (event.reason==="clear"){
                                      setLocation("");
                                  }
                                  else setLocation(newValue);
                                }}
                                margin="none"
                                options={props.locations}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Locations" variant="outlined" />}
                                />
                        </Grid> 
                        <Grid item xs={6}>
                            <TextField margin="none" fullWidth label="Humidity" type="number" value={humidity} onChange={(e)=>setHumidity(e.target.value)} variant="outlined" />
                        </Grid> 
                        <Grid item xs={6}>
                            <TextField margin="none" fullWidth label="Pressure" type="number" value={pressure} onChange={(e)=>setPressure(e.target.value)} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField margin="none" fullWidth label="Cloud" type="number" value={cloud} onChange={(e)=>setCloud(e.target.value)} variant="outlined" />
                        </Grid> 
                        <Grid item xs={6}>
                            <TextField margin="none" fullWidth label="Sunshine" type="number" value={sunshine} onChange={(e)=>setSunshine(e.target.value)} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField margin="none" fullWidth label="Rainfall" type="number" value={rainfall} onChange={(e)=>setRainfall(e.target.value)} variant="outlined" />
                        </Grid> 

                    </Grid>
                   
                        <div className={classes.formButtonDiv}>
                            <ResetButton disabled={state.isLoading} size="large" onClick={reset}>Reset</ResetButton>
                            <SubmitButton size="large" disabled={state.isLoading} type="submit">Predict</SubmitButton>
                        </div>
                    </form>
            </ContentBox>
            {state.isLoading&&<CenteredCircularProgress/>}
            {!state.isLoading&&<PredictionResult result={state.result}/>}
            <NotificationBar severity="error" handleClose={()=>dispatch({type:"reset"})} open={!!state.error}>{state.error}</NotificationBar>
        </React.Fragment>

    )
}