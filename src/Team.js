import { Layout, Space } from "antd";

import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import Score from "./Score";
import Turn from "./Turn";
import { db } from "./firebase";

function Team({ team }) {
  const [answer, setAnswer] = useState("");
  const [currentTurn, setCurrentTurn] = useState(team.turns.length);
  const [score, setScore] = useState(0);
  const [scoreChange, setScoreChange] = useState(0);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTurn = {
      player: `Player ${currentTurn + 1}`,
      answer,
      correct: validateFizzBuzz(currentTurn + 1, answer),
    };

    const teamDocRef = doc(db, "teams", team.id);
    await updateDoc(teamDocRef, {
      turns: [...team.turns, newTurn],
    });

    setAnswer("");
    setCurrentTurn(currentTurn + 1);

    if (newTurn.correct) {
      const newScore = score + 3;
      setScore(newScore);
      setScoreChange(3);
    } else {
      const newScore = score - 1;
      setScore(newScore);
      setScoreChange(-1);
    }
  };

  const validateFizzBuzz = (number, answer) => {
    if (number % 3 === 0 && number % 5 === 0) return answer === "FizzBuzz";
    if (number % 3 === 0) return answer === "Fizz";
    if (number % 5 === 0) return answer === "Buzz";
    return answer === number.toString();
  };

  return (
    <Layout>
      <Space>
        <h2>{team.name}</h2>
        <h3>Número actual: {currentTurn + 1}</h3>
        <Score score={score} change={scoreChange} />
      </Space>

      {team.turns &&
        team.turns.map((turn, index) => <Turn key={index} turn={turn} />)}
      <form onSubmit={handleSubmit}>
        <input type="text" value={answer} onChange={handleAnswerChange} />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}

export default Team;
