import React, { useState } from 'react';
import Input from '../../../UI/Input/Input';
import { faBirthdayCake, faCity, faEnvelope, faFont, faLock, faPhoneAlt, faVenusMars, } from '@fortawesome/free-solid-svg-icons'
import { checkValidity } from '../../../../Shared/HelperFunctions';
import styles from './Signup.module.css'
import Button from '../../../UI/Buttons/Button/Button';
import * as actions from '../../../../Store/Actions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../../UI/Spinner/Spinner';

const Signup = (props) => {
   const [state, setState] = useState({
      inputs: {
         name: {
            elementType: 'input',
            icon: faFont,
            elementConfig: {
               type: 'text',
               placeholder: 'Име'
            },
            value: '',
            validation: {
               required: true,
               minLength: 2,
               maxLength: 20
            },
            valid: false,
            touched: false
         },
         lastName: {
            elementType: 'input',
            icon: faFont,
            elementConfig: {
               type: 'text',
               placeholder: 'Фамилия'
            },
            value: '',
            validation: {
               required: true,
               minLength: 2,
               maxLength: 20
            },
            valid: false,
            touched: false
         },
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
         },
         confirmPassword: {
            elementType: 'input',
            icon: faLock,
            elementConfig: {
               type: 'password',
               placeholder: 'Повтори парола'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         },
         phoneNumber: {
            elementType: 'input',
            icon: faPhoneAlt,
            elementConfig: {
               type: 'text',
               placeholder: 'Телефонен номер'
            },
            value: '',
            validation: {
               required: true,
               isNumeric: true
            },
            valid: false,
            touched: false
         },
         birthdate: {
            elementType: 'input',
            icon: faBirthdayCake,
            elementConfig: {
               type: 'date',
               placeholder: 'Рождена дата'
            },
            value: '',
            validation: {
               required: true,
            },
            valid: false,
            touched: false
         },
         gender: {
            elementType: 'select',
            icon: faVenusMars,
            elementConfig: {
               options: [
                  { value: 'gender', displayValue: 'Пол', disabled: true, selected: true, hidden: true },
                  { value: 'MALE', displayValue: 'Мъж' },
                  { value: 'FEMALE', displayValue: 'Жена' }
               ],
               defaultValue: 'gender'
            },
            value: undefined,
            validation: {
               required: true
            },
            valid: true,
            touched: false
         },
         city: {
            elementType: 'select',
            icon: faCity,
            elementConfig: {
               options: [
                  { value: 'selectCity', displayValue: 'Избери град', disabled: true, selected: true, hidden: true },
                  { value: 'Sofia', displayValue: 'София' },
                  { value: 'Shumen', displayValue: 'Шумен' },
                  { value: 'Varna', displayValue: 'Варна' },
                  { value: 'Burgas', displayValue: 'Бургас' }
               ],
               defaultValue: 'selectCity'
            },
            value: undefined,
            validation: {
               required: true
            },
            valid: true,
            touched: true
         }
      },
      formIsValid: false
   })

   const inputChangedHandler = (event, inputName) => {
      const updatedInputs = {
         ...state.inputs,
         [inputName]: {
            ...state.inputs[inputName],
            value: event.target.value,
            valid: checkValidity(event.target.value, state.inputs[inputName].validation)
         }
      }
      let formIsValid = true;
      for (let inputIdentifier in updatedInputs) {

         formIsValid = updatedInputs[inputIdentifier].valid && formIsValid && updatedInputs[inputIdentifier].touched;
      }
      setState({
         inputs: updatedInputs,
         formIsValid: formIsValid
      })
   }

   const setTouchedHandler = (inputName) => {
      const toSet = {
         inputs: {
            ...state.inputs,
            [inputName]: {
               ...state.inputs[inputName],
               touched: true
            }
         },
         formIsValid: state.formIsValid
      };
      setState(toSet)
   }

   const submitHandler = (event) => {
      event.preventDefault()
      let data = {}
      for (let input in state.inputs) {
         data[input] = state.inputs[input].value
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
         blured={() => setTouchedHandler(formElement.id)} />)
   )


   if (props.loading) {
      form = <Spinner />
   }

   let errorMessage = null
   if (props.error) {
      errorMessage = (<p style={{ color: 'tomato' }}>{props.error}</p>)
   }

   if (props.isSignedUp) {
      return (<Redirect to='/login' />)
   }

   return (
      <div className={styles.MainDiv}>

         <div className={styles.Signup}>
            <h2 className={styles.Header}>Направи своята регистрация</h2>
            {errorMessage}
            <form onSubmit={submitHandler}>
               {form}
               <div style={{ marginTop: '20px', maxWidth: 160, margin: '0 auto' }}>
                  <Button
                     disabled={props.loading || !state.formIsValid}
                     buttonType='LogIn' submit  >Регистрирай се</Button>
               </div>
               <div className={styles.SignupText}>

               </div>
            </form>
         </div>
      </div>
   );
}


const mapStateToProps = state => {
   return {
      loading: state.auth.loading,
      error: state.auth.error,
      isSignedUp: state.auth.signedUp,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (data) => dispatch(actions.auth(data, true)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)


