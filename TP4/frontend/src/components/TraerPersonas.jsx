import React, { useEffect, useState } from 'react';
import ListaTarjetas from './ListaTarjetas';

const TraerPersonas = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/personas')
      .then(res => res.json())
      .then(data => setPersonas(data))
      .catch(err => console.error("Error al obtener personas:", err));
  }, []);

  return (
    <div>
      <ListaTarjetas personas={personas} />
    </div>
  );
};

export default TraerPersonas;
