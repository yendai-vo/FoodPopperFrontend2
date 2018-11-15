import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import green from '@material-ui/core/colors/green';

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  title: {
    textAlign: 'center',
  },
  alert: {
    backgroundColor: green[600]
  }
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

class ContactUs extends Component {
  state = {
    title: '',
    description: '',
    capacity: null,
    dateTime: '',
    open: false,
    Transition: null,
  }

  handleEditChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <h1 className={classes.title}>Leave us a message!</h1>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" name="name" autoFocus

                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email"
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="subject">Subject</InputLabel>
                <Input id="subject" name="subject"
                />
              </FormControl>

              <FormControl required fullWidth multiline>
                <TextField fullWidth
                  id="message"
                  label="message"
                  type="message"
                  name="message"
                  multiline
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleClick(TransitionUp)}
              >
                Submit
            </Button>
              <Snackbar
                className={classes.alert}
                variant="success"
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={this.state.Transition}
                
                message={<span id="message-id">Message Sent!</span>}
              />
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

ContactUs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(ContactUs));
