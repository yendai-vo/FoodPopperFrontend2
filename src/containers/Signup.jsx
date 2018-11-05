import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    success: false,
  }  

//   handleSubmit = (e) => {
//     e.preventDefault()
//     const data = new FormData(e.target);

//     fetch("http://localhost:3001/api/v1/users", {
//       method: "POST",
//       body: data
//     })
//     .then(res => res.json())
//     .then(apidata => {
//       // debugger
//       localStorage.token = apidata.jwt
//       this.setState({
//         success: true
//       })
//     })
//     .then(() => 
//     this.props.history.push('/login'))
//   }

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
            <form className={classes.form} onSubmit={this.handleSubmit}>
  
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" 
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
                />
              </FormControl>
  
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="bio">Your Bio</InputLabel>
                <Input
                  name="bio"
                  multiline
                  rowsMax="4"
                  id="bio"
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