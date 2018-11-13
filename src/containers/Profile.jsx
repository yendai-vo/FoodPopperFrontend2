import React, { Component } from 'react'
import axios from 'axios';

export default class Profile extends Component {
  state = {
    reservations: [],
    events: [],
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    bio: localStorage.getItem('bio'),
    userId: localStorage.getItem('userId')
  }

  componentDidMount() {

      axios.get('http://localhost:3001/reservations', {headers: 
        {'Authorization':`Bearer ${localStorage.getItem('jwt')}`}
      })
      .then(res => {
        //debugger
        this.setState({
          reservations: res.data
        })
      });

      axios.get('http://localhost:3001/events', 
      {headers: 
        {'Authorization':`Bearer ${localStorage.getItem('jwt')}`}
      })
      .then(res => {
        //debugger
        this.setState({
          events: res.data
        })
      }, console.log(this.state))
      
  }

  render() {
    //console.log(this.state.reservations)
    //debugger
    return (
      <div>
        Hi, {this.state.username}!
        <p>Email: {this.state.email}</p>
        <p>Bio: {this.state.bio}</p>
        <p>My Current Reservations: </p>
        <div>
          {this.state.reservations.map(item => (
            <div>
              <p>----------------</p>
              <p>{item.title}</p>
              <p>{item.date_time}</p>
              <p>{item.venue.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
