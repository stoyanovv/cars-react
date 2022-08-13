import React, { useState } from 'react';
import { checkValidity } from '../../../../Shared/HelperFunctions';
import Data from '../../../../Data/Data'
import styles from './Admin.module.css'
import { faCar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Buttons/Button/Button';
import * as actions from '../../../../Store/Actions'
import { connect } from 'react-redux';


const Admin = (props) => {
    const initialState = {
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
                valid: true,
                touched: true
            },
        },
        formIsValid: false
    };
    const [state, setState] = useState(initialState);

    const inputChangedHandler = (event, inputName) => {
        const updatedInputs = {
            ...state.inputs,
            [inputName]: {
                ...state.inputs[inputName],
                value: event.target.value,
                valid: checkValidity(event.target.value, state.inputs[inputName].validation)
            }
        }
        let formIsValid = true;
        for (let inputIdentifier in updatedInputs) {

            formIsValid = updatedInputs[inputIdentifier].valid && formIsValid && updatedInputs[inputIdentifier].touched;
        }
        setState({
            inputs: updatedInputs,
            formIsValid: formIsValid
        })
    }

    const setTouchedHandler = (inputName) => {
        const toSet = {
            inputs: {
                ...state.inputs,
                [inputName]: {
                    ...state.inputs[inputName],
                    touched: true
                }
            },
            formIsValid: state.formIsValid
        };
        setState(toSet);
    }

    const submitHandler = (event) => {
        event.preventDefault()

        Data.post('admin/addcar',
            {
                make: state.inputs.make.value,
                model: state.inputs.model.value,
                fuel: state.inputs.fuel.value,
                enginePower: state.inputs.enginePower.value,
                year: state.inputs.year.value,
                price: state.inputs.price.value,
                imgUrl: state.inputs.imgUrl.value
            })
            .then(res => {
                if (res.success) {
                    props.setSnackbar('success', res.message)
                    setState(initialState);
                }
                else if (!res.success) {
                    props.setSnackbar('error', res.message)

                }
            })
    }

    const formElementsArray = [];
    for (let key in state.inputs) {
        formElementsArray.push({
            id: key,
            config: state.inputs[key]
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
            changed={(event) => inputChangedHandler(event, formElement.id)}
            blured={() => setTouchedHandler(formElement.id)} />)
    )

    return (
        <div className={styles.Admin}>
            <h2>Добавете автомобил в онлайн магазина</h2>
            <form onSubmit={submitHandler}>
                {form}
                <Button
                    buttonType='LogIn' submit width='180px' disabled={!state.formIsValid}>Добави автомобил</Button>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setSnackbar: (type, message, open) => dispatch(actions.setSnackbar(type, message, open)),
    }
}

export default connect(null, mapDispatchToProps)(Admin)