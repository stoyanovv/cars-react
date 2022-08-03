import React from 'react'
import styles from './ProfileDrawer.module.css'
import Auxi from '../../../HOC/Auxi/Auxi'
import BackDrop from '../../UI/BackDrop/BackDrop'
import { Link } from 'react-router-dom'
import Auth from '../../../Containers/Auth/Auth'

const ProfileDrawer = (props) => {
   let attachedStyles = [styles.ProfileDrawer, styles.Close]
   if (props.open) {
      attachedStyles = [styles.ProfileDrawer, styles.Open]
   }
   return (
      <Auxi>
         <BackDrop show={props.open} clicked={props.closed} />
         <div className={attachedStyles.join(' ')}>
            <div className={styles.ProfileLinks}>
               {Auth.isAdmin() ?
                  <div className={styles.Link} onClick={props.closed}>
                     <Link to='/admin' >Админ</Link>
                  </div> : null}
               <div className={styles.Link} onClick={props.closed}>
                  <Link to='/myProfile' >Профил</Link>
               </div>
               <div className={styles.Link} onClick={props.closed}>
                  <Link to='/cart'>Покупки</Link>
               </div>

               <div className={styles.Link} onClick={props.closed}>
                  <Link to='/logout'>Изход</Link>
               </div>
            </div>
         </div>
      </Auxi>
   )
}

export default ProfileDrawer;