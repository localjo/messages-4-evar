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
      isLoading: false,
      count: 0,
      pageToken: null,
      messages: [],
      dismissed: []
    };
  }

  componentDidMount() {
    this.getMoreMessages();
    window.addEventListener('scroll', ()=>this.infiniteScroll());
  }

  infiniteScroll() {
    if (this.state.isLoading) return;
    const { innerHeight, scrollY } = window;
    const { offsetHeight } = document.body;
    const pxFromBottom = 10000;
    const lowestVisiblePoint = innerHeight + scrollY;
    const triggerPoint = offsetHeight - pxFromBottom;
    const isNearBottom = lowestVisiblePoint > triggerPoint;
    if (isNearBottom) {
      this.getMoreMessages();
    }
  }

  dismissMessage(id) {
    this.setState({ dismissed: [...this.state.dismissed, id] });
  }

  getMoreMessages() {
    const { messages, pageToken } = this.state;
    this.setState({ isLoading: true });
    getMessages(pageToken).then(res => {
      this.setState({
        isLoading: false,
        pageToken: res.pageToken,
        messages: messages.concat(res.messages)
      });
    });
  }

  render() {
    const { dismissed, messages, isLoading } = this.state;
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
        {isLoading ? (
          <Button
            fullWidth={true}
            disabled={true}
          >Loading messages...</Button>
        ) : null}
      </React.Fragment>
    );
  }
}

export default withTheme()(MessageList);
