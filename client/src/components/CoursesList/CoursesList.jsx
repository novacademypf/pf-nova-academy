import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../redux/actions/coursesActions';
import Swal from 'sweetalert2';

const CoursesList = ({ courses }) => {
  const arrayCourses = courses.courseAll;
  const courseCount = courses.courseCount;

  const dispatch = useDispatch();
  const [deletedCourseIds, setDeletedCourseIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5; // Número de cursos por página
  const totalpag = Math.ceil(courseCount / perPage); // número de páginas totales

  const handleDeleteCourse = (courseId) => {
    dispatch(deleteCourse(courseId));
    setDeletedCourseIds([...deletedCourseIds, courseId]);
  };

  const showConfirmationAlert = (courseId, courseName) => {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Está seguro que desea eliminar el curso ${courseName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourseWithAlert(courseId);
      }
    });
  };

  const showAlert = () => {
    Swal.fire({
      title: 'Éxito',
      text: 'Curso eliminado correctamente',
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

  const deleteCourseWithAlert = async (courseId) => {
    try {
      handleDeleteCourse(courseId);
      showAlert();
    } catch (error) {
      showErrorAlert(error);
    }
  };

  const totalPageCount = Math.ceil(courseCount / perPage);

  const indexOfLastCourse = currentPage * perPage;
  const indexOfFirstCourse = indexOfLastCourse - perPage;
  const currentCourses = arrayCourses ? arrayCourses.slice(indexOfFirstCourse, indexOfLastCourse) : [];

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (courseCount === 0) {
    return <h2>No existen cursos registrados por el momento</h2>;
  }

  return (
    <div className="xl:w-3/4 2xl:w-4/5 w-full">
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="sm:flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Cursos Activos ({courseCount})
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
                          {course.imageUrl && (
                            <img
                              className="hidden xl:block w-full"
                              src={course.imageUrl}
                              alt="avatar"
                            />
                          )}
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
                        className="bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => showConfirmationAlert(course.id, course.name)}
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
          className="bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={goToPreviousPage}
        >
          Anterior
        </button>
        <p className="mx-4">Página {currentPage} de {totalpag}</p>
        <button
          className="bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={goToNextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CoursesList;
