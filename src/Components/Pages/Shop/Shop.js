import { faCar } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useEffect, useState } from 'react'
import Auth from '../Auth/Auth'
import Data from '../../../Data/Data'
import Car from '../../UI/Car/Car'
import Input from '../../UI/Input/Input'
import styles from './Shop.module.css'

const Shop = () => {
    const [state, setState] = useState({
        id: window.localStorage.getItem('userId'),
        inputs: {
            make: {
                elementType: 'select',
                icon: faCar,
                elementConfig: {
                    options: [
                        { value: '', disabled: true, defaultValue: 'Избери марка', hidden: true },
                        { value: 'Избери марка', displayValue: 'Избери марка' },
                        { value: 'Ауди', displayValue: 'Ауди' },
                        { value: 'БМВ', displayValue: 'БМВ' },
                        { value: 'Бугати', displayValue: 'Бугати' },
                        { value: 'Волво', displayValue: 'Волво' },
                        { value: 'Мазда', displayValue: 'Мазда' },
                        { value: 'Мерцедес', displayValue: 'Мерцедес' },
                        { value: 'Порше', displayValue: 'Порше' },
                        { value: 'Тойота', displayValue: 'Тойота' },
                        { value: 'Фолксваген', displayValue: 'Фолксваген' },
                        { value: 'Шкода', displayValue: 'Шкода' },
                    ]
                },
                value: undefined,
                validation: {
                    required: true
                },
                valid: true
            }
        }
    });
    const [cars, setCars] = useState([]);

    const loadCars = useCallback((res) => {
        const carsToShow = []
        res.forEach(c => {
            carsToShow.push(
                <Car
                    {...state.props}
                    key={c.id}
                    id={c.id}
                    make={c.make}
                    model={c.model}
                    price={c.price}
                    imgUrl={c.imgUrl}
                    bought={c.bought} />
            )
        })
        setCars(carsToShow);
    }, [state.props]);

    useEffect(() => {
        Data.get('shop', Auth.isUserAuthenticated)
            .then(res => {
                loadCars(res);
            })
    }, [loadCars]);

    const searchHandler = (event) => {
        event.preventDefault()
        const make = state.inputs.make.value
        if (make !== 'Избери марка') {
            Data.post('search', { make: make }, Auth.isUserAuthenticated)
                .then(res => {
                    loadCars(res);
                });
        } else {
            Data.get('shop', Auth.isUserAuthenticated)
                .then(res => {
                    loadCars(res);
                })
        }
    };

    const inputChangedHandler = (event) => {
        const updatedInputs = {
            ...state.inputs,
            make: {
                ...state.inputs.make,
                value: event.target.value
            }
        }
        let formIsValid = true;
        for (let inputIdentifier in updatedInputs) {

            formIsValid = updatedInputs[inputIdentifier].valid && formIsValid && updatedInputs[inputIdentifier].touched;
        }
        setState({
            inputs: updatedInputs,
            formIsValid: formIsValid
        });
    }

    return (
        <div className={styles.Shop}>
            <div className={styles.Search}>
                Търси по марка:
                <Input
                    name={state.inputs.id}
                    key={state.inputs.id}
                    icon={state.inputs.make.icon}
                    elementType={state.inputs.make.elementType}
                    elementConfig={state.inputs.make.elementConfig}
                    value={state.inputs.make.value}
                    invalid={!state.inputs.make.valid}
                    shouldValidate={state.inputs.make.validation}
                    touched={state.inputs.make.touched}
                    changed={(event) => inputChangedHandler(event)} />
                <div style={{ maxWidth: 80, margin: '0 auto' }}>
                    <button className={styles.Button} onClick={searchHandler} >Търси</button>
                </div>
            </div>

            {cars.length > 0 ?
                <div className={styles.Container}>
                    <div className={styles.Cars}>
                        {cars.map(car => (car))}
                    </div>
                </div>
                : <h2>Няма намерени автомобили от тази марка</h2>}
        </div>
    );
}

export default Shop
