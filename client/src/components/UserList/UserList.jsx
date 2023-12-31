import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, toggleUserStatus } from '../../redux/actions/userActions';
import Swal from "sweetalert2";

const UserList = ({ profile }) => {
  const dispatch = useDispatch();
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = profile.slice(indexOfFirstUser, indexOfLastUser);


  useEffect(() => {
  }, [deletedUserIds]);

  const handleDeleteUser = (profileId) => {
    dispatch(deleteUser(profileId));
    setDeletedUserIds([...deletedUserIds, profileId]);
  };

  const handleToggleStatus = (profileId, status) => {
    
    dispatch(toggleUserStatus(profileId, status));
  };

  const showConfirmationAlert = (profileId, userName) => {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Está seguro que desea eliminar al usuario ${userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserWithAlert(profileId);
      }
    });
  };

  const showToggleStatusAlert = (profileId, userName, currentStatus) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'activar' : 'suspender';
    Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro que deseas ${action} la cuenta del usuario ${userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        handleToggleStatus(profileId, newStatus);
      }
    });
  };

  const showAlert = () => {
    Swal.fire({
      title: 'Éxito',
      text: 'Usuario eliminado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  };

  const deleteUserWithAlert = async (profileId) => {
    try {
      handleDeleteUser(profileId);
      showAlert();
    } catch (error) {
      showErrorAlert(error);
    }
  };

  const totalPages = Math.ceil(profile.length / usersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (currentUsers.length === 0) {
    return <h2>No existen usuarios registrados por el momento!</h2>;
  }

  return (
    <>
      <div className="xl:w-3/4 2xl:w-4/5 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Usuarios Activos {profile.length}</p>
          </div>
        </div>
        {currentUsers.map((user) => {
          if (deletedUserIds.includes(user.profileId)) {
            return null; // Omitir el renderizado del usuario eliminado
          }
          
          return (
            <div className="bg-white px-4 md:px-10 pb-5" key={user.profileId}>
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    <tr className="text-sm leading-none text-gray-600 h-16">
                      <td className="w-1/2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                            <img
                              className="hidden xl:block w-full"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEC-AcpMSEBeqwQdUVhjb5fciR-GG2-cuwQ&usqp=CAU"
                              alt="avatar"
                            />
                          </div>
                          <div className="pl-2">
                            <h2 className="text-sm font-medium leading-none text-gray-800">{user.name}</h2>
                          </div>
                        </div>
                      </td>
                      <td className="pl-16">
                        <p>{user.email}</p>
                      </td>

                      <td className="pl-16">
                        <p>{user.status}</p>
                      </td>

                      <td>
                      <button
  className="bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => showToggleStatusAlert(user.profileId, user.name, user.status)}
>
  {user.status ? 'Suspender cuenta' : 'Activar cuenta'}
</button>
                      </td>

                      {/* <td>
                        <button
                          className="bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          onClick={() => showConfirmationAlert(user.profileId, user.name)}
                        >
                          Eliminar
                        </button>
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
        <div className="flex items-center justify-center">
          <button className="bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handlePrevPage}
          >
            Anterior
          </button>
          <p className="mx-4">Página {currentPage} de {totalPages}</p>
          <button className="bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleNextPage}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default UserList;
