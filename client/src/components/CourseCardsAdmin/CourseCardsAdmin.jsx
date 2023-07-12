import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from "../../redux/actions/coursesActions";
import Swal from "sweetalert2";

const CourseCardsAdmin = ({ courses }) => {
  const dispatch = useDispatch();
  const [deletedCourseIds, setDeletedCourseIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const response = Object.values(courses);
  console.log (response);
  const currentCourses = response.slice(indexOfFirstCourse, indexOfLastCourse);


  useEffect(() => {
    // Realiza cualquier acción necesaria después de eliminar un curso
    // Puede ser actualizar la lista de cursos o cualquier otra acción
  }, [deletedCourseIds]);

  const handleDeleteCourse = (id) => {
    console.log(id);
    dispatch(deleteCourse(id));
    setDeletedCourseIds([...deletedCourseIds, id]);
  };

  const showAlert = () => {
    Swal.fire({
      title: 'Éxito',
      text: 'Curso eliminado correctamente',
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

  const deleteCourseWithAlert = async (id) => {
    try {
      handleDeleteCourse(id);
      showAlert();
    } catch (error) {
      showErrorAlert(error);
    }
  };

  const totalPages = Math.ceil(courses.length / coursesPerPage);

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

  if (currentCourses.length === 0) {
    return <h2>No existen cursos registrados por el momento</h2>;
  }

  return (
    <>
      <div className="xl:w-3/4 2xl:w-4/5 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Cursos Activos ({courses.length})
            </p>
          </div>
        </div>
        {currentCourses.map((course) => {
          if (deletedCourseIds.includes(course.id)) {
            return null; // Omitir el renderizado del curso eliminado
          }
          return (
            <div className="bg-white px-4 md:px-10 pb-5" key={course.id}>
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    <tr className="text-sm leading-none text-gray-600 h-16">
                      <td className="w-1/2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                            <img
                              className="hidden xl:block w-full"
                              src="ruta-a-la-imagen-del-curso"
                              alt="avatar"
                            />
                          </div>
                          <div className="pl-2">
                            <h2 className="text-sm font-medium leading-none text-gray-800">
                              {course.name}
                            </h2>
                          </div>
                        </div>
                      </td>
                      <td className="pl-16">
                        <p>{course.description}</p>
                      </td>
                      <td>
                        <button
                          className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                          onClick={() => deleteCourseWithAlert(course.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-center">
          <button
            className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={handlePrevPage}
          >
            Anterior
          </button>
          <p className="mx-4">
            Página {currentPage} de {totalPages}
          </p>
          <button
            className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={handleNextPage}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseCardsAdmin;
