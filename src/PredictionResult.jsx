import {Box, Typography} from '@material-ui/core'; 
import Message from "./Message";


export default function PredictionResult(props){

    return (
        <Box align="center">
            {props.result.subset&&<Message severity="warning">Due to memory restrictions for hobby accounts on Heroku, the model on the backend is currently only trained with a sample size {props.result.subset}. Please run the application on localhost and set the parameter 'MAX_ROWS' to 'None' in the file named 'main.py' if you want to use a model trained with the whole dataset!</Message>}

            {!props.result&&<Typography variant="h6" color="textSecondary">
                No prediction loaded yet
            </Typography>}
            {!!props.result&&<Typography variant="h6" color="textSecondary">Will there be rain tomorrow?</Typography>}
            <Typography variant="h2">
                {props.result.rainNextDay}
            </Typography>

        </Box>


    )
}