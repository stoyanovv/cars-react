import { faComment, faEnvelope, faPencilAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from './ContactsPage.module.css'

const ContactsPage = () => {
    return (
        <div className={styles.ContactsPage}>
            <div className={styles.Info}>

                <h2>За контакти</h2>
                <div >Свържете се с нас на номер <br />
                    <FontAwesomeIcon icon={faPhoneAlt} size='1x' color='ocean' /> 0897 999 999
                </div>
                <div style={{ marginTop: '30px' }}>
                    Или ни пишете
                </div>
            </div>
            <form className={styles.Form}>
                <div className={styles.TwoContainers}>
                    <FontAwesomeIcon icon={faEnvelope} size='2x' color='#FFA000' />
                    <input className={styles.Inputs} placeholder='Имейл адрес' />
                </div>
                <div className={styles.TwoContainers}>
                    <FontAwesomeIcon icon={faComment} size='2x' color='#FFA000' />
                    <input className={styles.Inputs} placeholder='Заглавие' />
                </div>
                <div className={styles.TextContainer}>
                    <FontAwesomeIcon icon={faPencilAlt} size='2x' color='#FFA000' />
                    <textarea className={styles.Inputs + ' ' + styles.Textarea} placeholder='Съдържание' />
                </div>
                <div className={styles.Button}>

                    <button className={styles.Button}>Изпрати</ button>
                </div>
            </form>
        </div >
    );
}

export default ContactsPage;