import React from 'react'
import NavItems from '../NavItems/NavItems'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <NavItems footer />
            <div>© Car World Всички права запазени 2022</div>
        </footer>
    )
}

export default Footer