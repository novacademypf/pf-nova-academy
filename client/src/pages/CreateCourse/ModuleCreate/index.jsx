import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CreateLesson from "../LessonCreate";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCourseForSaleById } from "../../../redux/actions/coursesActions";
export default function FormCourse({
  courseId,
  setModules,
  modules,
  setFlagFinally,
  module
}) {
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState(0);
  const [moduleId, setModuleId] = useState(0);
  const [flagBotton, setFlagBotton] = useState(false);
  const location = useLocation()
  const {id} = useParams()
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [form, setForm] = useState({
    name: "",
    description: "",
    courseId: courseId,
  });

  useEffect(() => {
    if (module !== undefined) {
      const {
        name,
        description,
      } = module;

      if (name && description) {
        setForm({
          name: name,
          description: description,
        });
      }
    }
  }, [module]);
  
  const renderLesson = () => {
    return Array.from({ length: lesson }, (_, index) => (
      <CreateLesson
        key={index}
        moduleId={moduleId}
        lesson={lesson}
        setLesson={setLesson}
        setFlagFinally={setFlagFinally}
      />
    ));
  };

  const addLesson = async (event) => {
    event.preventDefault();
    setLesson(lesson + 1);
  };

  const deleteModule = () => {
    api.delete(`/module/deleteModule/${moduleId}`);
    if (modules === 0) return;
    setModules(modules - 1);
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
    } else {
      errores.name = "";
    }
    if (!form.description) {
      errores.description = "Ingrese Descripcion";
    } else {
      errores.description = "";
    }
    return errores;
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!form.name) {
      // return alert("Ingrese Nombre");
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Nombre",
      });
    } else if (!form.description) {
      // return alert("Ingrese Descripcion");
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Descripcion",
      });
    }
    const body = {
      ...form,
    };

    if(location.pathname.startsWith("/courses-created")){
      console.log(body)
      const response = await api.put(`/module/updateModule/${module?.id}`, body, {
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
      const moduleCreate = await api.post("/module/createModule", body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setFlagBotton(true);
      setModuleId(moduleCreate.data.id);
      Swal.fire({
        icon: "success",
        title: "Modulo creado, Agrega leccion",
      });
    }
  };
  return (
    <div className="my-4 px-10 bg-slate-100 shadow-md rounded-lg container">
      <h1 className="text-2xl pt-5">DATOS DEL MODULO</h1>
      <div>
        <div className="my-5 flex flex-col pt-5 bg-white rounded-lg p-8 shadow-md">
          <label className="block mb-2 font-bold">Nombre:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.name}
            onChange={changeHandler}
            name="name"
          />
          <div>
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">{errors.name}</span>
            )}
          </div>
          <label className="block mb-2 font-bold">Descripcion:</label>
          <textarea
            className="w-full p-2 mb-4 border border-gray-300 rounded resize-none"
            value={form.description}
            onChange={changeHandler}
            name="description"
          ></textarea>
          <div>
            {errors.description && (
              <span className="text-red-500 text-xs mt-1">
                {errors.description}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      {!flagBotton ? (
          location.pathname.startsWith("/courses-created") ? (
            <button
              className="px-4 m-4 py-2 text-white bg-amber-300 rounded hover:bg-amber-100"
              onClick={submitHandler}
            >
              Actualizar Modulo
            </button>
          ) : (
            <button
              className="px-4 m-4 py-2 bg-cyan-300 rounded hover:bg-cyan-100"
              onClick={submitHandler}
            >
              Crear Modulo
            </button>
          )
        ) : null}
        {flagBotton ? (
          <button
            className="px-4 m-4 py-2 bg-cyan-300 rounded hover:bg-cyan-100"
            onClick={addLesson}
          >
            Agregar Leccion
          </button>
        ) : null}
        <button
          className="px-4 m-4 py-2 text-white bg-red-700 rounded hover:bg-red-400"
          onClick={deleteModule}
        >
          Eliminar Modulo
        </button>
      </div>
      <div className="flex flex-wrap justify-evenly">{renderLesson()}</div>
    </div>
  );
}
