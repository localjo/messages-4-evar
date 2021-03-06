import React from 'react';
import { withTheme } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { Draggable } from 'react-touch-draggable';
import moment from 'moment-es6';

const threshold = 100;

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: 0 };
  }

  handleDrag({dx}) {
    dx = dx > 0 ? dx : 0; // Only allow dragging to the right
    this.setState({ left: dx });
  }

  handleDragEnd() {
    const { left } = this.state;
    const { dismissMessage, msg } = this.props;
    if (left < threshold) {
      this.setState({ left: 0 });
    } else {
      dismissMessage(msg.id);
    }
  }

  render() {
    const { left } = this.state;
    const { author, content, updated } = this.props.msg;
    const photoUrl = '//message-list.appspot.com'+author.photoUrl;
    return (
      <Draggable
        onDragEnd={() => this.handleDragEnd()}
        onDrag={(obj, deltas)=> this.handleDrag(deltas)}
        position={{ left: left }}
        style={{ translateX: 0 }}>
        {({ dx }) => {
          const isOverThreshold = dx > threshold;
          const opacity = isOverThreshold ? 0.5 : 1;
          return (
            <div style={{ transform: `translateX(${left}px)`, opacity }}>
              <Card>
                <CardHeader
                  style={{ paddingBottom: 0 }}
                  avatar={<Avatar src={photoUrl} aria-label={author.name}></Avatar>}
                  title={author.name}
                  subheader={moment(updated).fromNow()}
                />
                <CardContent style={{ padding: 16 }}>
                  <Typography component="p">
                    {content}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default withTheme()(Message);
