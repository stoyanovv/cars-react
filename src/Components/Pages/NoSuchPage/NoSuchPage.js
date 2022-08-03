import React from 'react'
import styles from './NoSuchPage.module.css'
import { faSadTear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoSuchPage = () =>
    <div className={styles.NoSuchPage}>

        <h2>Съжалявам, няма такава страница!</h2>

        <FontAwesomeIcon icon={faSadTear} size="10x" color="orange" />
    </div>

export default NoSuchPage