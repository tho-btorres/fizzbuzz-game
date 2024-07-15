// src/Team.js

import React, { useState, useEffect } from "react";
import Turn from "./Turn";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Score from "./Score";
import { Layout, Button, Space, Typography, Radio, Form, Flex } from "antd";
import { CheckOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";

import { Input } from "antd";
function Team({ team, onDelete }) {
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
    // e.preventDefault();
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

  const handleClearTurns = async () => {
    const teamDocRef = doc(db, "teams", team.id);
    await updateDoc(teamDocRef, {
      turns: [],
      score: 0, // Reset score to 0
    });

    setCurrentTurn(0);
    setScore(0);
  };

  const handleDeleteTeam = async () => {
    const teamDocRef = doc(db, "teams", team.id);
    await deleteDoc(teamDocRef);
    onDelete(team.id); // Notify parent component to update the state
  };

  const validateFizzBuzz = (number, answer) => {
    if (number % 3 === 0 && number % 5 === 0) return answer === "FizzBuzz";
    if (number % 3 === 0) return answer === "Fizz";
    if (number % 5 === 0) return answer === "Buzz";
    return answer === number.toString();
  };

  const Selector = ({ number }) => {
    return (
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Radio.Group
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            htmlType="Submit"
          >
            <Radio.Button size="small" value="Fizz">
              Fizz
            </Radio.Button>
            <Radio.Button size="small" value="Buzz">
              Buzz
            </Radio.Button>
            <Radio.Button value="Fizz Buzz">Fizz Buzz</Radio.Button>
            <Radio.Button
              value={number.toString()}
            >{`# ${number}`}</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout style={{ height: "800px" }}>
      <Space direction="vertical">
        <Flex justify="space-between" align="center">
          <Typography.Title level={5}>Equipo: {team.name}</Typography.Title>
          <Button
            danger
            size="small"
            icon={<UsergroupDeleteOutlined />}
            onClick={handleDeleteTeam}
          >
            Delete
          </Button>
        </Flex>
        <Flex justify="space-betweem">
          <Space size={"large"}>
            <Button size="small" onClick={handleClearTurns}>
              Reset
            </Button>

            <Score score={score} change={scoreChange} />
          </Space>
        </Flex>
        <Typography.Text style={{ fontSize: "10rem" }}>
          {currentTurn + 1}
        </Typography.Text>

        <Form onFinish={handleSubmit}>
          <Selector number={currentTurn + 1} />
          <Space>
            <Form.Item>
              <Input
                placeholder="Respuesta"
                style={{ width: "50%" }}
                type="text"
                value={answer}
                onChange={handleAnswerChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                size="small"
                type="primary"
                icon={<CheckOutlined />}
                htmlType="submit"
              >
                OK
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Space>
      {team.turns &&
        team.turns.map((turn, index) => <Turn key={index} turn={turn} />)}
    </Layout>
  );
}

export default Team;
