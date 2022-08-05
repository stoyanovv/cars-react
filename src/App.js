import React, { useEffect } from 'react';
import Layout from './HOC/Layout/Layout';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/index'
import Routes from './HOC/Routes/Routes'
import Snack from './Components/UI/Snack/Snack'

const App = (props) => {
   useEffect(() => {
      props.onTryAutoSignIn()
   }, []);

   return (
      <div>
         <Layout>
            <Routes isAuth={props.isAuthenticated} />
         </Layout>
         <Snack />
      </div>
   )
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onTryAutoSignIn: () => dispatch(actions.authCheckState()),
      setSnackbar: (type, message, open) => dispatch(actions.setSnackbar(type, message, open)),
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));