import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { to: "/login", name: "Iniciar Sesión" },
    { to: "/category1", name: "Categoria Curso 1" },
    { to: "/category2", name: "Categoria Curso 2" },
    { to: "/category3", name: "Categoria Curso 3" },
    { to: "/category4", name: "Categoria Curso 4" },
  ];

  const activeStyle = "font-bold";
  return (
    <header className="bg-primary-blue h-8 flex items-center justify-between px-4 ">
      <div className="-mr-2  flex md:hidden">
        <button onClick={toggleMenu}>
          <svg
            className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div>
        <nav
          className={`bg-primary-purple fixed z-10 top-8 left-0 p-4 w-1/2  transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:static md:w-auto md:p-0 md:translate-x-0`}
        >
          <ul className="flex flex-col md:flex-row">
            {links.map((el) => (
              <NavLink
                key={el.name}
                to={el.to}
                className={({ isActive }) => (isActive ? activeStyle : "")}
                onClick={toggleMenu}
              >
                {el.name}
              </NavLink>
            ))}
          </ul>
        </nav>
        <NavLink to="/home">🎓</NavLink>
      </div>
      <nav>
        <ul className="flex">
          <li>
            <NavLink to="/account">👤</NavLink>
          </li>
          <li>
            <NavLink to="/checkout">🛒 0</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
