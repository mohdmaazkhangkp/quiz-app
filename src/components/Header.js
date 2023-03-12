import React from 'react'
import {Link} from "react-router-dom";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes.container}>
      <Link to="/" className={classes.title}>
        INTUITIVE QUIZ HUB
      </Link>
      <hr className={classes.divider} />
    </div>
  );
}

export default Header