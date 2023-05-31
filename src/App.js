import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import classes from "./App.module.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import Categories from "./data/Categories";

function App() {
  const[name, setName] = useState();
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState();

 const navigate = useNavigate();


  const fetchQuestions = async(category, difficulty) => {
    const categoryValue = Categories.find((c)=>c.category==category).value;
    setLoading(true);
   const { data } = await axios.get(
     `https://opentdb.com/api.php?amount=10&category=${categoryValue}&difficulty=${difficulty}&type=multiple`
   );
    setLoading(false);
   setQuestions(data.results);
   
  
   navigate("/quiz");
  };

  return (
    <>
      <div className={classes.app}>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <QuizPage
                questions={questions}
                name={name}
                score={score}
                setScore={setScore}
                loading={loading}
              />
            }
          />
          <Route path="/result" element={<ResultPage score={score} />} />
        </Routes>
        <Footer />
      </div>
      
    </>
  );
}

export default App;
