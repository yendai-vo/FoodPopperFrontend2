import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';


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


class Events extends Component {

  state={
    title:"",
    description:"",
    capacity: 0,
    price: 0.00,
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createEvent = e => {
    axios.post('http://localhost:3001/events', 
      {
        "title": this.state.title,
        "description": this.state.description,
        "capacity": this.state.capacity,
        "ticket_price" : this.state.price
      },
      {headers: {'Authorization':`Bearer ${localStorage.getItem('jwt')}`}}
    )
    this.props.history.push("/home")
  }
  
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={this.createEvent}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input id="title" name="title" autoComplete="title" autoFocus
                  onChange={this.handleInputChange}
                  value={this.state.title}
                 />
              </FormControl>
              
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input id="description" name="description" autoComplete="description" autoFocus
                  onChange={this.handleInputChange}
                  value={this.state.description}
                 />
              </FormControl>
              
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="capacity">Capacity</InputLabel>
                <Input id="capacity" name="capacity" autoComplete="capacity" autoFocus
                  onChange={this.handleInputChange}
                  value={this.state.capacity}
                  type="number"
                 />
              </FormControl>
         
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input id="price" name="price" autoComplete="price" autoFocus
                  onChange={this.handleInputChange}
                  value={this.state.price}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  type="number"
                 />
              </FormControl>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Event
            </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

export default (withStyles(styles)(Events));
