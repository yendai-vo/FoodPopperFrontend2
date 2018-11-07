import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
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
    avatar: {
        backgroundColor: red[500],
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
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
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {title.charAt(0)}
                            </Avatar>
                        }
                        title={title}

                    />
                    <CardMedia
                        className={classes.media}
                        image='https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                    />
                    <CardContent>
                        <Typography paragraph>Date: {dateTime}
                        </Typography>
                        <Typography component="p">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {/* <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
                <ShareIcon /> */}
                        {/* </IconButton> */}
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
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Ticket Price:
                ${price}0/ per person
                </Typography>
                            <Typography paragraph>Event Capacity: {capacity} people
                </Typography>
                            <Button color="secondary" onClick={this.handleOpen}>Reserve A Spot</Button>

                <div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant="h6" id="modal-title">
                                Text in a modal
                    </Typography>
                            <Typography variant="subtitle1" id="simple-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                            <SimpleModalWrapped />
                        </div>
                    </Modal>
                </div>
                        </CardContent>
                    </Collapse>

                </Card>
            </div>
        );
    }
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(EventCard);

export default withStyles(styles)(EventCard);