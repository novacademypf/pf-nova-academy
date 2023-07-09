import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CreateLesson from "../LessonCreate";
import api from "../../../services/api"

export default function FormCourse({ courseId, setModules, modules }) {
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState(0);
  const [moduleId, setModuleId] = useState(0)
  const [flagBotton, setFlagBotton] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [form, setForm] = useState({
    name: "",
    description: "",
    courseId: courseId
  });
  const renderLesson = () => {
    return Array.from({ length: lesson }, (_, index) => (
      <CreateLesson key={index} moduleId={moduleId} lesson={lesson} setLesson={setLesson} />
    ));
  };

  const addLesson = async (event) => {
    event.preventDefault();
    setLesson(lesson + 1);
  };

  const deleteModule = () => {
    api.delete(`/module/deleteModule/${moduleId}`)
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
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!form.name) {
      return alert("Ingrese Nombre");
    } else if (!form.description) {
      return alert("Ingrese Descripcion");
    }
    const body = {
      ...form,
    }
    const moduleCreate = await api.post("/module/createModule",
      {
        headers: {
          'Authorization': localStorage.getItem("token"),
          body,
        },
      });
    
    setFlagBotton(true)
    setModuleId(moduleCreate.data.id);
    alert("Modulo creado, Agrega leccion")
  }
  return (
    <div className="mx-7">
      <h1 className="text-2xl pt-10">DATOS DEL MODULO</h1>
      <div>
        <div className="flex flex-col pt-5">
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
          <label className="block mb-2 font-bold">Descripcion:</label>
          <textarea
            className="w-full p-2 mb-4 border border-gray-300 rounded resize-none"
            value={form.description}
            onChange={changeHandler}
            name="description"
          ></textarea>
          <div>
            {errors.description && <span>{errors.description}</span>}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      {!flagBotton ?
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={submitHandler}
          >
            Crear Modulo
          </button> : null}
          {flagBotton ?
          <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={addLesson}
        >
          Agregar Leccion
        </button>:
          null
        }
      </div>
      <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        onClick={deleteModule}>
        Eliminar Modulo
      </button>
      <div className="flex flex-wrap justify-evenly">{renderLesson()}</div>
    </div>
  );
}
