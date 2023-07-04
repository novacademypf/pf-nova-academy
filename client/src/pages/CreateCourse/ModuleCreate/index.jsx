import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CreateLesson from "../LessonCreate";
import axios from "axios";

export default function FormCourse() {
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState(0);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const renderLesson = () => {
    return Array.from({ length: lesson }, (_, index) => (
      <CreateLesson key={index} />
    ));
  };

  const addLesson = async (event) => {    
    event.preventDefault();
    if(!form.name){
      return alert("Ingrese Nombre");
    } else if(!form.description){
      return alert("Ingrese Descripcion");
    } 
    // await axios.post("http://localhost:3001/module/createModule", form, {
    //   headers:{
    //     Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg4MjUyMzU2LCJleHAiOjE2ODgyNTk1NTZ9.8XJ0SexydPrtqZ7YUVM76wLSd9Bgiyj9IAUggS75qKw",
    //   },
    // });
    alert("Modulo creado, Agrega leccion")
    setLesson(lesson + 1);
  };

  const deleteLesson = () => {
    if (lesson === 0) return;
    setLesson(lesson - 1);
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const updatedForm = { ...form, [property]: value };
    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };
  const validate = (form)=>{
    let errores = {};
    if(!form.name){
      errores.name = "Ingrese Nombre";
    } else {
      errores.name = "";
    }
    if(!form.description){
      errores.description = "Ingrese Descripcion";
    } else {
      errores.description = "";
    }
    return errores;
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
            // onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div>
            {errors.description && <span>{errors.description}</span>}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={addLesson}
        >
          Agregar Leccion
        </button>

        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={deleteLesson}
        >
          Eliminar Leccion
        </button>
      </div>

      <div className="flex flex-wrap justify-evenly">{renderLesson()}</div>
    </div>
  );
}