import React, { Component } from 'react'
import axios from 'axios';
import ReservationCard from '../components/ReservationCard';
import UserInfo from '../components/UserInfo';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Profile extends Component {
  state = {
    reservations: [],
    events: [],
    expanded: false,
    value: 0,
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    bio: localStorage.getItem('bio'),
    userId: localStorage.getItem('userId')
  }

  componentDidMount() {
    axios.get('http://localhost:3001/reservations',
      {
        headers:
          { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
      })
      .then(res => {
        this.setState({
          reservations: res.data
        })
      });
  }

  editProfile= user => {
    localStorage.setItem('username', user.username)
    localStorage.setItem('email', user.email)
    localStorage.setItem('bio', user.bio)
    this.setState(user)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    console.log(this.state.reservations)
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.tabRoot}>
      Welcome, {this.state.username}!
      
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Profile" />
            <Tab label="Your Reservations" />
            <Tab label="Contact Us" />
          </Tabs>
        </AppBar>
        {value === 0 && 
        <TabContainer>
          <UserInfo 
            username={this.state.username}
            email={this.state.email}
            bio={this.state.bio}
            userId={this.state.userId}
            editProfile={this.editProfile}
          />
        </TabContainer>}

        {value === 1 && <TabContainer>
          {this.state.reservations.map(item => (
          <ReservationCard 
            title={item.title}
            image={item.image_url}
            dateTime={item.date_time}
            venueName={item.venue.name}
            venueAddress={item.venue.street_address}
            venueCity={item.venue.city}
            venueState={item.venue.state}
            venueZipCode={item.venue.zip_code}
          />))}
        </TabContainer>}

        {value === 2 && <TabContainer>
          Contact Us!
        </TabContainer>}
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);