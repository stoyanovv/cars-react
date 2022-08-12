import React, { useEffect, useState } from 'react'
import styles from './MyProfilePage.module.css'
import Data from '../../../Data/Data'
import Auth from '../Auth/Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import Input from '../../UI/Input/Input';
// import { pictureUrl } from '../../../Context/Context'


const MyProfilePage = () => {
   const [userInfo, setUserInfo] = useState({
      id: window.localStorage.getItem('userId'),
      index: 0,
      name: '',
      lastName: '',
      age: '',
      phoneNumber: '',
      email: '',
      pictureUrl: ''
   });

   useEffect(() => {
      let isMounted = true;
      const url = 'myprofile/' + userInfo.id
      Data.get(url, Auth.isUserAuthenticated)
         .then(res => {
            const user = res.myProfileView
            if (isMounted) {
               setUserInfo({
                  id: window.localStorage.getItem('userId'),
                  index: 0,
                  name: user.name,
                  lastName: user.lastName,
                  age: user.age,
                  phoneNumber: user.phoneNumber,
                  email: user.email,
                  pictureUrl: user.pictureUrl
               }
               )
            }
         });
      return () => { isMounted = false };
   }, [userInfo.id]);

   const [showPictureField, setShowPictureField] = useState(false);
   // const { setPicUrl } = useContext(pictureUrl);

   let picUrl = '';
   const inputChangedHandler = (event) => {
      picUrl = event.target.value;
   }

   const changePictureHandler = () => {
      setShowPictureField(true);
   }

   const savePictureUrlHandler = () => {
      Data.post('updatePictureUrl/' + window.localStorage.getItem('userId'), picUrl)
         .then(res => {
            if (res) {
               setUserInfo({
                  ...userInfo,
                  pictureUrl: picUrl
               });
               // setPicUrl(picUrl)
               localStorage.setItem('picUrl', picUrl)
               window.location.reload(false);
               picUrl = '';
               setShowPictureField(false);
            }
         })
   }

   return (
      <div className={styles.MyProfile}>
         <div className={styles.ProfileAndStatisticsContainer}>
            <div className={styles.picUrlAndButton}>
               <h2>Профил</h2>
               {userInfo.pictureUrl !== null ?
                  <img className={styles.PictureUrl} alt='no pic' src={userInfo.pictureUrl} /> :
                  <div className={styles.picUrlAndButton}>
                     <FontAwesomeIcon className={styles.ProfilePic} style={{ alignSelf: 'center' }} icon={faUser} size='10x' />
                  </div>
               }
               <Button onClick={changePictureHandler}>Промени профилна снимка</Button>
               {showPictureField ? <div className={styles.picUrlAndButton}> <Input
                  name={'profilePic'}
                  key={'profilePic'}
                  icon={faUser}
                  changed={(event) => inputChangedHandler(event)} />
                  <Button onClick={savePictureUrlHandler}>Запази</Button>
               </div> : null}
               <div className={styles.ProfileInfoContainer}>
                  <div className={styles.ProfileInfo}>Име: {userInfo.name} {userInfo.lastName}</div>
                  <div className={styles.ProfileInfo}>Имейл адрес: {userInfo.email}</div>
                  <div className={styles.ProfileInfo}>Телефон: {userInfo.phoneNumber}</div>
                  <div className={styles.ProfileInfo}>Възраст: {userInfo.age} години</div>
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
