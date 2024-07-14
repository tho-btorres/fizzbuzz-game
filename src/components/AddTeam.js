// src/AddTeam.js

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Layout, Input, Space, Typography, Button, Form, Flex } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";

function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!teamName.trim()) {
      setError("El nombre del equipo es requerido");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "teams"), {
        name: teamName,
        turns: [], // Inicializa turns como un array vacío
        score: 0, // Inicializa score a 0
      });
      setTeamName("");
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error adding document: ", err);
      setLoading(false);
      setError("Error al agregar el equipo. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <Space size={"middle"} direction="vertical">
      <Typography.Title level={4} style={{ margin: 0 }}>
        Agregar Equipo
      </Typography.Title>
      <Form onFinish={handleSubmit}>
        <Space>
          <Form.Item>
            <Input
              type="text"
              placeholder="Nombre del equipo"
              value={teamName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              icon={<UsergroupAddOutlined />}
              htmlType="submit"
              loading={loading}
              disabled={loading}
            ></Button>
          </Form.Item>
        </Space>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Space>
  );
}

export default AddTeam;
