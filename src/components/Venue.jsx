import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class Venue extends Component {
  state = {
    venues: [],
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueState: '',
    venueZipCode: null,
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createVenue = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/venues',
      {
        "name": this.state.venueName,
        "street_address": this.state.venueAddress,
        "city": this.state.venueCity,
        "state": this.state.venueState,
        "zip_code": this.state.venueZipCode,
      },
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }
    )
  }

  render() {
    return (
      <React.Fragment>
        <form>
          <FormControl required fullWidth>
            <InputLabel htmlFor="venueName">Name</InputLabel>
            <Input id="venueName" name="venueName" autoComplete="venueName"
              onChange={this.handleInputChange}
              value={this.state.venueName}
            />
          </FormControl>

          <FormControl required fullWidth>
            <InputLabel htmlFor="venueAddress">Address</InputLabel>
            <Input id="venueAddress" name="venueAddress" autoComplete="venueAddress"
              onChange={this.handleInputChange}
              value={this.state.venueAddress}
            />
          </FormControl>

          <FormControl required fullWidth>
            <InputLabel htmlFor="venueCity">City</InputLabel>
            <Input id="venueCity" name="venueCity" autoComplete="venueCity"
              onChange={this.handleInputChange}
              value={this.state.venueCity}
            />
          </FormControl>

          <FormControl required fullWidth>
            <InputLabel htmlFor="venueState">State</InputLabel>
            <Input id="venueState" name="venueState" autoComplete="venueState"
              onChange={this.handleInputChange}
              value={this.state.venueState}
            />
          </FormControl>

          <FormControl required fullWidth>
            <InputLabel htmlFor="venueZipCode">Zip Code</InputLabel>
            <Input id="venueZipCode" name="venueZipCode" autoComplete="venueZipCode"
              onChange={this.handleInputChange}
              value={this.state.venueZipCode}
            />
          </FormControl>
          <Button
            onClick={this.createVenue}
            variant="contained"
            color="secondary"
          >
            Add Venue
          </Button>
        </form>
      </React.Fragment>
    )
  }
}
