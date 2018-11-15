import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
  navbar:{
    background:'#b6f5b6',
  },
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
    color: '#bb0000',
  },
  link: {
    color: '#bb0000',
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active':{
      color: '#bb0000'
    }
  }
};

class ButtonAppBar extends Component {
  
  handleLogoutClick = () => {
    localStorage.clear();
    this.props.history.push('/login')
  }

  render(){
    const { classes } = this.props;
    const jwt = localStorage.getItem("jwt");
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.navbar} >
            {/* <IconButton className={classes.menuButton} color="secondary" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" color="white" className={classes.grow}>
            <Link className={classes.link} to="/">FoodPopper</Link>
            </Typography>
            {jwt && <Button className={classes.button}><Link className={classes.link} to="/">Home</Link></Button>}
            {jwt && <Button className={classes.button} ><Link className={classes.link} to="/events">Create Event</Link></Button>}
            {jwt && <Button className={classes.button} ><Link className={classes.link} to="/profile">Profile</Link></Button>}
            {!jwt && <Button className={classes.button} ><Link className={classes.link}to="/signup">SignUp</Link></Button>}
            {!jwt && <Button className={classes.button} ><Link className={classes.link}to="/login">Login</Link></Button>}
            {jwt && <Button className={classes.button} onClick={this.handleLogoutClick}>Logout</Button>}
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

