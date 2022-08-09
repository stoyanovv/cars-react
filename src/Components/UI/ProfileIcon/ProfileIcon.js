import React, { useContext } from 'react'
import styles from './ProfileIcon.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { pictureUrl } from './../../../Context/Context'

const ProfileIcon = ({ color, clicked }) => {
    // const { picUrl } = useContext(pictureUrl);
    const picUrl = window.localStorage.getItem('picUrl');
    console.log(picUrl)
    return (
        <div className={styles.Profile} onClick={clicked}>
            <div className={styles.UserName}>
                {window.localStorage.getItem('name')}
            </div>
            <div className={styles.ImageDiv}>
                {!picUrl || picUrl === null || picUrl === 'null' ?
                    <FontAwesomeIcon style={{ alignSelf: 'center' }} icon={faUser} size='1x' color={color} /> :
                    <img className={styles.Image} src={picUrl} />}
            </div>
        </div>
    );
}

export default ProfileIcon;