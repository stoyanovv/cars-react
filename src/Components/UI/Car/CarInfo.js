import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Data from '../../../Data/Data'
import Button from '../Buttons/Button/Button'
import styles from './CarInfo.module.css'
import * as actions from '../../../Store/Actions/index'

const CarInfo = (props) => {
    const state = {
        id: window.localStorage.getItem('userId'),
        carId: props.match.params.id
    };
    const [carInfo, setCarInfo] = useState([]);

    useEffect(() => {
        Data.get('carinfo/' + state.carId)
            .then(res => {
                setCarInfo(res);
            })
    }, [state.carId]);

    const buyHandler = () => {
        Data.post('buycar/' + state.id, { carId: state.carId })
            .then(res => {
                props.setSnackbar('success', res.message)
                setCarInfo(res);
                props.history.push('/shop')
            })
    }

    const deleteHandler = () => {
        Data.post('deletecar/' + state.id, { carId: state.carId })
            .then(res => {
                props.setSnackbar('info', res.message)
                setCarInfo(res);
                props.history.push('/cart')
            })
    }

    let button = null
    if (!carInfo.bought) {
        button = <Button buttonType="Accept" clicked={buyHandler} >Купи сега</Button>
    }
    else {
        button = <Button buttonType="Decline" clicked={deleteHandler} >Премахни от покупки</Button>
    }

    const getDate = (date) => {
        return date ? new Date(Date.parse(date)).toLocaleDateString('sv') : null;
    }

    return (
        <div className={styles.CarInfo}>
            <div className={styles.ImgContainer}>
                <img className={styles.Img} alt='no pic' src={carInfo.imgUrl}></img>
            </div>
            <div className={styles.Description}>
                <span className={styles.Info}>Марка: {carInfo.make}</span>
                <span className={styles.Info}>Модел: {carInfo.model}</span>
                <span className={styles.Info}>Цена: {carInfo.price} лв</span>
                <span className={styles.Info}>Година: {getDate(carInfo.year)}</span>
            </div>
            <div className={styles.Description}>
                <span className={styles.Info}>Гориво: {carInfo.fuel}</span>
                <span className={styles.Info}>Мотор: {carInfo.enginePower} кубика</span>
            </div>
            <span>
                {button}
            </span>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setSnackbar: (type, message, open) => dispatch(actions.setSnackbar(type, message, open)),
    }
}

export default connect(null, mapDispatchToProps)(CarInfo)


