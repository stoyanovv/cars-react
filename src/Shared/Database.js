import React, { Component } from 'react';
import Data from '../Data/Data'
import Auth from '../Components/Pages/Auth/Auth'
import * as actions from '../Store/Actions/index'
import { connect } from 'react-redux';

class Database extends Component {
   state = {
      sportValue: 'tennis'
   }

   submitHandler = (event) => {
      event.preventDefault()
      Data.post('addsport/' + localStorage.getItem('userId'), {
         sportValue: this.state.sportValue
      }, Auth.isUserAuthenticated())
         .then(res => {
            if (res.success) {
               this.props.setSnackbar('success', res.message)
            } else {
               this.props.setSnackbar('error', res.message)
            }
         })
   }

   changeHandler = (event) => {
      this.setState({ sportValue: event.target.value })
   }

   render() {
      return (
         <div>
            <form onSubmit={this.submitHandler}>
               <select
                  value={this.state.sportValue}
                  onChange={this.changeHandler}>
                  <option>tennis</option>
                  <option>tableTennis</option>
                  <option>football</option>
               </select>
               <button type='submit'>ИЗБЕРИ СПОРТ</button>
            </form>
         </div>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      setSnackbar: (type, message, open) => dispatch(actions.setSnackbar(type, message, open)),
   }
}

export default connect(null, mapDispatchToProps)(Database)