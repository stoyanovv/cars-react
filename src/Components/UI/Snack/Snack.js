import React from 'react';
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

const Snack = (props) => {
   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      props.setSnackbar(props.snackType, props.message, false)
   };
   return (
      <div className={classes.root} >
         <Snackbar
            open={props.open}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert
               onClose={handleClose}
               severity={props.snackType}
               className={classes.alert}>
               {props.message}
            </Alert>
         </Snackbar>
      </div>
   );
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