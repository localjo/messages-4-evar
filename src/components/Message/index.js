import React from 'react';
import { withTheme } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { defineSwipe, Draggable, Swipeable } from 'react-touch-draggable';

const threshold = 100;
const swipe = defineSwipe({ swipeDistance: threshold });

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: 0 };
  }

  handleDrag({dx}) {
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
    const { author, content, id, updated } = this.props.msg;
    return (
      <Swipeable config={swipe}>
        <Draggable
          onDragEnd={() => this.handleDragEnd()}
          onDrag={(obj, deltas)=> this.handleDrag(deltas)}
          position={{ left: left }}
          style={{ translateX: 0 }}>
          {({ dx }) => {
            const isOverThreshold = dx > threshold;
            const opacity = isOverThreshold ? 0.5 : 1;
            dx = dx > 0 ? dx : 0; // Only allow dragging to the right
            return (
              <div style={{ transform: `translateX(${left}px)`, opacity }}>
                <Card>
                  <CardHeader
                    style={{ paddingBottom: 0 }}
                    avatar={<Avatar aria-label="Jo Sprague">JS</Avatar>}
                    title={author.name}
                    subheader="12 minutes ago"
                  />
                  <CardContent style={{ padding: 16 }}>
                    <Typography component="p">
                      Yo me presento como Mr. Johnny Cash pero yo ni cash tengo.
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          }}
        </Draggable>
      </Swipeable>
    );
  }
}

export default withTheme()(Message);
