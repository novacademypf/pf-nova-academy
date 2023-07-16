import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import FormCourse from "./ModuleCreate";
import api from "../../services/api.js";
import { uploadFile } from "../../firebase/config";
import { useGoogleAuth } from "../../hooks/useGoogleAuth.jsx";
import Swal from "sweetalert2";

export default function CreateCourse() {
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state) => state.getAllCategories.categories
  );
  const [file, setFile] = useState(null);
  const [modules, setModules] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [flagBotton, setFlagBotton] = useState(false);
  const [flagFinally, setFlagFinally] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    category: [],
    duration: "",
    description: "",
    images: "",
    price: "",
  });
  const [form, setForm] = useState({
    name: "",
    category: [],
    duration: "",
    description: "",
    images: "",
    price: "",
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const renderModules = () => {
    return Array.from({ length: modules }, (_, index) => (
      <FormCourse
        key={index}
        modules={modules}
        courseId={courseId}
        setModules={setModules}
        setFlagFinally={setFlagFinally}
      />
    ));
  };

  const addModule = async (event) => {
    setModules(modules + 1);
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const updatedForm = { ...form, [property]: value };
    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };

  const validate = (form) => {
    let errores = {};
    if (!form.name) {
      errores.name = "Ingrese Nombre";
    } else if (form.name.match(/^[A-Za-z]+$/)) {
      errores.name = "";
    }
    if (!form.description) {
      errores.description = "Ingrese Descripcion";
    } else {
      errores.description = "";
    }
    if (!form.duration) {
      errores.duration = "Ingrese Duracion";
    } else {
      errores.duration = "";
    }
    if (!form.price) {
      errores.price = "Ingrese un Precio";
    } else if (!form.price.match(/^[0-9]+$/)) {
      errores.price = "Solo permite numeros";
    } else {
      errores.price = "";
    }
    if (file !== null) {
      errores.images = "";
    } else {
      errores.images = "Debes cargar una imagen";
    }
    if (form.category.length > 0) {
      errores.category = "";
    } else {
      errores.category = "Seleccione una categoría";
    }
    return errores;
  };

  const categorySelectionHandler = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedCategoryIds = selectedOptions.map((option) => option.value);
    setSelectedCategories(selectedCategoryIds);
    setForm({ ...form, category: selectedCategoryIds });
    setErrors(validate({ ...form, category: selectedCategoryIds }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!form.name) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Nombre",
      });
    } else if (!form.description) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Descripcion",
      });
    } else if (!form.duration) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Duracion",
      });
    } else if (!form.price) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Precio",
      });
    } else if (form.category.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Selecione Categoria",
      });
    } else if (!form.price.match(/^[0-9]+$/)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Precio solo permite numeros",
      });
    } else if (file === null) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese una Imagen",
      });
    }
    const body = {
      ...form,
      images: await uploadFile(file),
    };
    const coursecreate = await api.post("/courseForSale/createCourse",body, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setCourseId(coursecreate.data.id);
    setFlagBotton(true);
    Swal.fire({
      icon: "success",
      title: "Creado Correctamente",
    });
    setErrors({
      name: "",
      category: [],
      duration: "",
      description: "",
      images: "",
      price: "",
    });
  };
  const clearPage = () => {
    setFlagBotton(false);
    setModules(0);
    setFile(null);
    setForm({
      name: "",
      category: [],
      duration: "",
      description: "",
      images: "",
      price: "",
    });
    setErrors({
      name: "",
      category: [],
      duration: "",
      description: "",
      images: "",
      price: "",
    });
    setFlagFinally(false);
  };
  return (
    <div className="container mx-auto px-20 bg-cyan-100 rounded-lg">
      <h1 className="text-4xl text-center my-5 p-5">INFORMACION DEL CURSO</h1>
      <form className="flex flex-row justify-center bg-white rounded-lg p-8 shadow-md">
        <div className="flex flex-col">
          <label className="block mb-2 font-bold ">Nombre:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.name}
            onChange={changeHandler}
            name="name"
            required
          />
          <div>
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">{errors.name}</span>
            )}
          </div>
          <label className="block mb-2 font-bold ">Categoría:</label>
          <select
            id="category"
            name="category"
            onChange={categorySelectionHandler}
            multiple
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
          >
            {categoryList.map((op) => (
              <option key={op.id} value={op.name}>
                {op.name}
              </option>
            ))}
          </select>
          <div>
            {errors.category && (
              <span className="text-red-500 text-xs mt-1">
                {errors.category}
              </span>
            )}
          </div>
          <label className="block mb-2 font-bold ">Duración:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.duration}
            onChange={changeHandler}
            name="duration"
            required
          />
          <div>
            {errors.duration && (
              <span className="text-red-500 text-xs mt-1">
                {errors.duration}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col ml-8">
          <label className="block mb-2 font-bold ">Descripción:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.description}
            onChange={changeHandler}
            name="description"
            required
          />
          <div>
            {errors.description && (
              <span className="text-red-500 text-xs mt-1">
                {errors.description}
              </span>
            )}
          </div>
          <label className="block mb-2 font-bold  ">Imagen:</label>
          <input
            type="file"
            className="w-96 p-2 mb-4 border border-gray-200 rounded"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            name="images"
            required
          />

          

          

          <div>
            {errors.images && (
              <span className="text-red-500 text-xs mt-1">{errors.images}</span>
            )}
          </div>
          <label className="block mb-2 font-bold ">Precio:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.price}
            onChange={changeHandler}
            name="price"
            required
          />
          <div>
            {errors.price && (
              <span className="text-red-500 text-xs mt-1">{errors.price}</span>
            )}
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-4">
        {!flagBotton ? (
          <button
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500"
            onClick={submitHandler}
          >
            Crear Curso
          </button>
        ) : null}
        {flagBotton ? (
          <div>
            <button
              className="px-4 py-2 bg-cyan-300 rounded hover:bg-cyan-100"
              onClick={addModule}
            >
              Agregar Módulo
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col text- justify-evenly mt-4">{renderModules()}</div>
      <div>
        {flagFinally ? (
          <button
            onClick={clearPage}
            className="px-4 py-2  bg-green-500 rounded hover:bg-green-600"
          >
            Finalizar Creación
          </button>
        ) : null}
      </div>
    </div>
  );
}
