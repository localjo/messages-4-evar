import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Menu from './components/Menu';
import Message from './components/Message';

import deepPurple from 'material-ui/colors/deepPurple';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
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
