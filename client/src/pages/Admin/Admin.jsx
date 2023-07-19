import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import admin from '../../../../api/src/constants/dataAdmin';


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para indicar si el usuario ha iniciado sesión


  const navigate = useNavigate();

  const handleLogin = () => {
    const adminUser = admin.find((user) => user.email === email && user.password === password);

    if (adminUser) {
      setIsLoggedIn(true); // Marcar al usuario como autenticado
      navigate('/adminhome');
    } else {
      // El correo electrónico o la contraseña no son válidos, muestra un mensaje de error
      setError('El correo electrónico o la contraseña ingresados no son válidos');
    }
  };
  
  
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://www.smartpos.website/Login.jpg"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1 text-center" >Ingreso de Administrador</label>
          
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            --
          </p>
        </div>

        <input
  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
  type="text"
  placeholder="Dirección de correo electrónico"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<input
  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
  type="password"
  placeholder="Contraseña"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-4 flex justify-between font-semibold text-sm">
          
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        
      </div>
    </section>
  );
  };

export default Admin;
