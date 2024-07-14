import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Team from "./Team";
import AddTeam from "./AddTeam";
import { Flex } from "antd";

function Game() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teams"), (snapshot) => {
      const teamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        turns: Array.isArray(doc.data().turns) ? doc.data().turns : [], // Asegúrate de que 'turns' sea un array
      }));
      setTeams(teamsData);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="Game">
      <h1>FizzBuzz Game</h1>
      <AddTeam />
      <Flex gap="middle">
        {teams.map((team) => (
          <Team key={team.id} team={team} />
        ))}
      </Flex>
    </div>
  );
}

export default Game;
