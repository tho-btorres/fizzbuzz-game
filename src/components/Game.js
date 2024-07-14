import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Team from "./Team";
import AddTeam from "./AddTeam";
import { Layout, Space, Typography } from "antd";
import DeleteAllTeams from './DeleteAllTeams';

function Game() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teams"), (snapshot) => {
      const teamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        turns: Array.isArray(doc.data().turns) ? doc.data().turns : [], // Ensure 'turns' is an array
        score: doc.data().score || 0, // Ensure 'score' is loaded from Firestore
      }));
      setTeams(teamsData);
    });

    return unsubscribe;
  }, []);

  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  return (
    <Layout style={{ marginLeft: "30px", borderRadius: "50px" }}>
      <Space direction="vertical">
        <Space style={{ marginLeft: "30px" }} direction="vertical">
          <Typography.Title level={1} style={{ margin: 0 }}>
            FizzBuzz Game
          </Typography.Title>
          <AddTeam />
          <DeleteAllTeams />
        </Space>
        <Space style={{ marginLeft: "30px" }}>
          {teams.map((team) => (
            <Team key={team.id} team={team} onDelete={handleDeleteTeam}/>
          ))}
        </Space>
      </Space>
    </Layout>
  );
}

export default Game;
