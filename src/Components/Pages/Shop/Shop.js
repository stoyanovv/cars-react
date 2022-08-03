import { faCar } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react'
import Auth from '../../../Containers/Auth/Auth'
import Data from '../../../Data/Data'
import Car from '../../UI/Car/Car'
import Input from '../../UI/Input/Input'
import styles from './Shop.module.css'
import { checkValidity } from '../../../Shared/HelperFunctions';

export default class Shop extends Component {
    state = {
        id: window.localStorage.getItem('userId'),
        cars: [],
        inputs: {
            make: {
                elementType: 'select',
                icon: faCar,
                elementConfig: {
                    options: [
                        { value: '', displayValue: 'Избери марка', disabled: true, selected: true, hidden: true },
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
    }

    componentDidMount() {
        Data.get('shop', Auth.isUserAuthenticated)
            .then(res => {
                const shop = res
                const cars = []
                shop.forEach(c => {
                    cars.push(
                        <Car
                            {...this.state.props}
                            key={c.id}
                            id={c.id}
                            make={c.make}
                            model={c.model}
                            price={c.price}
                            imgUrl={c.imgUrl}
                            bought={c.bought}
                            clicked={this.clickHandler} />
                    )
                })
                this.setState({
                    cars: cars
                })
            })
    }

    searchHandler = (event) => {
        event.preventDefault()
        const make = this.state.inputs.make.value
        Data.post('search', { make: make }, Auth.isUserAuthenticated)
            .then(res => {
                const cars = []
                const shop = res
                shop.forEach(c => {
                    cars.push(
                        <Car
                            {...this.state.props}
                            key={c.id}
                            id={c.id}
                            make={c.make}
                            model={c.model}
                            price={c.price}
                            imgUrl={c.imgUrl}
                            bought={c.bought}
                            clicked={this.clickHandler} />
                    )
                })
                this.setState({
                    cars: cars
                })
            })
    }

    inputChangedHandler = (event) => {
        const updatedInputs = {
            ...this.state.inputs,
            make: {
                ...this.state.inputs.make,
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.inputs.make.validation),
                touched: true
            }
        }
        let formIsValid = true;
        for (let inputIdentifier in updatedInputs) {

            formIsValid = updatedInputs[inputIdentifier].valid && formIsValid && updatedInputs[inputIdentifier].touched;
        }
        this.setState({
            inputs: updatedInputs,
            formIsValid: formIsValid
        })
    }


    render() {
        return (
            <div className={styles.Shop}>
                <div className={styles.Search}>
                    Търси по марка:
                        <Input
                        name={this.state.inputs.id}
                        key={this.state.inputs.id}
                        icon={this.state.inputs.make.icon}
                        elementType={this.state.inputs.make.elementType}
                        elementConfig={this.state.inputs.make.elementConfig}
                        value={this.state.inputs.make.value}
                        invalid={!this.state.inputs.make.valid}
                        shouldValidate={this.state.inputs.make.validation}
                        touched={this.state.inputs.make.touched}
                        changed={(event) => this.inputChangedHandler(event)} />
                    <div style={{ maxWidth: 80, margin: '0 auto' }}>
                        <button className={styles.Button} onClick={this.searchHandler} >Търси</button>
                    </div>
                </div>

                {this.state.cars.length > 0 ?
                    <div className={styles.Container}>
                        <div className={styles.Cars}>
                            {this.state.cars.map(car => (car))}
                        </div>
                    </div>
                    : <h2>Няма намерени автомобили от тази марка</h2>}
            </div>
        );
    }
}
