import React, { Component } from 'react'
import Data from '../../../Data/Data'
import styles from './ConfirmEmail.module.css'

import { faSadTear, faSmile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


class ConfirmEmail extends Component {
    state = {
        token: this.props.match.params.token,
        success: false,
        message: ''

    }

    componentDidMount() {
        Data.get('confirm?token=' + this.state.token, false)
            .then(res => {
                if (res.success) {
                    this.setState({ success: true, message: res.message })
                }
                else {
                    this.setState({ message: res.message })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <React.Fragment>
                <h2>Потвърждаване на имейл</h2>
                <h2 className={styles.Message} style={{ color: this.state.success ? 'green' : 'tomato' }}> {this.state.message}</h2>

                <div style={{ textAlign: 'center', marginTop: 12 }}>
                    {this.state.success ?
                        <div>
                            <FontAwesomeIcon icon={faSmile} size="10x" color="orange" />

                            <div className={styles.Link}>
                                <Link className={styles.Anchor} to='/login'>Можете да влезете в своя акаунт от тук</Link>
                            </div>
                        </div>
                        : <FontAwesomeIcon icon={faSadTear} size="10x" color="orange" />
                    }
                </div>
            </React.Fragment >
        );
    }
}

export default ConfirmEmail;


