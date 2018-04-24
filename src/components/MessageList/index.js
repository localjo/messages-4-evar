import React from 'react';
import { withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Message from '../Message';

const getMessages = async function (pageToken) {
  const response = await fetch(
    `http://message-list.appspot.com/messages${pageToken?'?pageToken='+pageToken:''}`,
  );
  return await response.json();
};

class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      pageToken: null,
      messages: [],
      dismissed: [],
    };
  }
  
  componentDidMount() {
    getMessages().then(data=>{
      this.setState(Object.assign({}, this.state, data));
    });
  };
  
  dismissMessage(id){
    this.setState({dismissed: [...this.state.dismissed, id]})
  };
  
  getMoreMessages() {
    const { pageToken } = this.state;
    getMessages(pageToken).then(data=>{
      this.setState(Object.assign({}, this.state, data));
    });
  };

  render() {
    const { dismissed, messages, pageToken } = this.state;
    return (
      <React.Fragment>
        {messages.filter(msg=>{
          return !dismissed.includes(msg.id);
        }).map(msg=>{
          return (
            <Grid key={msg.id} item xs={12}>
              <Message msg={msg} dismissMessage={(id)=>this.dismissMessage(id)} />
            </Grid>
          );
        })}
        <Button onClick={()=>{
          console.log('get more messages', pageToken);
          this.getMoreMessages();
        }}>Test</Button>
      </React.Fragment>
    );
  }
}

export default withTheme()(MessageList);
