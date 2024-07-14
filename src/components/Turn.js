import React from "react";

function Turn({ turn }) {
  return (
    <div className="Turn">
      <p>
        {turn.player}: {turn.answer} {turn.correct ?"✅" : "❌"}
      </p>
    </div>
  );
}

export default Turn;
