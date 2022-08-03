import React from 'react'
import styles from './Button.module.css'

const Button = (props) => {
    return (
        <button className={[styles.Button, styles[props.buttonType]].join(' ')}
            type={props.submit ? 'submit' : 'button'}
            onClick={props.clicked}
            disabled={props.disabled}
            style={{
                width: props?.width,
                height: props?.height
            }}
        > { props.children}</button >
    );
}

export default Button;