import { useEffect, useState } from "react";
import validateForm from "./validate";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function FormRating({ setOpenModalRating }) {
  const [rating, setRating] = useState({ number: "", review: "" });
  const [errors, setErrors] = useState({ number: "", review: "" });
  const [isUpdate, setIsUpdate] = useState();
  const { id } = useParams();

  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  const verifyRating = async () => {
    const response = await axios.get(`/courseRating/${id}/profile`, {
      headers,
    });
    setIsUpdate(response.data.status);
    return response;
  };

  useEffect(() => {
    verifyRating();
  });

  const handleInputChange = (e) => {
    setRating({
      ...rating,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...rating,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    const { number, review } = errors;
    if (number !== undefined || review !== undefined) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe cumplir con todos los requerimientos.",
      });
    }
    const body = {
      rating: rating.number,
      review: rating.review,
    };

    if (isUpdate) {
      axios.put(`/courseRating/${id}/rate`, body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      Swal.fire({
        icon: "success",
        title: "Actualizado Correctamente",
      });
    } else {
      axios.post(`/courseRating/${id}/rate`, body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      Swal.fire({
        icon: "success",
        title: "Creado Correctamente",
      });
    }
    setOpenModalRating(false);
    setRating({ number: "", review: "" });
    setErrors({ number: "", review: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Calificación:
        </label>
        <input
          type="number"
          name="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={rating.number}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.number && (
          <span className="text-sm text-red-500">{errors.number}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Comentario:
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          name="review"
          value={rating.review}
          onChange={(e) => handleInputChange(e)}
        ></textarea>
        {errors.review && (
          <span className="text-sm text-red-500">{errors.review}</span>
        )}
      </div>
      <div className="flex justify-center">
        {isUpdate ? (
          <button
            type="submit"
            className="px-4 py-2 text-white bg-yellow-300 rounded hover:bg-blue-600"
          >
            Actualizar
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-blue-600"
          >
            Crear
          </button>
        )}
      </div>
    </form>
  );
}
