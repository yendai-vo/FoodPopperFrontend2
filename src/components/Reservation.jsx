import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Reservation extends Component {
  render() {
    return (
      <div>
        <div>
            <Typography >Event: {this.props.title}</Typography>
            <Typography >Date & Time: {this.props.dateTime}</Typography>
            <Typography >Location: {this.props.venueName}<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.venueAddress}<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.venueCity}, {this.props.venueState} {this.props.venueZipCode}
            </Typography>
            <Typography >Seats Available: Yes</Typography>
        </div>

        <div>
            This is where the payment will be.
        </div>
      </div>
    )
  }
}
