import React, { Component } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import Map from '../components/Map';

export default class Home extends Component {

  state = {
    events: [],
    filteredEvents: [],
    eventsFetched: false,
    welcomeMessage: localStorage.getItem('loginmessage') === "true",
    username: localStorage.getItem('username'),
    search: '',
  }

  componentDidMount() {
    axios.get('http://localhost:3001/events')
      .then(response => {
        // console.log(response.data)
        this.setState({
          events: response.data,
          eventsFetched: true,
        })
      })
      .catch(error => console.log(error))
  }


  handleCloseDialog = () => {
    this.setState({ welcomeMessage: false })
    localStorage.removeItem('loginmessage');
  }

  handleChange = (searchTerm) => {
    this.setState({
      search: searchTerm
    })
    
    if(this.state.search !== ''){
      this.setState({ filteredEvents: this.state.events.filter((event) => {
        return event.title.toLowerCase().includes(this.state.search.toLowerCase())
      })})
    } else {
      this.setState({ filteredEvents:this.state.events})
    }
  }

  filterEvents = () => {
    if(this.state.search !== ''){
      return this.state.events.filter((event) => {
        return event.title.toLowerCase().includes(this.state.search.toLowerCase())
      })
    } else {
      return this.state.events
    }
  }


  render() {
    axios.get('http://localhost:3001/events')
    .then(response => {
      if(this.state.events.length !== response.data.length){
      this.setState({
        events: response.data,
      })}
    })
    .catch(error => console.log(error))
    return (
      <div>
        <p>Welcome, {this.state.username}!</p>
        <SearchBar search={this.handleChange}/>
        <Dialog
          open={this.state.welcomeMessage}
          onClose={this.handleCloseDialog}
        >
          <DialogTitle id="alert-dialog-title">Welcome {this.state.username}!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Take a look at our upcoming events!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {this.filterEvents().map(item => (
          <div>
            {this.state.events ? 
              <EventCard
                id={item.id}
                title={item.title}
                dateTime={item.date_time}
                description={item.description}
                capacity={item.capacity}
                price={item.ticket_price}
                venueName={item.venue.name}
                venueAddress={item.venue.street_address}
                venueCity={item.venue.city}
                venueState={item.venue.state}
                venueZipCode={item.venue.zip_code}
              />
            : <p>Loading</p>}
          </div>
        ))}
        <Map 
          isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
        />
      </div>)

  }
}
