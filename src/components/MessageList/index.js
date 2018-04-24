import React from 'react';
import { withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Message from '../Message';

const getMessages = async function(pageToken) {
  const response = await fetch(
    `http://message-list.appspot.com/messages?limit=100${
      pageToken ? '&pageToken=' + pageToken : ''
    }`
  );
  return await response.json();
};

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      pageToken: null,
      messages: [],
      dismissed: []
    };
  }

  componentDidMount() {
    getMessages().then(res => {
      this.setState(Object.assign({}, this.state, res));
    });
  }

  dismissMessage(id) {
    this.setState({ dismissed: [...this.state.dismissed, id] });
  }

  getMoreMessages() {
    const { messages, pageToken } = this.state;
    getMessages(pageToken).then(res => {
      this.setState({
        pageToken: res.pageToken,
        messages: messages.concat(res.messages)
      });
    });
  }

  render() {
    const { dismissed, messages } = this.state;
    return (
      <React.Fragment>
        {messages
          .filter(msg => {
            return !dismissed.includes(msg.id);
          })
          .map(msg => {
            return (
              <Grid key={msg.id} item xs={12}>
                <Message
                  msg={msg}
                  dismissMessage={id => this.dismissMessage(id)}
                />
              </Grid>
            );
          })}
        <Button
          onClick={() => {
            this.getMoreMessages();
          }}>
          Get More Messages
        </Button>
      </React.Fragment>
    );
  }
}

export default withTheme()(MessageList);
