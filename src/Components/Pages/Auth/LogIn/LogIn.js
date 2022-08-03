import React, { Component } from 'react';
import Input from '../../../UI/Input/Input';
import { faEnvelope, faLock, } from '@fortawesome/free-solid-svg-icons'
import { checkValidity } from '../../../../Shared/HelperFunctions';
import { Link, Redirect } from 'react-router-dom';
import styles from './LogIn.module.css'
import Button from '../../../UI/Buttons/Button/Button';
import * as actions from '../../../../Store/Actions'
import { connect } from 'react-redux';
import Spinner from '../../../UI/Spinner/Spinner'

class LogIn extends Component {
   state = {
      inputs: {
         email: {
            elementType: 'input',
            icon: faEnvelope,
            elementConfig: {
               type: 'email',
               placeholder: 'Електронна поща'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         password: {
            elementType: 'input',
            icon: faLock,
            elementConfig: {
               type: 'password',
               placeholder: 'Парола'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         }
      },
      formIsValid: false
   }

   inputChangedHandler = (event, inputName) => {
      const updatedInputs = {
         ...this.state.inputs,
         [inputName]: {
            ...this.state.inputs[inputName],
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.inputs[inputName].validation),
            touched: true
         }
      }
      let formIsValid = true;
      for (let inputIdentifier in updatedInputs) {

         formIsValid = updatedInputs[inputIdentifier].valid && formIsValid && updatedInputs[inputIdentifier].touched;
      }
      this.setState({
         inputs: updatedInputs,
         formIsValid: formIsValid
      })
   }

   submitHandler = (event) => {
      event.preventDefault()
      let data = {
         email: this.state.inputs.email.value,
         password: this.state.inputs.password.value
      }
      this.props.onAuth(data)
   }

   render() {
      const formElementsArray = [];
      for (let key in this.state.inputs) {
         formElementsArray.push({
            id: key,
            config: this.state.inputs[key]
         });
      }

      let form = formElementsArray.map(formElement => (
         <Input
            name={formElement.id}
            key={formElement.id}
            icon={formElement.config.icon}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
      ))

      if (this.props.loading) {
         form = <Spinner />
      }

      let errorMessage = null
      if (this.props.error) {
         errorMessage = (<p style={{ color: 'tomato' }}>{this.props.error}</p>)
      }
      let message = null
      if (this.props.message) {
         message = (<p style={{ color: '#73C56D' }}>{this.props.message}</p>)
      }

      if (this.props.isAuthenticated) {
         return (<Redirect to='/' />)
      }

      return (
         <div className={styles.MainDiv}>
            <div className={styles.LogIn}>
               <h2 className={styles.Header}>Влез и намери своята кола</h2>
               {errorMessage}
               {message}
               <form onSubmit={this.submitHandler}>
                  {form}
                  <div style={{ marginTop: '20px', maxWidth: 100, margin: '0 auto' }}>
                     <Button
                        buttonType='LogIn'
                        submit
                        disabled={this.props.loading}>Вход</Button>
                  </div>
                  {this.props.isSignedUp ? null : <div className={styles.RegisterText}>
                     <Link style={{ color: '#155374' }} to='/signup'>
                        Все още нямаш акаунт? Създай го сега!
                  </Link>
                  </div>}
               </form>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      isSignedUp: state.auth.signedUp,
      message: state.auth.message
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (data) => dispatch(actions.auth(data, false)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);


