import React from 'react';
import { withTheme } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

class Message extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Jo Sprague" >
              JS
            </Avatar>
          }
          title="Jo Sprague"
          subheader="12 minutes ago"
        />
        <CardContent>
          <Typography component="p">
            Yo me presento como Mr. Johnny Cash pero yo ni cash tengo.
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withTheme()(Message);