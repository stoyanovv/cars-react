import React from 'react'
import styles from './CarIcon.module.css'

const CarIcon = (props) => {
    return (
        <div className={styles.Text}>
            <img alt='no pic' className={styles.Pic} src={props.img}></img>
            <div className={styles.Names}>{props.name}</div>
        </div>
    );
}

export default CarIcon;