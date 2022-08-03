import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AuthButton.module.css'

const AuthButton = (props) => (
    <Link to={props.path} onClick={props.clicked}>
        <button style={{ height: props.h, backgroundColor: props.color }} className={styles.AuthButton} >
            {props.children}
        </button>
    </Link>
)

export default AuthButton