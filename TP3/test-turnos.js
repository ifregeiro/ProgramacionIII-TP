// Test script para probar las rutas de turnos
const fetch = require('node-fetch');

// URL base de la API
const API_URL = 'http://localhost:3000/api/v1';

// Función para login (obtener token)
async function login() {
  try {
    const response = await fetch(`${API_URL}/pacientes/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'email@gmail.com',
        password: '12345'
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error de login:', data);
      return null;
    }
    
    console.log('Login exitoso:', data);
    return data.token;
  } catch (error) {
    console.error('Error de conexión:', error);
    return null;
  }
}

// Función para crear un paciente
async function crearPaciente(token) {
  try {
    const response = await fetch(`${API_URL}/pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        name: 'Paciente Prueba',
        email: 'paciente@test.com'
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error al crear paciente:', data);
      return null;
    }
    
    console.log('Paciente creado:', data);
    return data;
  } catch (error) {
    console.error('Error de conexión:', error);
    return null;
  }
}

// Función para crear un turno
async function crearTurno(token, pacienteId) {
  try {
    const response = await fetch(`${API_URL}/turnos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        fecha: '2025-06-10',
        hora: '15:30',
        pacienteId
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error al crear turno:', data);
      return null;
    }
    
    console.log('Turno creado:', data);
    return data;
  } catch (error) {
    console.error('Error de conexión:', error);
    return null;
  }
}

// Función para obtener los turnos de un paciente
async function obtenerTurnosPorPaciente(pacienteId) {
  try {
    const response = await fetch(`${API_URL}/turnos/${pacienteId}`);
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error al obtener turnos:', data);
      return null;
    }
    
    console.log('Turnos del paciente:', data);
    return data;
  } catch (error) {
    console.error('Error de conexión:', error);
    return null;
  }
}

// Función principal de prueba
async function ejecutarPruebas() {
  console.log('Iniciando pruebas de API de turnos...');
  
  // 1. Obtener token de autenticación
  const token = await login();
  if (!token) {
    console.error('No se pudo obtener token. Deteniendo pruebas.');
    return;
  }
  
  // 2. Crear un paciente de prueba
  const paciente = await crearPaciente(token);
  if (!paciente) {
    console.error('No se pudo crear paciente. Deteniendo pruebas.');
    return;
  }
  
  // 3. Crear un turno para el paciente
  const turno = await crearTurno(token, paciente.id);
  if (!turno) {
    console.error('No se pudo crear turno. Deteniendo pruebas.');
    return;
  }
  
  // 4. Obtener los turnos del paciente
  const turnos = await obtenerTurnosPorPaciente(paciente.id);
  
  console.log('Pruebas finalizadas.');
}

// Ejecutar las pruebas
ejecutarPruebas();
