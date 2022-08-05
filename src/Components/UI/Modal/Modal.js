import React from 'react';
import classes from './Modal.module.css';
import Auxi from '../../../HOC/Auxi/Auxi';
import Backdrop from '../BackDrop/BackDrop';

const Modal = (props) => {

   const shouldComponentUpdate = (nextProps, nextState) => {
      return nextProps.show !== props.show || nextProps.children !== props.children;
   }

   return (
      <Auxi>
         <Backdrop show={props.show} clicked={props.modalClosed} />
         <div
            className={classes.Modal}
            style={{
               transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
               opacity: props.show ? '1' : '0'
            }}>
            {props.children}
         </div>
      </Auxi>
   )
}

export default Modal;