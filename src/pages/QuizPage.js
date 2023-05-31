import React, {  useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import classes from './QuizPage.module.css';

const QuizPage = ({
  questions,
  name,
  score,
  setScore,
  loading
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selected, setSelected] = useState();
  const [error, setError] = useState();
   const navigate = useNavigate();
     const [correctOptions, setCorrectOptions] = useState();
     const [allOptions, setAllOptions] = useState();

   useEffect(() => {
     setCorrectOptions(questions.map((q) => q.correct_answer));
     setCorrectOptions(questions.map((q) => q.correct_answer));
     setAllOptions(
       questions
         .map((q) => [q.correct_answer, ...q.incorrect_answers])
         .map((option) => option.sort(() => Math.random() - 0.5))
     );
   }, [questions]);


  const handleCheck = (SelectedOption) => {
    setError();
    setSelected(SelectedOption);
    if (correctOptions[pageNumber - 1] === SelectedOption) {
      setScore((s) => s + 1);
    }
  };

  const handleSelect = (i) => {
    if (selected === i && selected === correctOptions[pageNumber - 1])
      return "correct";
    else if (selected === i && selected !== correctOptions[pageNumber - 1])
      return "wrong";
    else if (i === correctOptions[pageNumber - 1]) return "correct";
  };

  const handleNext = () => {
    if(pageNumber>9){
      navigate('/result');
    }
    if(selected){
      setSelected();
      setPageNumber((p) => p + 1);
    } 
    else setError("Please select an option first");
    
  };

  function decodeHTMLEntities(text) {
    const element = document.createElement('textarea');
    element.innerHTML = text;
    return element.value;
  }

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className={classes.container}>
          <h3>Welcome, {name}</h3>
          <div className={classes.catScoreContainer}>
            <div className={classes.category}>{questions[0].category}</div>
            <div className={classes.score}>Score: {score}</div>
          </div>
          <h2>Question {pageNumber} :</h2>
          <div className={classes.quizContainer}>
            <div className={classes.question}>
                {decodeHTMLEntities(questions[pageNumber - 1].question)}
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className={classes.options}>
              {allOptions &&
                allOptions[pageNumber - 1].map((option) => (
                  <button
                    onClick={() => handleCheck(option)}
                    key={option}
                    className={`${classes.option} ${
                      classes[`${selected && handleSelect(option)}`]
                    }`}
                    disabled={selected}
                  >
                    {decodeHTMLEntities(option)}
                  </button>
                ))}
            </div>
            <div className={classes.btnsContainer}>
              <a href="/">
                <button className={classes.btn}>QUIT</button>
              </a>
              <button onClick={handleNext} className={classes.btn}>
                NEXT QUESTION
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizPage;
