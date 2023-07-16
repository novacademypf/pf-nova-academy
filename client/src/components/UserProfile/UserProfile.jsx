import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

/*eslint-disable */
const UserProfile = ({ handleLogout }) => {
  const userProfile = useSelector((state) => state.profileReducer.userProfile);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname;
  console.log(userProfile.photo);

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
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-2 object-cover">
          {userProfile.photo ? (
            <img src={userProfile.photo} alt="avatar" />
          ) : (
            <span className="text-sm text-gray-500">
              {userProfile.name.substr(0, 2)}
            </span>
          )}
        </div>
      </button>

      <div
        className={`${
          isOpen ? "visible" : "hidden"
        } z-10 fixed top-[69px] right-1 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow`}
      >
        <NavLink to={"/account"}>
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{userProfile.name}</div>
            <div class="font-medium truncate">{userProfile.email}</div>
          </div>
        </NavLink>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <NavLink to="/create">
              <button type="button">Crear curso</button>
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
