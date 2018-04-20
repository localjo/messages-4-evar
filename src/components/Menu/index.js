import React from 'react';
import { withTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function Menu(props) {
  return (
    <div >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Messages
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withTheme()(Menu);