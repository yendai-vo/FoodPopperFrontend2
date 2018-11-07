import React, { Component } from 'react'
import axios from 'axios';
import EventCard from '../components/EventCard';

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
        events: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/events')
    .then(response => {
        // console.log(response.data)
        this.setState({
            events: response.data
        })
    })
    .catch(error => console.log(error))
  }

  render() {
    // console.log(this.state.events)
    return this.state.events.map(item => (
      <div>
      
        <EventCard 
          id={item.id}
          title={item.title}
          dateTime={item.date_time}
          description={item.description}
          capacity={item.capacity}
          price={item.ticket_price}
        />
      </div>
    ))
  }
}
