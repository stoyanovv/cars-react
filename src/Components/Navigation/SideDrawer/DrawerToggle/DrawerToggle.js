import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './DrawerToggle.module.css'

const DrawerToggle = (props) => {
    if (props.open) {
        return <FontAwesomeIcon className={styles.DrawerToggle} icon={faTimes} size='3x' color='#155374' />
    }
    else {
        return (
            <div className={styles.DrawerToggle} onClick={props.clicked}>
                <div className={styles.Bar}></div>
                <div className={styles.Bar}></div>
                <div className={styles.Bar}></div>
                <div className={styles.Bar}></div>
            </div>
        )
    }

}

export default DrawerToggle