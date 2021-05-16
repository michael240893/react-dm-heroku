import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography, Tooltip, Paper, Popper, ClickAwayListener, List, ListItem, ListItemText } from '@material-ui/core';
import MainContainer from './MainContainer';
import PredictionComponent from './PredictionComponent';
import AppInfoComponent from './AppInfoComponent';
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionIcon from '@material-ui/icons/Description';

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
  },
  right:{
      flex:1
  },
  popper:{
    zIndex:1500,
  }

}));


function Menu (props) {
    return (
        <ClickAwayListener onClickAway={props.onClickAway}>
            <Popper className={props.className}
                placement={props.placement}
                open={true}
                anchorEl={props.anchorEl}
            >
                <Paper className={props.className} square elevation={4} >
                    {props.children}
                </Paper>
            </Popper>
        </ClickAwayListener>
    )
}

const FLASK_BACKEND_REPO_URL="https://github.com/michael240893/flask-heroku";
const REACT_FRONEND_REPO_URL="https://github.com/michael240893/react-dm-heroku";

export default function MainComponent(props){

    const classes=useStyles();

    const menuRef=React.useRef();
    const [menuOpen, setMenuOpen]=React.useState(false);


    const openRepository=(url)=>{
        setMenuOpen(false)
        window.open(url);
    }

    const openModel=()=>{
        window.open(process.env.PUBLIC_URL+"/model.txt")
    }

    

    return(
        <div>
            <AppBar >
                <Toolbar>
                    <Typography variant="h5">
                        Weather Australia
                    </Typography>
                    <div className={classes.right}/>
                    <Tooltip title="Open Model Tree">
                        <IconButton onClick={()=>openModel()} ref={menuRef} color="inherit"><DescriptionIcon/></IconButton>
                    </Tooltip>
                    <Tooltip title="Source Code">
                        <IconButton onClick={()=>setMenuOpen(true)} ref={menuRef} color="inherit"><GitHubIcon/></IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>    
            <AppInfoComponent/>   

            <MainContainer>
                <Typography className={classes.header} variant="h4">Prediction</Typography>  
  
                <PredictionComponent
                />
                

                {menuOpen&&<Menu
                className={classes.popper}
                placement={"bottom-end"}
                anchorEl={menuRef.current}
                onClickAway={()=>setMenuOpen(false)}>
                    <List>
                        <ListItem button onClick={()=>openRepository(FLASK_BACKEND_REPO_URL)}>
                            <ListItemText disableTypography primary="Github Repository - Flask Backend"> </ListItemText>
                        </ListItem>
                        <ListItem button onClick={()=>openRepository(REACT_FRONEND_REPO_URL)}>
                            <ListItemText disableTypography primary="Repository React - React Frontend"> </ListItemText>
                        </ListItem>
                    </List>
            </Menu>}
    
            </MainContainer>  

        </div>

    )

}