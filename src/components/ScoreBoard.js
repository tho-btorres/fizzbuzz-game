import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

function ScoreBoard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "teams"), orderBy("score", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const teamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeams(teamsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="ScoreBoard">
      <h2>Score Board</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreBoard;
