import React, { Component } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EventCard from '../components/EventCard';

export default class Home extends Component {

  state = {
    events: [],
    welcomeMessage: localStorage.getItem('loginmessage') === "true",
    username: localStorage.getItem('username'),
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
    this.setState({welcomeMessage: false})
    localStorage.removeItem('loginmessage');
  }


  render() {
    return (
      <div>
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
        </div>
      ))}
    </div>)
    
  }
}
