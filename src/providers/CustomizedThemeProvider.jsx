import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';

const styles={
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
        //color: "#fff",
        //backgroundColor: '#424242',
      }
    },
  },
  typography: {
      fontSize: 14,
       //https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
       fontFamily: [
        '"Helvetica"',
         '"Verdana"',
        '"Arial"',
        '"Times"',
        'sans-serif',
        'serif',
      ].join(','),
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary:{
      main: '#388e3c',
    },
    background: {
      default: "#fff",
      paper:"#fff"
    },
  },
};

const theme = createMuiTheme(styles);

export default function CustomizedThemeProvider (props){

      return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
          </ThemeProvider>
      );
    
}