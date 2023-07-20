import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import FormCourse from "./ModuleCreate";
import axios from "axios";
import { uploadFile } from "../../firebase/config";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
import { getCourseForSaleById } from "../../redux/actions/coursesActions";
export default function CreateCourse({ courseUpdate }) {
  const {id} = useParams()
  const dispatch = useDispatch()
  const categoryList = useSelector(
    (state) => state.getAllCategories.categories
  );
  const [file, setFile] = useState(null);
  const [modules, setModules] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [flagBotton, setFlagBotton] = useState(false);
  const [flagFinally, setFlagFinally] = useState(false);
  const location = useLocation();
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

    if (courseUpdate !== undefined) {
      const {
        name,
        category,
        duration,
        description,
        images,
        price,
      } = courseUpdate;

      if (name && category && duration && description && images && price) {
        setForm({
          name: name,
          category: category,
          duration: duration,
          description: description,
          images: images,
          price: price,
        });
      }
    }
  }, [dispatch, courseUpdate]);

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
    } else if (!form.price.toString().match(/^[0-9]+$/)) {
      errores.price = "Solo permite numeros";
    } else {
      errores.price = "";
    }
    if (file !== null) {
      errores.images = "";
    } else {
      errores.images = "Debes cargar una imagen";
    }
    if(file && file.type && !file.type.startsWith("image")){
      errores.images="Solo permite imagenes"
    } else{
      errores.images = "";
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
    if(file && file.type && !file.type.startsWith("image")){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe ser una Imagen",
      });
    } else if (!form.name) {
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
    } else if (!form.price.toString().match(/^[0-9]+$/)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Precio solo permite numeros",
      });
    } else if (courseUpdate === undefined) {
      if (file === null) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingrese una Imagen",
        });
      }
    }
    console.log("file createCourse: ", file)
    const body = file
      ? {
          ...form,
          images: await uploadFile(file),
        }
      : { ...form };

    if (location.pathname.startsWith("/courses-created")) {
      await axios.put(`/courseForSale/updateCourse/${courseUpdate?.id}`, body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getCourseForSaleById(id))
      Swal.fire({
        icon: "success",
        title: "Actualizado Correctamente",
      });
    } else {
      const coursecreate = await axios.post("/courseForSale/createCourse", body, {
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
    }

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
    <div className="container mx-auto px-20 bg-slate-300 rounded-lg">
      <h1 className="text-4xl text-center my-5 p-5">INFORMACION DEL CURSO</h1>
      <form className="flex flex-row flex-wrap justify-center bg-white rounded-lg p-8 shadow-md">
        <div className="flex flex-col mx-2">
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
            value={courseUpdate?.category}
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
        <div className="flex flex-col mx-2">
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
          location.pathname.startsWith("/courses-created") ? (
            <button
              className="px-4 py-2 bg-amber-300 rounded hover:bg-amber-100"
              onClick={submitHandler}
            >
              Actualizar Datos
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-cyan-300 rounded hover:bg-cyan-100"
              onClick={submitHandler}
            >
              Crear Curso
            </button>
          )
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

      <div className="flex flex-col text- justify-evenly mt-4">
        {renderModules()}
      </div>
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
