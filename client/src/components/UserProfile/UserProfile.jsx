import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

/*eslint-disable */
const UserProfile = ({ handleLogout, profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname;
  const profilePhoto = "https://source.unsplash.com/random/800x600/?avatar=1";

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, [location]);

  return (
    <div>
      <button
        className="relative flex items-center mx-4 "
        onClick={() => {
          handleToggle();
        }}
      >
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-2 ">
          <img
            src={profilePhoto}
            alt="avatar"
            className=" h-full object-cover object-center rounded-full"
          />
        </div>
      </button>

      <div
        className={`${
          isOpen ? "visible" : "hidden"
        } z-10 fixed top-[69px] right-1 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow`}
      >
        <NavLink to={"/account"}>
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{profile.name}</div>
            <div className="font-medium truncate">{profile.email}</div>
          </div>
        </NavLink>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <NavLink to="/create">
              <button type="button">Crear curso</button>
            </NavLink>
          </li>
          <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <NavLink to="/myorders">
              <button type="button">Mis ordenes</button>
            </NavLink>
          </li>

          <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button type="button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
