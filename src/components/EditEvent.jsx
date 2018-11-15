import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

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
    }
  });
class EditEvent extends Component {

  
  state = {
    title: '',
    description: '',
    capacity: null,
    dateTime: '',
  }
  
  componentDidMount(){
    if(this.state.title.length < 1){
      this.setState({
        title: this.props.title,
        description: this.props.description,
        capacity: this.props.capacity,
      });
    }
  }

  handleEditChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleEditSubmit = e => {
    e.preventDefault();
    axios.patch(`http://localhost:3001/events/${this.props.id}`,
    {
      'event':{
        'title': this.state.title,
        'description': this.state.description,
        'capacity': this.state.capacity,
        'date_time': this.state.dateTime
      }
    },
    {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
    }
  )

    console.log('edit was submitted')
    // .then(this.handleClose)  
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <h1 className={classes.title}>Edit Your Poppin' Event Here!</h1>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={this.handleEditSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Event Title</InputLabel>
                <Input id="title" name="title" autoFocus
                  onChange={this.handleEditChange}
                  value={this.state.title}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input id="description" name="description" 
                  value={this.state.description}
                  onChange={this.handleEditChange}
                  multiline
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="capacity">Capacity</InputLabel>
                <Input id="capacity" name="capacity" 
                  onChange={this.handleEditChange}
                  value={this.state.capacity}
                  defaultValue='0'
                  type="number"
                />
              </FormControl>

              <FormControl required fullWidth>
                <TextField fullWidth
                  id="datetime-local"
                  label="Date and Time"
                  type="datetime-local"
                  name="date_time"
                  onChange={this.handleEditChange}
                  //value={this.props.dateTime}
                  defaultValue="2018-11-14T10:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button type='submit' color="primary">Submit Edit</Button>

            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

EditEvent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default (withStyles(styles)(EditEvent));
