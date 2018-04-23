import React, { Timeout } from 'react';
import ReactDOM from "react-dom";
import { createResource, createCache } from "simple-cache-provider";
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Menu from './components/Menu';
import Message from './components/Message';

import deepPurple from 'material-ui/colors/deepPurple';

const cache = createCache();

const getMessages = createResource(() => {
  return new Promise(resolve => {
    fetch('http://message-list.appspot.com/messages').then((res)=>{
      res.json().then(body=>{
        resolve(body);
      });
    });
  });
});

class MessageList extends React.Component {
  render() {
    const data = getMessages(cache);
    const { dismissMessage, filter } = this.props;
    return (
      <React.Fragment>
      {data.messages.filter(msg=>{
        return !filter.exclude.includes(msg.id);
      }).map(msg=>{
        return (
          <Grid key={msg.id} item xs={12}>
            <Message msg={msg} dismissMessage={(id)=>dismissMessage(id)} />
          </Grid>
        );
      })}
      </React.Fragment>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
});

class App extends React.Component {
  state = {
    showHello: false,
    loadingIndicator: false,
    dismissed: [],
  };
  
  requestData = () => {
    this.setState({loadingIndicator: true});
    ReactDOM.unstable_deferredUpdates(() => {
      this.setState({loadData: true});
    });
  };
  
  componentDidMount() {
    this.requestData();
  };
  
  dismissMessage(id){
    this.setState({dismissed: [...this.state.dismissed, id]})
  };
  
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Menu />
        <div style={{ padding: 16, paddingTop: 72, overflowX: 'hidden' }}>
          <Grid container spacing={8}>
            <Timeout ms={1000}>
              {didTimeout => {
                return didTimeout ? (
                  <span>Loading...</span>
                ) : (
                  <MessageList filter={{exclude: this.state.dismissed}} dismissMessage={(id)=>this.dismissMessage(id)} />
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
