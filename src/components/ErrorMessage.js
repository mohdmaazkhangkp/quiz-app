import React from 'react';
import classes from "./ErrorMessage.module.css";

const ErrorMessage = ({children}) => {
  return <div className={classes.container}>{children}</div>;
}

export default ErrorMessage