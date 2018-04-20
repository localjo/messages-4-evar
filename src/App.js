import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Menu from './components/Menu';
import Message from './components/Message';

import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: purple,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <div style={{ padding: 16, paddingTop: 72 }}>
      <Grid container spacing={8}>
        { [...Array(10)].map((item, i)=>{
          return (
            <Grid key={i} item xs={12}>
              <Message />
            </Grid>
          )
        }) }
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
