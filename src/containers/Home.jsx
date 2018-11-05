import React, { Component } from 'react'
import axios from 'axios';

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
        console.log(response)
        this.setState({
            events: response.data
        })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        My Home Page
      </div>
    )
  }
}
