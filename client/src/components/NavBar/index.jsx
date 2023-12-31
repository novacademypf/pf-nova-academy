import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartAside } from "../ShoppingCartAside/ShoppingCartAside";
import { delFromCart } from "../../redux/actions/shoppingCartActions";
import { logout } from "../../redux/actions/profileActions";
import UserProfile from "../UserProfile/UserProfile";
import NavCart from "../NavCart/NavCart";
import LandingButtons from "../LandingButtons/LandingButtons";
import { getAllCourses } from "../../redux/actions/coursesActions";
/*eslint-disable*/
const NavBar = () => {
  const userProfile = useSelector((state) => state.profileReducer.userProfile);
  const courses = useSelector((state) => state.shoppingCartReducer.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation().pathname;
  let checkRoute = location === "/checkout" ? false : true;
  const isLog = localStorage.getItem("profileId");
  const navigate = useNavigate()
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

  const token = localStorage.getItem("token");

  useEffect(() => {
    //isUserLoggedIn && dispatch(getProfile());
    /* handleLocalStorage(courses); */
    if (!checkRoute) closeCart();
  }, [dispatch]);

  const links = [
    { to: "/courses", name: "Cursos" },
    // { to: "/create", name: "Crear curso" },
  ];
  const activeStyle = "font-bold mx-2 ";

  const handleLogout = () => {
    dispatch(logout());
    /* window.location.href = "/login"; */
    navigate('/login')
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

        <NavLink to="/">
          <img src={logo} alt="logo" className="w-24 h-auto basis-1/3" />
        </NavLink>
        <div>
          <nav
            className={` basis-1/3 fixed z-10   top-[88px] left-0 p-4 w-1/2 transform ${
              isOpen
                ? "translate-x-0 bg-purple-500 rounded-lg "
                : "-translate-x-full"
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
                  onClick={()=>{toggleMenu(),dispatch(getAllCourses())} }
                >
                  {el.name}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex ">
          {token ? (
            <UserProfile handleLogout={handleLogout} profile={userProfile} />
          ) : (
            <LandingButtons />
          )}
          <NavCart
            cartIsOpen={cartIsOpen}
            closeCart={closeCart}
            openCart={openCart}
            courses={courses}
          />
        </div>
      </div>

      {cartIsOpen && (
        <ShoppingCartAside
          openCart={openCart}
          closeCart={closeCart}
          cartItems={courses}
          deleteItemfromAside={deleteItemfromAside}
        />
      )}
    </nav>
  );
};

export default NavBar;
