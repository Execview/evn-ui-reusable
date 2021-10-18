import React from 'react';
import classes from './CircleUser.module.css';

const CircleUser = (props) => {
  const minHeight = props.size || 40
  return (
    <div className={`${classes['user-circle']} ${props.className}`} style={{height: minHeight-4, width: minHeight-4}}>
      <img className={classes['user-image']} src={props.url} alt="xd" />
    </div>
  );
}

export default CircleUser