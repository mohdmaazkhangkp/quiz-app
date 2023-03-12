import React, { useState } from 'react'
import classes from "./HomePage.module.css";
import quizImage from '../assets/asset 0.svg';
import Categories from '../data/Categories';
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../components/ErrorMessage';
const HomePage = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [error, setError] = useState(false);
 

  const handleSubmit = () => {
    if (!category || !name || !difficulty) {
      setError(true);
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      
    }
  };


  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h2>Quiz Settings</h2>
        <div className={classes.formInput}>
          {error && <ErrorMessage>Please Fill All The Feilds</ErrorMessage>}
          <input
            placeholder="Enter Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="" disabled selected>
              Select your Category
            </option>
            {Categories.map((c) => (
              <option key={c.category} value={c.category}>
                {c.category}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <option value="" disabled selected>
              Select Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button className={classes.submitBtn} onClick={handleSubmit}>
            START QUIZ
          </button>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img src={quizImage} />
      </div>
    </div>
  );
};

export default HomePage