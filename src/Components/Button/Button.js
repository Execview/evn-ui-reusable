import React from 'react';
import classes from './Button.module.css'


const Button = (props) => {
	const {className,children,...otherProps} = props
	const disabled = props.disabled ? classes['disabled'] : '';
    return (
		<button className={`${classes['default-button']} ${(className || classes['default-interactions'])} ${disabled}`} type="button" {...otherProps}>{props.children}</button>
	);
}

export default Button;