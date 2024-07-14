import React, { useEffect, useState } from 'react';
import './Score.css';

function Score({ score, change }) {
  const [displayScore, setDisplayScore] = useState(score);
  const [animationClass, setAnimationClass] = useState('');
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    if (change !== 0) {
      setAnimationClass(change > 0 ? 'score-increase' : 'score-decrease');
      setSymbol(change > 0 ? '+' : '-');
      setTimeout(() => {
        setDisplayScore(score);
        setAnimationClass('');
        setSymbol('');
      }, 500);
    }
  }, [score, change]);

  return (
    <div className={`score ${animationClass}`}>
      {symbol} {displayScore}
    </div>
  );
}

export default Score;
