import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useBackend } from './providers/BackendProvider';
import NotificationBar from './NotificationBar';
import CenteredCircularProgress from './CenteredCircularProgress';
import ContentBox from './ContentBox';
import ResetButton from './ResetButton';
import PredictionResult from './PredictionResult';
import SubmitButton from './SubmitButton';
import {TextField, Grid, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
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

    const [rainToday, setRainToday]=React.useState("No");
    const [location, setLocation]=React.useState(props.locations[0]);
    const [windDirection, setWindDirection]=React.useState(props.windDirections[0]);

    const reset=()=>{
        dispatch({type:"reset"});
        setRainToday("No");
        setLocation(props.locations[0]);
        setWindDirection(props.windDirections[0]);
    }

    const [state,dispatch]=React.useReducer(reducer, initialState);

    const handleSubmit=(e)=>{
        e.preventDefault();
        getPrediction();
    }

    const getPrediction=()=>{
        let params={
            location:location,
            windDirection:windDirection,
            rainToday:rainToday
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
                            <Autocomplete
                                    margin="none"
                                    value={windDirection}
                                    onChange={(event, newValue) => {
                                      if (event.reason==="clear"){
                                          setWindDirection("");
                                      }
                                      else setWindDirection(newValue);
                                    }}
                                    options={props.windDirections}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params}  label="Wind Direction" variant="outlined" />}
                                    />
                        </Grid> 
                        <Grid item xs={6}>
                            <FormControl  fullWidth variant="outlined"   margin="none">
                                <InputLabel id="locked-label">Rained Today</InputLabel>
                                    <Select labelId="locked-label"
                                    value={rainToday}
                                    name="lock"
                                    onChange={(e)=>setRainToday(e.target.value)}
                                    label="Account status"
                                    MenuProps={{
                                        anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                        },
                                        transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                        },
                                        getContentAnchorEl:null
                                    }}
                                    >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
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