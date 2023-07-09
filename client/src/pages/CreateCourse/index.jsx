import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import FormCourse from "./ModuleCreate";
import api from "../../services/api.js"
import { uploadFile } from "../../firebase/config";
import { useGoogleAuth } from "../../hooks/useGoogleAuth.jsx";
export default function CreateCourse() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.getAllCategories.categories);
  const [file, setFile] = useState(null)
  const [modules, setModules] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [courseId, setCourseId] = useState(0)
  const [flagBotton, setFlagBotton] = useState(false);
  const [flagFinally, setFlagFinally] = useState(false)
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
      <FormCourse key={index} modules={modules} courseId={courseId} setModules={setModules} setFlagFinally={setFlagFinally}/>
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
    if(!file){
      errores.images = "Debes cargar una imagen";
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
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!form.name) {
      return alert("Ingrese Nombre")
    } else if (!form.description) {
      return alert("Ingrese Descripcion")
    } else if (!form.duration) {
      return alert("Ingrese Duracion")
    } else if (!form.price) {
      return alert("Ingrese Precio")
    } else if (!form.category) {
      return alert("Selecione Categoria")
    } else if (!form.price.match(/^[0-9]+$/)) {
      return alert("Precio solo permite numeros");
    }
    const body = {
      ...form,
      images: await uploadFile(file)
    }
    const coursecreate = await api.post("/courseForSale/createCourse",
      {
        headers: {
          'Authorization': localStorage.getItem("token"),
          body,
        },
      }
    );
    setCourseId(coursecreate.data.id)
    setFlagBotton(true)
    alert("Creado Correctamente")
  }
  const clearPage = () => {
    setFlagBotton(false)
    setModules(0)
    setFile(null)
    setForm({
      name: "",
      category: [],
      duration: "",
      description: "",
      images: "",
      price: "",
    })
    setErrors({
      name: "",
      category: [],
      duration: "",
      description: "",
      images: "",
      price: "",
    })
    setFlagFinally(false)
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
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
          </div>
          <label className="block mb-2 font-bold">Categoría:</label>
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
            {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category}</span>}
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
            {errors.duration && <span className="text-red-500 text-xs mt-1">{errors.duration}</span>}
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
            {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description}</span>}
          </div>
          <label className="block mb-2 font-bold">Imagen:</label>
          <input
            type="file"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => { setFile(e.target.files[0])}}
            name="images"
          />
            {/* {file === null ?  <span className="text-red-500 text-xs mt-1">Debes poner una imagen</span> : null} */}
          <div>
            {errors.images && <span className="text-red-500 text-xs mt-1">{errors.images}</span>}
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
            {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price}</span>}
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        {!flagBotton ?
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={submitHandler}
          >
            Crear Curso
          </button> : null}
        {flagBotton ?
          <div>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={addModule}
            >
              Agregar Módulo
            </button>
          </div>
          :
          null
        }
      </div>
      
        <div className="flex flex-col justify-evenly">
          {renderModules()}
        </div>
      <div>
        {
          flagFinally ? 
          <button 
            onClick={clearPage}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >Finalizar Creacion</button>
          :
          null
        }
      </div>
      </div>
  );
}
