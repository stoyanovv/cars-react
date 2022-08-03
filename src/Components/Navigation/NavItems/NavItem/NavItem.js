import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavItem.module.css'
import styles from './NavItem.module.css'

const NavItem = (props) => {
   let style = styles.NavItem
   if (props.footer) {
      style = styles.NavItemFooter
   }

   return (
      <li className={style} onClick={props.clicked}>
         <NavLink activeClassName={classes.active} className={props.active ? styles.active : null} to={props.path}>{props.children}</NavLink>
      </li>
   )
}

export default NavItem