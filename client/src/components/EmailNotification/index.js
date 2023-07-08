import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar y enviar los datos al servidor
    try {
      const response = await axios.post('/api/register', { name, email, password });
      console.log(response.data); // Registro exitoso

      // Mostrar mensaje de éxito o redireccionar a otra página
      // ...
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error o manejar el error de alguna manera
      // ...
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegistrationForm;
