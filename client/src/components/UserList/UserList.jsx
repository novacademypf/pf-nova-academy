import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions/userActions';
import Swal from "sweetalert2";




const UserList = ({ users }) => {
  const dispatch = useDispatch();
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    // Realiza cualquier acción necesaria después de eliminar un usuario
    // Puede ser actualizar la lista de usuarios o cualquier otra acción
  }, [deletedUserIds]);

  const handleDeleteUser = (userId) => {
    console.log(userId);
    dispatch(deleteUser(userId));
    setDeletedUserIds([...deletedUserIds, userId]);
  };


  const showAlert = () => {
    Swal.fire({
      title: 'Éxito',
      text: 'Usuario eliminado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  };

  const deleteUserWithAlert = async (userId) => {
    try {
      handleDeleteUser(userId);
      showAlert();
    } catch (error) {
      showErrorAlert(error);
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);


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

  if(currentUsers === 0) {
    return <h2>No existen usuarios registrados por el momento</h2>
  }

  return (
    <>
            <div className="xl:w-3/4 2xl:w-4/5 w-full">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Usuarios Activos {users.length}</p>
                    </div>
                </div>
                {currentUsers.map((user) => {
                  if (deletedUserIds.includes(user.userId)) {
                    return null; // Omitir el renderizado del usuario eliminado
                  }
                  return (
                <div className="bg-white px-4 md:px-10 pb-5" key={user.userId}>
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <tbody>
                                <tr className="text-sm leading-none text-gray-600 h-16">
                                    <td className="w-1/2">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                                            <img
                                                  className="hidden xl:block w-full "
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

                                    <td>
                                    <button 
                                    className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"              
                                    onClick={() => deleteUserWithAlert(user.userId)}>Eliminar
                                             
                                    </button>
                                    </td>
                                </tr>
                                
                               
                            </tbody>
                            
                        </table>
                        
                        
                    </div>
                    
                    
                </div>
                
                 )})}
                 <div className="flex items-center justify-center">
                  <button className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"              

                  onClick={handlePrevPage}>Anterior</button>
                  <p className="mx-4">Página {currentPage} de {totalPages}</p>
                  <button className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"              

                  onClick={handleNextPage}>Siguiente</button>
                  </div>

            </div>
           
        </>



  );
};

export default UserList;
