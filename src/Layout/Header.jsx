import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    color: 'white',
  },
};

class ButtonAppBar extends Component {
  
  handleClick = () => {
    localStorage.clear();
    this.props.history.push('/login')
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar >
            {/* <IconButton className={classes.menuButton} color="secondary" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" color="white" className={classes.grow}>
              FoodPopper
            </Typography>
            <Button className={classes.button}><Link to="/home">Home</Link></Button>
            <Button ><Link to="/events">Create Event</Link></Button>
            <Button ><Link to="/profile">Profile</Link></Button>
            <Button ><Link to="/signup">SignUp</Link></Button>
            <Button ><Link to="/login">Login</Link></Button>
            <Button onClick={this.handleClick}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)) (withRouter(ButtonAppBar));

