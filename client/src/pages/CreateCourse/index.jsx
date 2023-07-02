import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions/categoryAction.js";
import FormCourse from "./ModuleCreate";
import axios from "axios";

export default function CreateCourse() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const [modules, setModules] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
      <FormCourse key={index} modules={modules} />
    ));
  };

  const addModule = async (event) => {
    event.preventDefault();
    if (!form.name) {
      return alert("Ingrese Nombre")
    } else if (!form.description) {
      return alert("Ingrese Descripcion")
    } else if (!form.duration) {
      return alert("Ingrese Duracion")
    } else if (!form.images) {
      return alert("Ingrese Imagen")
    } else if (!form.price) {
      return alert("Ingrese Precio")
    } else if (!form.category) {
      return alert("Selecione Categoria")
    }
    console.log(form.images)

    // crear boton submit para pushear todo al back, 
    // crear boton submit lecion para hacer el post de cada lecion en cada modulo.
    // revisar los axios




    // await axios.post("http://localhost:3001/courseForSale/createCourse", {
    //   ...form,
    //   idProfile: 1// Aquí debes añadir el ID del perfil correspondiente
    //   },
    //   {
    //   headers:{
    //     Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg4MjUyMzU2LCJleHAiOjE2ODgyNTk1NTZ9.8XJ0SexydPrtqZ7YUVM76wLSd9Bgiyj9IAUggS75qKw",
    //   },
    // });
    alert("Curso creado, Agrega modulos")
    setModules(modules + 1);
  };

  const deleteModule = () => {
    if (modules === 0) return;
    setModules(modules - 1);
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    // if(property === "images"){
    //   value=value.split(",");
    // }
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
    if (form.images.length === 0) {
      errores.images = "Ingrese un Imagen";
    } else {
      errores.images = "";
    }
    if (form.category.length === 0) {
      errores.category = "Seleccione una categoría";
    } else {
      errores.category = "";
    }
    return errores;
  };

  const categorySelectionHandler = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedCategoryIds = selectedOptions.map((option) => option.value);
    setSelectedCategories(selectedCategoryIds);
    setForm({ ...form, category: selectedCategoryIds });
  };
  const submitHandler= async (event)=>{
    event.preventDefault();
    alert ("Creado Correctamente")
    setErrors()
    setForm();
  }
  return (
    <div className="p-4">
      <h1 className="text-4xl text-center">DATOS DEL CURSO</h1>
      <form className="flex flex-row justify-center bg-indigo-500">
        <div className="flex flex-col pt-10">
          <label className="block mb-2 font-bold">Nombre:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.name}
            onChange={changeHandler}
            name="name"
          />
          <div>
            {errors.name && <span>{errors.name}</span>}
          </div>
          <label className="block mb-2 font-bold">Categoría:</label>
          <select
            id="category"
            name="category"
            onChange={categorySelectionHandler}
            multiple
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            // value={selectedCategories}
          >
            <option value="programacion">Programación</option>
            <option value="musica">Música</option>
            <option value="matematicas">Matemáticas</option>
            <option value="ciencia">Ciencia</option>
            {/* {categoryList.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name}
                </option>
              ))} */}
          </select>

          <div>
            {errors.category && <span>{errors.category}</span>}
          </div>
          <label className="block mb-2 font-bold">Duración:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.duration}
            onChange={changeHandler}
            name="duration"
          />
          <div>
            {errors.duration && <span>{errors.duration}</span>}
          </div>
        </div>

        <div className="flex flex-col pt-10 ml-20">
          <label className="block mb-2 font-bold">Descripción:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.description}
            onChange={changeHandler}
            name="description"
          />
          <div>
            {errors.description && <span>{errors.description}</span>}
          </div>
          <label className="block mb-2 font-bold">Imagen:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.images}
            onChange={changeHandler}
            name="images"
          />
          <div>
            {errors.image && <span>{errors.image}</span>}
          </div>
          <label className="block mb-2 font-bold">Precio:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.price}
            onChange={changeHandler}
            name="price"
          />
          <div>
            {errors.price && <span>{errors.price}</span>}
          </div>
        </div>
      </form>

      <div className="flex justify-center">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={addModule}
        >
          Agregar Módulo
        </button>

        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={deleteModule}
        >
          Eliminar Módulo
        </button>
      </div>

      <div className="flex flex-col justify-evenly">{renderModules()}</div>
      <button>submit</button>
    </div>
  );
}