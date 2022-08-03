import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index'
import { withStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const classes = theme => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
   },
   alert: {
      width: '100%',
   },
});

class Snack extends Component {
   handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      this.props.setSnackbar(this.props.snackType, this.props.message, false)
   };
   render() {
      return (
         <div className={classes.root} >
            <Snackbar
               open={this.props.open}
               autoHideDuration={6000}
               onClose={this.handleClose}>
               <Alert
                  onClose={this.handleClose}
                  severity={this.props.snackType}
                  className={classes.alert}>
                  {this.props.message}
               </Alert>
            </Snackbar>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      open: state.snackbar.open,
      snackType: state.snackbar.snackType,
      message: state.snackbar.message
   }
}

const mapDispatchToProps = dispatch => {
   return {
      setSnackbar: (snackType, message, open) => dispatch(actions.setSnackbar(snackType, message, open)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes, { withTheme: true })(Snack));