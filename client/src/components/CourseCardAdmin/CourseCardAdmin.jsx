
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCourse } from "../../redux/actions/coursesActions";
import axios from "axios";

/* eslint-disable */

const CourseCardAdmin = ({ dataCard }) => {
  const { id, name, price, description, images, category } = dataCard;
  const dispatch = useDispatch();

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/courses/${id}`)
      .then((response) => {
        // Despachar la acción de borrado del curso solo si la eliminación en el servidor fue exitosa
        dispatch(deleteCourse(id));
      })
      .catch((error) => {
        console.log(error);
      });
 
  };
  

  return (
    <div className="relative w-full max-w-sm shadow bg-gray-400 rounded-md p-3">
      <figure className=" relative  h-auto w-full">
        <span className="absolute bottom-0 left-0 bg-[#FFFFFF60] rounded-lg text-black text-xs m-2 px-3 py-0.5 ">
          {category[0]}
        </span>
        <Link to={`/detail/${id}`}>
          <img
            src="https://picsum.photos/800/600"
            alt={name}
            className="w-full rounded-lg object-cover "
          />
        </Link>
        
      </figure>
      <div className="flex flex-col justify-between mb-2">
        <span className="text-md font-bold">{name}</span>
        <span className="text-sm font-light">{description}</span>
        <span>⭐⭐⭐⭐⭐</span>
      </div>
      <div>
        <span className="text-lg font-medium">${price}</span>
        <button
           className="absolute bottom-0 right-1 flex justify-center items-center bg-red-500 text-white w-auto px-4 py-2 rounded-lg m-2 cursor-pointer"
           onClick={handleDelete}
           >
             BORRAR
        </button>
      </div>
    </div>
  );
};

export default CourseCardAdmin;