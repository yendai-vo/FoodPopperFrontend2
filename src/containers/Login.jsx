import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  state = {
    jwt: '',
    email: '',
    password: '',
    error: false,
  }

  handleCloseDialog = () => {
    this.setState({ error: false })
  }


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  validateUser = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3001/user_token',
      data: {
      "auth": {
        "email": this.state.email,
        "password": this.state.password
      }
    }})
    .then(response => {
      localStorage.setItem('jwt', response.data.jwt)
      localStorage.setItem('loginmessage', 'true')

      axios.get('http://localhost:3001/auth', {headers: {'Authorization':`Bearer ${response.data.jwt}`}})
      .then(res => {
        localStorage.setItem('userId', res.data.id)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('bio', res.data.bio)
        localStorage.setItem('email', res.data.email)
        this.props.history.push("/home")
      })
    })
    .catch(error => {
      this.setState({error: true});
    })
  }

  

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} onSubmit={this.validateUser}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus
                  value={this.state.email}
                  onChange={this.handleInputChange}
                 />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
            </Button>
            </form>
            <Dialog
              open={this.state.error}
              onClose={this.handleCloseDialog}
            >
              <DialogTitle id="alert-dialog-title">Incorrect Email/Password</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please make sure that you entered correct information
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default (withStyles(styles)(Login));