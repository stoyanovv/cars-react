import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './Input.module.css'

const Input = (props) => {
   const defaultIcon = faEnvelope
   let inputElement = null
   const inputClasses = [styles.Input]


   const inputContainer = [styles.TwoContainers]
   if (props.invalid && props.shouldValidate && props.touched) {
      inputContainer.push(styles.Invalid)
   }

   let validationError = null;
   if (props.invalid && props.touched) {
      switch (props.name) {
         case 'name': validationError = 'Името трябва да съдържа между 2 и 20 символа.'; break;
         case 'lastName': validationError = 'Фамилията трябва да съдържа между 2 и 20 символа.'; break;
         case 'email': validationError = 'Трябва да се посочи валиден имейл адрес.'; break;
         case 'password': validationError = 'Паролата трябва да е повече от 6 символа и поне една цифра.'; break;
         case 'confirmPassword': validationError = 'Паролата трябва да е повече от 6 символа и поне една цифра.'; break;
         case 'phone': validationError = 'Трябва да се посочи валиден телефонен номер.'; break;
         case 'date': validationError = 'Трябва да се посочи валидна рождена дата.'; break;
         case 'gender': validationError = 'Трябва да се посочи валиден пол'; break;
         case 'city': validationError = 'Трябва да се посочи валиден град'; break;
         // 
         case 'make': validationError = 'Трябва да се посочи валидна марка на автомобила.'; break;
         case 'model': validationError = 'Трябва да се посочи валиден модел на автомобила.'; break;
         case 'fuel': validationError = 'Трябва да се посочи вид говиво на автомобила.'; break;
         case 'enginePower': validationError = 'Трябва да се посочи мощност на автомобила.'; break;
         case 'price': validationError = 'Трябва да се посочи валидна цена на автомобила.'; break;
         case 'imgUrl': validationError = 'Трябва да се посочи url на снимка.'; break;
         case 'year': validationError = 'Трябва да се посочи валидна година на автомобила.'; break;
         default: validationError = 'Трябва да се посочи url на снимка.'; break;
      }
   }
   switch (props.elementType) {
      case ('textarea'):
         inputElement =
            <div className={inputContainer.join(' ') + ' ' + styles.Textarea}>
               <FontAwesomeIcon icon={props.icon ? props.icon : defaultIcon} size='2x' color='#FFA000' />
               <textarea className={inputClasses.join(' ') + ' ' + styles.Textarea}
                  {...props.elementConfig}
                  value={props.value}
                  onChange={props.changed}
                  placeholder={props.placeholder} />
            </div>
         break
      case ('select'):
         inputElement = <div className={inputContainer.join(' ')}>
            <FontAwesomeIcon icon={props.icon ? props.icon : defaultIcon} size='2x' color='#FFA000' />
            <select className={(inputClasses.join(' '))}
               {...props.elementConfig}
               value={props.value}
               onChange={props.changed}
               onBlur={props.blured}
               placeholder={props.placeholder}
               defaultValue={props.elementConfig.defaultValue} >
               {props.elementConfig.options.map(option => (
                  <option key={option.value} value={option.value} disabled={option.disabled} hidden={option.hidden} >
                     {option.displayValue}
                  </option>
               ))}
            </select>
         </div >
         break
      default:
         inputElement = <span><div className={inputContainer.join(' ')}>
            <FontAwesomeIcon icon={props.icon ? props.icon : defaultIcon} size='2x' color='#FFA000' />
            <input className={inputClasses.join(' ')}
               {...props.elementConfig}
               minLength='2'
               value={props.value}
               onChange={props.changed}
               onBlur={props.blured} />
         </div>
            <div className={styles.ValidationError}>{validationError}</div>
         </span>
         break
   }

   return inputElement
}

export default Input;