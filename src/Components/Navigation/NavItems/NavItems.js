import React from 'react'
import styles from './NavItems.module.css'
import NavItem from './NavItem/NavItem'

const NavItems = (props) => {
   let style = styles.NavItems
   let logInButton = <NavItem clicked={props.clicked} path="/login" >Вход</NavItem>
   if (props.footer) {
      style = styles.NavItemsFooter
      logInButton = null
   }
   let navItems =
      (<ul className={style}>
         {logInButton}
         <NavItem clicked={props.clicked} footer={props.footer} path="/about">За нас</NavItem>
         <NavItem clicked={props.clicked} footer={props.footer} path="/contacts">Контакти</NavItem>
         <NavItem clicked={props.clicked} footer={props.footer} path="/rules">Правила</NavItem>
      </ul>)
   if (props.isAuth) {
      navItems =
         (<ul className={style}>
            <NavItem clicked={props.clicked} footer={props.footer} path="/shop">Пазарувай</NavItem>
            <NavItem clicked={props.clicked} footer={props.footer} path="/about">За нас</NavItem>
            <NavItem clicked={props.clicked} footer={props.footer} path="/contacts">Контакти</NavItem>
            <NavItem clicked={props.clicked} footer={props.footer} path="/rules">Правила</NavItem>
         </ul>)
   }
   return navItems
}

export default NavItems