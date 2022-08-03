import React from 'react'
import Auxi from '../../../HOC/Auxi/Auxi'
import BackDrop from '../../UI/BackDrop/BackDrop'
import NavItems from '../NavItems/NavItems'
import styles from './SideDrawer.module.css'

const SideDrawer = (props) => {
    let attachedStyles = [styles.SideDrawer, styles.Close]
    if (props.open) {
        attachedStyles = [styles.SideDrawer, styles.Open]
    }
    return (
        <Auxi>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedStyles.join(' ')}>
                <NavItems isAuth={props.isAuth} clicked={props.closed} />
            </div>
        </Auxi>
    )
}

export default SideDrawer