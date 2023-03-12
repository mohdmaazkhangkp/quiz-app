import React from 'react'
import classes from './ResultPage.module.css';

const ResultPage = ({ score }) => {
  return (
    <div className={classes.container}>
      <h2>FINAL SCORE : {score}</h2>
      <a href="/">
        <button>GO TO HOMEPAGE</button>
      </a>
    </div>
  );
};

export default ResultPage