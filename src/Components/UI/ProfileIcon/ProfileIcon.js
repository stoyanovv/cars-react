import React from 'react'
import styles from './ProfileIcon.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfileIcon = ({ color, clicked }) => {
    return (
        <div className={styles.Profile} onClick={clicked}>
            <div className={styles.UserName}>
                {window.localStorage.getItem('name')}
            </div>
            <div className={styles.Image}>
                <FontAwesomeIcon style={{ alignSelf: 'center' }} icon={faUser} size='1x' color={color} />
            </div>
        </div>
    );
}

export default ProfileIcon;