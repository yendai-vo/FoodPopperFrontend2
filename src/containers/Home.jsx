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


export default class Home extends Component {

  state = {
    events: [],
    welcomeMessage: localStorage.getItem('loginmessage') === "true",
    username: localStorage.getItem('username'),
    search: '',
  }

  componentDidMount() {
    axios.get('http://localhost:3001/events')
      .then(response => {
        console.log(response.data)
        this.setState({
          events: response.data
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
    },console.log(searchTerm))
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
        {this.state.events.map(item => (
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
                events={this.filterEvents()}
              />
            : <p>Loading</p>}
          </div>
        ))}
      </div>)

  }
}
