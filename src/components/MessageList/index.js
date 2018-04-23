import React from 'react';
import ReactDOM from 'react-dom';
import { withTheme } from 'material-ui/styles';
import { createResource, createCache } from 'simple-cache-provider';
import Grid from 'material-ui/Grid';
import Message from '../Message';

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
  state = {
    showHello: false,
    loadingIndicator: false,
    dismissed: [],
  };
  
  componentDidMount() {
    this.requestData();
  };
  
  requestData = () => {
    this.setState({loadingIndicator: true});
    ReactDOM.unstable_deferredUpdates(() => {
      this.setState({loadData: true});
    });
  };
  
  dismissMessage(id){
    this.setState({dismissed: [...this.state.dismissed, id]})
  };

  render() {
    const data = getMessages(cache);
    const { dismissed } = this.state;
    return (
      <React.Fragment>
        {data.messages.filter(msg=>{
          return !dismissed.includes(msg.id);
        }).map(msg=>{
          return (
            <Grid key={msg.id} item xs={12}>
              <Message msg={msg} dismissMessage={(id)=>this.dismissMessage(id)} />
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }
}

export default withTheme()(MessageList);
