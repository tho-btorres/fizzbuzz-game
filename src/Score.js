import React, { useEffect, useState } from "react";
import "./Score.css";

function Score({ score }) {
  const [animatedScore, setAnimatedScore] = useState(score);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (score !== animatedScore) {
      setAnimationClass("animate-score");
      setTimeout(() => {
        setAnimatedScore(score);
        setAnimationClass("");
      }, 300);
    }
  }, [score, animatedScore]);

  return <div className={`score ${animationClass}`}>{animatedScore}</div>;
}

export default Score;
