import React from 'react'
import { Route, Redirect } from "react-router-dom";
import Auth from '../../Containers/Auth/Auth';

const AdminRoute = ({ component: Component, ...rest }) => {
   const isAdmin = Auth.isAdmin()
   return (
      <Route {...rest} render={props => (
         Auth.isUserAuthenticated() && isAdmin ? (
            <Component {...props} />
         ) : (
            <Redirect to={{
               pathname: '/',
               state: { from: props.location }
            }} />
         )
      )
      } />)
}
export default AdminRoute
