import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Car.module.css'

const Car = (props) => {
    return (
        <div className={styles.Car}>
            <Link to={"/carinfo/" + props.id}  >
                <div className={styles.ImgContainer}>
                    <img className={styles.Img} alt='no pic' src={props.imgUrl}></img>

                </div>
            </Link>
            <div className={styles.Description}>
                <Link to={"/carinfo/" + props.id}  >
                    <div className={styles.Info}>Марка: {props.make}</div>
                    <div className={styles.Info}>Модел: {props.model}</div>
                    <div className={styles.Info}>Цена: {props.price} лв</div>
                </Link>
            </div>
        </div>
    );
}

export default Car;