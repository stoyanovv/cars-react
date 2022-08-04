import React, { useEffect, useState } from 'react'
import Data from '../../../Data/Data'
import Car from '../../UI/Car/Car'
import styles from './Cart.module.css'

const Cart = () => {

    const [cart, setCart] = useState({
        id: window.localStorage.getItem('userId'),
        cars: [],
        price: 0
    }, []);

    useEffect(() => {
        Data.get('boughtcars/' + window.localStorage.getItem('userId'))
            .then(res => {
                const carsInCart = res.cars
                const cars = []
                carsInCart.forEach(c => {
                    cars.push(
                        <Car
                            {...cart.props}
                            key={c.id}
                            id={c.id}
                            make={c.make}
                            model={c.model}
                            price={c.price}
                            imgUrl={c.imgUrl}
                            bought={c.bought} />
                    )
                })
                setCart({
                    cars: cars,
                    price: res.price
                })
            })
    }, [])

    return (
        <div className={styles.Cart}>
            {cart.price > 0 ? <h2 className={styles.Header}>Твоите покупки с обща стойност {cart.price} лв</h2> :
                <h2 className={styles.Header}>Нямате покупки</h2>}

            <div className={styles.Container}>
                <div className={styles.Shop}>
                    {cart.cars.map(car => (car))}
                </div>
            </div>
        </div>
    );
}

export default Cart