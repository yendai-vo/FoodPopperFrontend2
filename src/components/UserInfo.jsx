import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  image: {
    float: 'left',
  },
  list: {
    float: 'right',
  }
});

class UserInfo extends React.Component {
  state = {
    open: false,
    username: this.props.username,
    email: this.props.email,
    bio: this.props.bio,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleEditSubmit = () => {
    console.log('edit was submitted')
    axios.patch(`http://localhost:3001/user/${this.props.userId}`,
    {
      'user':{
        'username': this.state.username,
        'email': this.state.email,
        'bio': this.state.bio,
      }
    },
    {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
    }
  )
    .then((user) => {
      this.props.editProfile(user.data)
    }).catch((error) => {
      console.log(error);
    })
    .then(this.handleClose)
  }

  render() {
    const { classes, username, email, bio } = this.props;
    return (
      <div className={classes.root}>
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt="complex" src='https://www.servedfromscratch.com/wp-content/uploads/2015/04/spoon-and-fork-png-fork-spoon-knife-300x300.png' />
        </ButtonBase>
        <List component="nav" className={classes.list}>
          <ListItem button>
            <ListItemText primary="Username:" />{username}
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary="Email:" />{email}
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bio:" />{bio}
          </ListItem>
          <Divider light />
        </List>
        <Button onClick={this.handleClickOpen} color="secondary">Edit Your Profile</Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <h1>Edit Your Profile</h1>
              <Paper className={classes.paper}>
                <form className={classes.form} onSubmit={this.createEvent}>
                  
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" name="username" autoFocus
                      onChange={this.handleEditChange}
                      value={this.state.username}
                    />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" name="email"
                      onChange={this.handleEditChange}
                      value={this.state.email}
                    />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth >
                    <InputLabel htmlFor="bio">Bio</InputLabel>
                    <Input id="bio" name="bio" multiline
                      onChange={this.handleEditChange}
                      value={this.state.bio}
                    />
                  </FormControl>
                </form>
              </Paper>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEditSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
}


UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);