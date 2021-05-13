import {Box, Typography} from '@material-ui/core'; 


export default function PredictionResult(props){

    return (
        <Box align="center">
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