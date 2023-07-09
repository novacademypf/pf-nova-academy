import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function CreateLesson({moduleId}) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    

  });
  const [form, setForm] = useState({
    title: "",
    content: "",
    idModule:moduleId
  });
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const updatedForm = { ...form, [property]: value };
    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };
  const validate = (form)=>{
    let errores = {};
    if(!form.title){
      errores.title = "Ingrese Titulo";
    } else {
      errores.title = "";
    }
    if(!form.content){
      errores.content = "Ingrese Contenido";
    } else {
      errores.content = "";
    }
    return errores;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center">DATOS DE LA LECCION</h1>
      <form className="flex flex-row justify-center bg-indigo-500">
        <div className="flex flex-col pt-10">
          <label className="block mb-2 font-bold">Titulo:</label>
          <div>
            {errors.title && <span>{errors.title}</span>}
          </div>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            value={form.title}
            onChange={changeHandler}
            name="title"
            // onChange={(e) => setModule(e.target.value)}
          />

          <label className="block mb-2 font-bold">Contenido:</label>
          <div>
            {errors.content && <span>{errors.content}</span>}
          </div>
          <textarea
            className="w-full p-2 mb-4 border border-gray-300 rounded resize-none"
            // onChange={(e) => setDescription(e.target.value)}
            value={form.content}
            onChange={changeHandler}
            name="content"
          ></textarea>

          <label className="block mb-2 font-bold">Recurso:</label>
          <input
            type="file"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />
        </div>
        <button>crear Leccion</button>
      </form>
    </div>
  );
}
