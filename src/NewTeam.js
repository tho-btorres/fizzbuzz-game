// src/Team.js

import React, { useState, useEffect } from "react";
import Turn from "./Turn";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import Score from "./Score";

function Team({ team }) {
  const [answer, setAnswer] = useState("");
  const [currentTurn, setCurrentTurn] = useState(team.turns.length);
  const [score, setScore] = useState(team.score || 0); // Initial score from Firestore
  const [scoreChange, setScoreChange] = useState(0);

  useEffect(() => {
    // Update local state if the team data changes
    setScore(team.score || 0);
    setCurrentTurn(team.turns.length);
  }, [team]);

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
    const updatedScore = newTurn.correct ? team.score + 3 : team.score - 1;

    await updateDoc(teamDocRef, {
      turns: [...team.turns, newTurn],
      score: updatedScore,
    });

    setAnswer("");
    setCurrentTurn(currentTurn + 1);
    setScoreChange(newTurn.correct ? 3 : -1);
  };

  const validateFizzBuzz = (number, answer) => {
    if (number % 3 === 0 && number % 5 === 0) return answer === "FizzBuzz";
    if (number % 3 === 0) return answer === "Fizz";
    if (number % 5 === 0) return answer === "Buzz";
    return answer === number.toString();
  };

  return (
    <div className="Team">
      <h2>{team.name}</h2>
      <Score score={score} change={scoreChange} />
      {team.turns &&
        team.turns.map((turn, index) => <Turn key={index} turn={turn} />)}
      <form onSubmit={handleSubmit}>
        <input type="text" value={answer} onChange={handleAnswerChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Team;
