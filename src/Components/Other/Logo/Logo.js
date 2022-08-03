import React from 'react'
import styles from './Logo.module.css'
import RaceSportLogo from '../../Assets/Images/RaceSportLogo.svg'

const Logo = (props) => (
    <img className={styles.Logo} src={RaceSportLogo}></img>
)

export default Logo