import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// import Venue from '../components/Venue';


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
class Events extends Component {

  state = {
    title: '',
    description: '',
    capacity: null,
    price: 0.00,
    dateTime: "2018-11-14T10:30",
    image_url: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueState: '',
    venueZipCode: null,
    events: []
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  }

  // componentDidMount() {
  //   fetch("http://localhost:3001/events")
  //     .then(res => res.json())
  //     .then(data => this.setState({ events: data }));
  // }

  createEvent = e => {
    e.preventDefault();

    const data = new FormData(e.target);

    fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}` 
      },
      body: data

    })
    .then(res => this.props.history.push("/home", {eventsFetched: false}))
    // const data = new FormData(e.target);

    // axios.post('http://localhost:3001/venues',
    //   {
    //     "name": this.state.venueName,
    //     "street_address": this.state.venueAddress,
    //     "city": this.state.venueCity,
    //     "state": this.state.venueState,
    //     "zip_code": this.state.venueZipCode,
    //   },
    //   { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }
    // ).then(res => {
    //   console.log(this.state.image_url);
    //   axios.post('http://localhost:3001/events',
    //   {
    //     "title": this.state.title,
    //     "description": this.state.description,
    //     "capacity": this.state.capacity,
    //     "ticket_price": this.state.price,
    //     "date_time": this.state.dateTime,
    //     "venue_id": res.data.venue.id,
    //     "image_url": this.state.image_url
    //     // body: data
        
    //   },
    //   { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }
    // )
    // .then(res => this.props.history.push("/home", {eventsFetched: false})) 
    // })
  }

  getVenues = (e) => {
    e.preventDefault();

    axios.get('http://localhost:3001/venues')
      .then(response => {
        this.setState({
          venues: response.data
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { classes } = this.props;
    //console.log(this.state);
    return (
      <React.Fragment>
        <h1 className={classes.title}>Create Your Poppin' Event</h1>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
          <h1>Event Information </h1>
            <form className={classes.form} onSubmit={this.createEvent}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Event Title</InputLabel>
                <Input id="title" name="event[title]" autoComplete="title" autoFocus
                  onChange={this.handleInputChange}
                  value={this.state.title}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input id="description" name="event[description]" autoComplete="description"
                  onChange={this.handleInputChange}
                  value={this.state.description}
                  multiline
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="capacity">Capacity</InputLabel>
                <Input id="capacity" name="event[capacity]" autoComplete="capacity"
                  onChange={this.handleInputChange}
                  value={this.state.capacity}
                  type="number"
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="price">Price per Seat (Cannot be edited later on)</InputLabel>
                <Input id="price" name="event[ticket_price]" autoComplete="price"
                  onChange={this.handleInputChange}
                  value={this.state.price}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  type="number"
                />
              </FormControl>

              <FormControl required fullWidth>
                <TextField fullWidth
                  id="datetime-local"
                  label="Date and Time"
                  type="datetime-local"
                  name="event[date_time]"
                  onChange={this.handleInputChange}
                  value={this.state.dateTime}
                  // defaultValue="2018-11-14T10:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>

              <FormControl >
                  <Input id="image_url" name="event[image]" type="file"
                  onChange={this.handleInputChange}
                  value={this.state.image_url} />
              </FormControl>
                  <br></br>
                  <br></br>
                  <p>&nbsp;</p>
                  <hr></hr>
              <h1>Venue Information </h1>
              <p>(This information cannot be changed once submitted)</p>
              <FormControl required fullWidth>
                <InputLabel htmlFor="venueName">Name</InputLabel>
                <Input id="venueName" name="event[venue_attributes][name]" autoComplete="venueName"
                  onChange={this.handleInputChange}
                  value={this.state.venueName}
                />
              </FormControl>

              <FormControl required fullWidth>
                <InputLabel htmlFor="venueAddress">Address</InputLabel>
                <Input id="venueAddress" name="event[venue_attributes][street_address]" autoComplete="venueAddress"
                  onChange={this.handleInputChange}
                  value={this.state.venueAddress}
                />
              </FormControl>

              <FormControl required fullWidth>
                <InputLabel htmlFor="venueCity">City</InputLabel>
                <Input id="venueCity" name="event[venue_attributes][city]" autoComplete="venueCity"
                  onChange={this.handleInputChange}
                  value={this.state.venueCity}
                />
              </FormControl>

              <FormControl required fullWidth>
                <InputLabel htmlFor="venueState">State</InputLabel>
                <Input id="venueState" name="event[venue_attributes][state]" autoComplete="venueState"
                  onChange={this.handleInputChange}
                  value={this.state.venueState}
                />
              </FormControl>

              <FormControl required fullWidth>
                <InputLabel htmlFor="venueZipCode">Zip Code</InputLabel>
                <Input id="venueZipCode" name="event[venue_attributes][zip_code]" autoComplete="venueZipCode"
                  onChange={this.handleInputChange}
                  value={this.state.venueZipCode}
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

Events.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Events));
