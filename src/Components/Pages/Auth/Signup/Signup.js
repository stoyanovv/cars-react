import React, { Component } from 'react';
import Input from '../../../UI/Input/Input';
import { faBirthdayCake, faCity, faEnvelope, faFont, faLock, faPhoneAlt, faVenusMars, } from '@fortawesome/free-solid-svg-icons'
import { checkValidity } from '../../../../Shared/HelperFunctions';
import styles from './Signup.module.css'
import Button from '../../../UI/Buttons/Button/Button';
import * as actions from '../../../../Store/Actions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../../UI/Spinner/Spinner';

class Signup extends Component {
   state = {
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
                  { value: '', displayValue: 'Пол', disabled: true, selected: true, hidden: true },
                  { value: 'MALE', displayValue: 'Мъж' },
                  { value: 'FEMALE', displayValue: 'Жена' }
               ]
            },
            value: undefined,
            validation: {
               required: true
            },
            valid: true
         },
         city: {
            elementType: 'select',
            icon: faCity,
            elementConfig: {
               options: [
                  { value: '', displayValue: 'Избери град', disabled: true, selected: true, hidden: true },
                  { value: 'Sofia', displayValue: 'София' },
                  { value: 'Shumen', displayValue: 'Шумен' },
                  { value: 'Varna', displayValue: 'Варна' },
                  { value: 'Burgas', displayValue: 'Бургас' }
               ]
            },
            value: undefined,
            validation: {
               required: true
            },
            valid: true
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
      let data = {}
      for (let input in this.state.inputs) {
         data[input] = this.state.inputs[input].value
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
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />)
      )


      if (this.props.loading) {
         form = <Spinner />
      }

      let errorMessage = null
      if (this.props.error) {
         errorMessage = (<p style={{ color: 'tomato' }}>{this.props.error}</p>)
      }

      if (this.props.isSignedUp) {
         return (<Redirect to='/login' />)
      }

      return (
         <div className={styles.MainDiv}>

            <div className={styles.Signup}>
               <h2 className={styles.Header}>Направи своята регистрация</h2>
               {errorMessage}
               <form onSubmit={this.submitHandler}>
                  {form}
                  <div style={{ marginTop: '20px', maxWidth: 160, margin: '0 auto' }}>
                     <Button
                        disabled={this.props.loading || !this.state.formIsValid}
                        buttonType='LogIn' submit  >Регистрирай се</Button>
                  </div>
                  <div className={styles.SignupText}>

                  </div>
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
      isSignedUp: state.auth.signedUp,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (data) => dispatch(actions.auth(data, true)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)


