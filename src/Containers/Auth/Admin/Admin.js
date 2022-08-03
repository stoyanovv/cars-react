import React, { Component, useState } from 'react';
import { checkValidity } from '../../../Shared/HelperFunctions';
import Data from '../../../Data/Data'
import styles from './Admin.module.css'
import { faCar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../Components/UI/Input/Input';
import Button from '../../../Components/UI/Buttons/Button/Button';
import * as actions from '../../../Store/Actions/index'
import { connect } from 'react-redux';


class Admin extends Component {
    // const [inputs, setInputs] = useState();
    state = {
        inputs: {
            make: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Марка'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            model: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Модел'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            fuel: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Гориво'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            enginePower: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Мощност на мотора'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                icon: faDollarSign,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Цена'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            imgUrl: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Снимка'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            year: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'date',
                    placeholder: 'Година'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    inputChangedHandler = (event, inputName) => {
        const updatedInputs = {
            ...this.state.inputs,
            [inputName]: {
                ...this.state.inputs[inputName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.inputs[inputName].validation),
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

    submitHandler = (event) => {
        event.preventDefault()
        const car = [
            { make: this.state.inputs.make.value },
            { model: this.state.inputs.model.value },
            { fuel: this.state.inputs.fuel.value },
            { enginePower: this.state.inputs.enginePower.value },
            { year: this.state.inputs.year.value },
            { price: this.state.inputs.price.value },
            { imgUrl: this.state.inputs.imgUrl.value }
        ]

        Data.post('admin/addcar',
            {
                make: this.state.inputs.make.value,
                model: this.state.inputs.model.value,
                fuel: this.state.inputs.fuel.value,
                enginePower: this.state.inputs.enginePower.value,
                year: this.state.inputs.year.value,
                price: this.state.inputs.price.value,
                imgUrl: this.state.inputs.imgUrl.value
            })
            .then(res => {
                if (res.success) {
                    this.props.setSnackbar('success', res.message)

                    this.state.inputs.make.value = '';
                }
                else if (!res.success) {
                    this.props.setSnackbar('error', res.message)

                }
            })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.inputs) {
            formElementsArray.push({
                id: key,
                config: this.state.inputs[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                name={formElement.id}
                key={formElement.id}
                icon={formElement.config.icon}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />)
        )


        // let errorMessage = null
        // if (this.props.error) {
        //     errorMessage = (<p style={{ color: 'tomato' }}>{this.props.error}</p>)
        // }
        return (
            <div className={styles.Admin}>
                <h2>Добавете автомобил в онлайн магазина</h2>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button
                        buttonType='LogIn' submit width='180px' disabled={!this.state.formIsValid}>Добави авотомобил</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSnackbar: (type, message, open) => dispatch(actions.setSnackbar(type, message, open)),
    }
}

export default connect(null, mapDispatchToProps)(Admin)