import { Flex } from "antd";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Team from "./Team";

function Game() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teams"), (snapshot) => {
      const teamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        turns: doc.data().turns || [], // Asegúrate de que 'turns' siempre sea un array
      }));
      setTeams(teamsData);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="Game">
      <h1>FizzBuzz Game</h1>
      <Flex gap="middle">
        {teams.map((team) => (
          <Team key={team.id} team={team} />
        ))}
      </Flex>
    </div>
  );
}

export default Game;
