import React, { Component } from 'react'
import { connect } from 'react-redux'
import Data from '../../../Data/Data'
import Button from '../Buttons/Button/Button'
import styles from './CarInfo.module.css'
import * as actions from '../../../Store/Actions/index'

class CarInfo extends Component {
    state = {
        id: window.localStorage.getItem('userId'),
        carInfo: [],
        carId: this.props.match.params.id
    }

    componentDidMount() {
        Data.get('carinfo/' + this.state.carId)
            .then(res => {
                const carInfo = res
                this.setState({
                    carInfo: carInfo
                })
            })
    }

    buyHandler = () => {
        Data.post('buycar/' + this.state.id, { carId: this.state.carId })
            .then(res => {
                this.props.setSnackbar('success', res.message)
                const carInfo = res
                this.setState({
                    carInfo: carInfo
                })
                this.props.history.push('/shop')
            })
    }

    deleteHandler = () => {
        Data.post('deletecar/' + this.state.id, { carId: this.state.carId })
            .then(res => {
                this.props.setSnackbar('info', res.message)
                const carInfo = res
                this.setState({
                    carInfo: carInfo
                })
                this.props.history.push('/cart')
            })
    }

    render() {
        let button = null
        if (!this.state.carInfo.bought) {
            button = <Button buttonType="Accept" clicked={this.buyHandler} >Купи сега</Button>
        }
        else {
            button = <Button buttonType="Decline" clicked={this.deleteHandler} >Премахни от покупки</Button>
        }
        return (
            <div className={styles.CarInfo}>
                <div className={styles.ImgContainer}>
                    <img className={styles.Img} alt='no pic' src={this.state.carInfo.imgUrl}></img>
                </div>
                <div className={styles.Description}>
                    <span className={styles.Info}>Марка: {this.state.carInfo.make}</span>
                    <span className={styles.Info}>Модел: {this.state.carInfo.model}</span>
                    <span className={styles.Info}>Цена: {this.state.carInfo.price} лв</span>
                    <span className={styles.Info}>Година: {this.state.carInfo.year}</span>
                </div>
                <div className={styles.Description}>
                    <span className={styles.Info}>Гориво: {this.state.carInfo.fuel}</span>
                    <span className={styles.Info}>Мотор: {this.state.carInfo.enginePower} кубика</span>
                </div>
                <span>
                    {button}
                </span>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSnackbar: (type, message, open) => dispatch(actions.setSnackbar(type, message, open)),
    }
}

export default connect(null, mapDispatchToProps)(CarInfo)


