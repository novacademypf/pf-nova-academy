import { NavLink } from "react-router-dom";

const LandingButtons = () => {
  return (
    <ul className="flex flex-row">
      <li>
        <NavLink to="/register">
          <button
            type="button"
            className="bg-purple-500 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Crear Cuenta
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" id="login-status">
          <button
            type="button"
            className="bg-purple-500 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Iniciar Sesión
          </button>
        </NavLink>
      </li>
    </ul>
  );
};

export default LandingButtons;
