import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});
 
class SearchBar extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div>
        <TextField
          id="outlined-search"
          label="Search Events"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={(e) => this.props.search(e.target.value)}
        />
      </div>
      
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);

