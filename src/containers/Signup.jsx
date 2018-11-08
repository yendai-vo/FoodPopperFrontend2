import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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
class Signup extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    bio: ''
  }  

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:3001/users/create',
      data: {
        "user": {
          "email": this.state.email,
          "password": this.state.password,
          "username": this.state.username,
          "bio": this.state.bio
        }
      }
    })
    this.props.history.push("/login")
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   const data = new FormData(e.target);

  //   fetch("http://localhost:3001/users/create", {
  //     method: "POST",
  //     body: data
  //   })
  //   .then(res => res.json())
  //   .then(apidata => {
  //     // debugger
  //     localStorage.token = apidata.jwt
  //     this.setState({
  //       success: true
  //     })
  //   })
  //   .then(() => 
  //   this.props.history.push('/login'))
  // }

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
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit} >
  
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input 
                value={this.state.username}
                onChange={this.handleChange}
                id="username" 
                name="username" 
                autoComplete="username" 
                autoFocus 
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormControl>
  
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="bio">Your Bio</InputLabel>
                <Input
                  name="bio"
                  multiline
                  rowsMax="4"
                  id="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // href='/login'
              >
                Sign Me Up!
              </Button>
            </form>
            <p>Already have an account? <a href='/login'>Login</a></p>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);