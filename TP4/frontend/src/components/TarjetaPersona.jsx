import React from 'react';
import './TarjetaPersona.css';

const TarjetaPersona = ({ persona }) => {
  return (
    <div className="tarjeta">
      <h2>{persona.nombre} {persona.apellido}</h2>
      <p><strong>Edad:</strong> {persona.edad}</p>
      <p><strong>Email:</strong> {persona.email}</p>
    </div>
  );
};

export default TarjetaPersona;
