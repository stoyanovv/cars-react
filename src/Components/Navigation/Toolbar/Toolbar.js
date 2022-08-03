import React from 'react'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import NavItems from '../NavItems/NavItems'
import styles from './Toolbar.module.css'
import { Link } from 'react-router-dom'
import ProfileIcon from '../../UI/ProfileIcon/ProfileIcon'


const Toolbar = (props) => {
    return (
        < header className={styles.Toolbar} >
            <Link to="/" id={styles.Logo}>CAR WORLD</Link>
            <DrawerToggle className={styles.DrawerToggle} clicked={props.drawerToggleClicked} open={props.open} />
            <div className={styles.ToolbarRightSide}>
                <NavItems isAuth={props.isAuth} />
                {props.isAuth ? <ProfileIcon clicked={props.profileToggleClicked} /> : null}
            </div>
        </header >
    )
}

export default Toolbar