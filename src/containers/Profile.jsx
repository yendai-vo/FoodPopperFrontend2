import React, { Component } from 'react'
import axios from 'axios';

export default class Profile extends Component {
  state = {
    reservations: [],
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
        this.setState({
          reservations: res.data
        })
      })
  }

  render() {
    return (
      <div>
        Hi, {this.state.username}!
        <p>Email: {this.state.email}</p>
        <p>Bio: {this.state.bio}</p>
        <p>My Current Reservations: </p>
        <div>
          {this.state.reservations.map(item => (
            <div>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
