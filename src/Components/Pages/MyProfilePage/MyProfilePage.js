import React, { useEffect, useState } from 'react'
import styles from './MyProfilePage.module.css'
import Data from '../../../Data/Data'
import Auth from '../Auth/Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const MyProfilePage = () => {
   const [userInfo, setUserInfo] = useState({
      id: window.localStorage.getItem('userId'),
      index: 0,
      name: '',
      lastName: '',
      age: '',
      phoneNumber: '',
      email: ''
   }
   );
   useEffect(() => {
      const url = 'myprofile/' + userInfo.id
      Data.get(url, Auth.isUserAuthenticated)
         .then(res => {
            const user = res.myProfileView
            setUserInfo({
               id: window.localStorage.getItem('userId'),
               index: 0,
               name: user.name,
               lastName: user.lastName,
               age: user.age,
               phoneNumber: user.phoneNumber,
               email: user.email
            }
            )
         })
   }, [])

   return (
      <div className={styles.MyProfile}>
         <div className={styles.ProfileAndStatisticsContainer}>
            <div>
               <h2>Профил</h2>
               <div className={styles.ProfilePic}>
                  <FontAwesomeIcon style={{ alignSelf: 'center' }} icon={faUser} size='10x' />
               </div>
               <div className={styles.ProfileInfoContainer}>
                  <div className={styles.ProfileInfo}>Име {userInfo.name} {userInfo.lastName}</div>
                  <div className={styles.ProfileInfo}>Имейл адрес {userInfo.email}</div>
                  <div className={styles.ProfileInfo}>Телефон {userInfo.phoneNumber}</div>
                  <div className={styles.ProfileInfo}>Възраст {userInfo.age} години</div>
               </div>
            </div>
            <div className={styles.PlayedMatches}>
            </div>
         </div>
         <div className={styles.Matches}>

            <div>
               <div className={styles.PlayedMatches}>

               </div>
            </div>
         </div>
      </div>
   );
}

export default MyProfilePage;
