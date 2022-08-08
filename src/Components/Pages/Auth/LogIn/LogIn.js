import React, { useState } from 'react';
import Input from '../../../UI/Input/Input';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { checkValidity } from '../../../../Shared/HelperFunctions';
import { Link, Redirect } from 'react-router-dom';
import styles from './LogIn.module.css'
import Button from '../../../UI/Buttons/Button/Button';
import * as actions from '../../../../Store/Actions'
import { connect } from 'react-redux';
import Spinner from '../../../UI/Spinner/Spinner'

const LogIn = (props) => {
   const [state, setState] = useState({
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
      }
   });

   const inputChangedHandler = (event, inputName) => {
      const updatedInputs = {
         ...state.inputs,
         [inputName]: {
            ...state.inputs[inputName],
            value: event.target.value,
            valid: checkValidity(event.target.value, state.inputs[inputName].validation)
         }
      }
      setState({
         inputs: updatedInputs
      });
   }

   const inputValidateHandler = (inputName) => {
      setState({
         inputs: {
            ...state.inputs,
            [inputName]: {
               ...state.inputs[inputName],
               touched: true
            }
         }
      });
   }

   const submitHandler = (event) => {
      event.preventDefault()
      let data = {
         email: state.inputs.email.value,
         password: state.inputs.password.value
      }
      props.onAuth(data)
   }

   const formElementsArray = [];
   for (let key in state.inputs) {
      formElementsArray.push({
         id: key,
         config: state.inputs[key]
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
         changed={(event) => inputChangedHandler(event, formElement.id)}
         blured={() => inputValidateHandler(formElement.id)} />
   ))

   if (props.loading) {
      form = <Spinner />
   }

   let errorMessage = null
   if (props.error) {
      errorMessage = (<p style={{ color: 'tomato' }}>{props.error}</p>)
   }
   let message = null
   if (props.message) {
      message = (<p style={{ color: '#73C56D' }}>{props.message}</p>)
   }

   if (props.isAuthenticated) {
      return (<Redirect to='/' />)
   }

   return (
      <div className={styles.MainDiv}>
         <div className={styles.LogIn}>
            <h2 className={styles.Header}>Влез и намери своята кола</h2>
            {errorMessage}
            {message}
            <form onSubmit={submitHandler}>
               {form}
               <div style={{ marginTop: '20px', maxWidth: 100, margin: '0 auto' }}>
                  <Button
                     buttonType='LogIn'
                     submit
                     disabled={props.loading}>Вход</Button>
               </div>
               {props.isSignedUp ? null : <div className={styles.RegisterText}>
                  <Link style={{ color: '#155374' }} to='/signup'>
                     Все още нямаш акаунт? Създай го сега!
                  </Link>
               </div>}
            </form>
         </div>
      </div>
   );
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


