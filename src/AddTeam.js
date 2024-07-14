// src/AddTeam.js

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function AddTeam() {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setError('El nombre del equipo es requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'teams'), {
        name: teamName,
        turns: []  // Inicializa turns como un array vacío
      });
      setTeamName('');
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error adding document: ', err);
      setLoading(false);
      setError('Error al agregar el equipo. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="AddTeam">
      <h2>Agregar Equipo</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre del equipo" 
          value={teamName} 
          onChange={handleInputChange} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddTeam;
