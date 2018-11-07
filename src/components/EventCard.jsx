import React from 'react';
import axios from 'axios';
import Reservation from '../components/Reservation';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class EventCard extends React.Component {
  state = {
    expanded: false,
    dateTime: '',
    open: false,
    reservation: [],
    noOfTickets: 1,
    isActive: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenReservation = () => {
    this.setState({ open: true });
  };

  handleCloseReservation = () => {
    this.setState({ open: false });
  };

  getDate = () => {
    let str = this.state.dateTime;
    str.split('T');
    this.setState({
      dateTime: str
    })
  }

  handleChange = reservation => event => {
    this.setState({
      noOfTickets: event.target.value,
    });
  };

  handleReservationSubmit = (e) => {
    e.preventDefault()
    this.setState({
      isActive: true
    })
    // console.log('submit button was clicked')
    axios.post('http://localhost:3001/reservations', {
      "no_of_tickets": this.state.noOfTickets,
      "is_active": this.state.isActive,
      },
      {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
      }
    )
   
  }

  render() {
    const { classes, title, dateTime, description, capacity, price, venueName, venueAddress, venueCity, venueState, venueZipCode } = this.props;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src='https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography><br></br>
                <Typography gutterBottom>{description}</Typography><br></br>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>




                  <Typography >Date and Time: {dateTime}</Typography>
                  <Typography >Capacity: {capacity} seats</Typography>
                  <Typography >Price per seat: ${price}0</Typography>
                  <Typography >Venue: {venueName}</Typography>
                  <Typography >Address: {venueAddress}</Typography>
                  <Typography >{venueCity}, {venueState} {venueZipCode}</Typography>

                </Collapse>

              </Grid>
              <Grid item>
                <Button onClick={this.handleOpenReservation}>Reserve A Spot</Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Book Your Reservation Now!"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Reservation
                        title={title}
                        dateTime={dateTime}
                        price={price}
                        venueName={venueName}
                        venueAddress={venueAddress}
                        venueCity={venueCity}
                        venueState={venueState}
                        venueZipCode={venueZipCode}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <TextField
                      id="standard-number"
                      label="Number of Tickets"
                      value={this.state.noOfTickets}
                      onChange={this.handleChange('tickets')}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <Button onClick={this.handleCloseReservation} color="primary">Cancel
                                      </Button>
                    <Button type='submit' onClick={this.handleReservationSubmit} color="primary">Reserve</Button>

                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Grid item>
              {/* <Typography variant="subtitle1">$19.00</Typography> */}
            </Grid>
          </Grid>

        </Grid>
      </Paper>
    );

  }

}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);