import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NavItems.module.css'

const Profile = (props) => {
   return (
      <div className={styles.Profile} onClick={props.clicked}>
         <div>Николай</div>
         <div className={styles.Image}>
            <FontAwesomeIcon style={{ alignSelf: 'center' }} icon={faUser} size='1x' color={props.color} />
         </div>
      </div>);
}

export default Profile;