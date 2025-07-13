import React, { useState, useEffect } from 'react';
import './App.css';
import BookTable from './components/library/BookTable.jsx';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [mail, setMail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => setIsLoggedIn(true))
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        mail,
        contrasena
      });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setError('');
    } catch (err) {
      setError('Credenciales incorrectas o error en el servidor.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/register', {
        mail,
        contrasena
      });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setError('');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Error al registrarse.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>Biblioteca Personal</h1>

      {!isLoggedIn ? (
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="login-form">
          <h2>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>
          <input
            type="email"
            placeholder="Correo"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">{isRegistering ? 'Registrarme' : 'Ingresar'}</button>
          <p className="toggle-form">
            {isRegistering ? '¿Ya tenés cuenta?' : '¿No tenés cuenta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}
            >
              {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </p>
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
          <BookTable />
        </>
      )}
    </div>
  );
}

export default App;
