import React, { Timeout } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Menu from './components/Menu';
import MessageList from './components/MessageList';

import deepPurple from 'material-ui/colors/deepPurple';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Menu />
        <div style={{ padding: 16, paddingTop: 72, overflowX: 'hidden' }}>
          <Grid container spacing={8}>
            <Timeout ms={1000}>
              {didTimeout => {
                return didTimeout ? (<span>Loading...</span>) : (
                  <MessageList />
                );
              }}
            </Timeout>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
