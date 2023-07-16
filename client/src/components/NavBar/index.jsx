import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartAside } from "../ShoppingCartAside/ShoppingCartAside";
import { delFromCart } from "../../redux/actions/shoppingCartActions";
import { getProfile, logout } from "../../redux/actions/profileActions";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const courses = useSelector((state) => state.shoppingCartReducer.cart);
  const userProfile = useSelector((state) => state.profileReducer.userProfile);
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  let checkRoute = location === "/checkout" ? false : true;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openCart = () => {
    setCartIsOpen(true);
  };

  const closeCart = () => {
    setCartIsOpen(false);
  };

  const deleteItemfromAside = (id) => {
    dispatch(delFromCart(id));
  };

  let cartStorage = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  const handleLocalStorage = (data) => {
    /* if (cartStorage.length > 0 && !data.length) {
      cartStorage.forEach((el) => {
        dispatch(addToCart(el));
      });
    } */

    localStorage.removeItem("shoppingCart");
    localStorage.setItem("shoppingCart", JSON.stringify(data));
  };

  const token = localStorage.getItem("token");
  const isUserLoggedIn = token !== null && token !== "";

  useEffect(() => {
    dispatch(getProfile());

    handleLocalStorage(courses);
    if (!cartIsOpen) courses.length > 0 && openCart();
    if (!checkRoute) closeCart();

    setLoggedIn(isUserLoggedIn);
  }, [courses, dispatch, isUserLoggedIn]);

  const links = [
    { to: "/courses", name: "Cursos" },
    // { to: "/create", name: "Crear curso" },
  ];
  const activeStyle = "font-bold mx-2";

  const handleLogout = () => {
    dispatch(logout());
    setLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-[#00FFFF] h-[5.5em] top-0 z-40 sticky w-full">
      <div className="max-w-screen-xl h-auto flex flex-wrap items-center justify-between p-4 mx-auto">
        <div className="-mr-2 flex basis-1/3 md:hidden">
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

        <NavLink to="/home">
          <img src={logo} alt="logo" className="w-24 h-auto basis-1/3" />
        </NavLink>
        <div>
          <nav
            className={`bg-primary-purple basis-1/3 fixed z-10 top-16 left-0 p-4 w-1/2 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:static md:w-auto md:p-0 md:translate-x-0`}
          >
            <ul className="flex flex-col md:flex-row">
              {links.map((el) => (
                <NavLink
                  key={el.name}
                  to={el.to}
                  className={({ isActive }) =>
                    isActive ? activeStyle : "mx-2"
                  }
                  onClick={toggleMenu}
                >
                  {el.name}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <ul className="flex">
            <li>
              {!loggedIn ? (
                <NavLink to="/register">
                  <button
                    type="button"
                    className="bg-purple-500 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Crear Cuenta
                  </button>
                </NavLink>
              ) : null}
            </li>
            <li>
              {!loggedIn ? (
                <NavLink to="/login" id="login-status">
                  <button
                    type="button"
                    className="bg-purple-500 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Iniciar Sesión
                  </button>
                </NavLink>
              ) : (
                <>
                  {userProfile && (
                    <li className="relative flex items-center">
                      <NavLink to="/account">
                        {userProfile.photo ? (
                          <img
                            src={userProfile.photo}
                            alt={userProfile.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <span className="text-sm text-gray-500">
                              {userProfile.name.substr(0, 2)}
                            </span>
                          </div>
                        )}
                        <span className="text-sm">{userProfile.name}</span>
                      </NavLink>
                    </li>
                  )}
                  {loggedIn && (
                    <li>
                      <NavLink to="/create">
                        <button
                          type="button"
                          className="bg-purple-500 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Crear curso
                        </button>
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="bg-purple-500 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </li>
            <li className="flex">
              <button
                onClick={() => {
                  cartIsOpen ? closeCart() : openCart();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c-.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </button>
              {courses.length}
            </li>
          </ul>
        </div>
      </div>

      {cartIsOpen && (
        <ShoppingCartAside
          openCart={openCart}
          closeCart={closeCart}
          cartItems={courses}
          cartLocal={cartStorage}
          deleteItemfromAside={deleteItemfromAside}
        />
      )}
    </nav>
  );
};

export default NavBar;
