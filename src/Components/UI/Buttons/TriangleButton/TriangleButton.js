import React from 'react'
import styles from './TriangleButton.module.css'


const TriangleButton = (props) => {
    return (

        <button disabled={props.disabled}
            onClick={props.clicked} className={`${styles.TriangleButton} ${props.left ? styles.TriangleLeft : styles.TriangleRight}`}></button>
    );
}

export default TriangleButton;
