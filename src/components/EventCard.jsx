import React from 'react';
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
});

class EventCard extends React.Component {
    state = {
        expanded: false,
        dateTime: '',
        open: false
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleOpen = () => {
        this.setState({ open: true });
        console.log('reserve was clicked')
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    getDate = () => {
        let str = this.state.dateTime;
        str.split('T');
        this.setState({
            dateTime: str
        })
    }

    render() {
        const { classes, title, dateTime, description, capacity, price } = this.props;

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

                                </Collapse>

                            </Grid>
                            <Grid item>
                                <Button color="secondary" >Reserve A Spot</Button>
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