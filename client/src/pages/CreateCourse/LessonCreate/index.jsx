import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import api from "../../../services/api";
import { uploadFile } from "../../../firebase/config";
export default function CreateLesson({moduleId, lesson, setLesson}) {
  const dispatch = useDispatch();
  const [resource, setResource] = useState(null)
  const [lessonId, setLessonId] = useState(0)

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    resource:"",
  });
  const [form, setForm] = useState({
    title: "",
    content: "",
    resource:"",
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
  const deleteLesson= ()  => {
    api.delete(`/lesson/deleteLesson/${lessonId}`);
    if(lesson===0) return;
    setLesson(lesson - 1);
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    if(!form.title){
      return alert("Ingrese Titulo");
    } else if(!form.content){
      return alert("Ingrese Contenido");
    } 
    const body = {
      ...form,
      resource: await uploadFile(resource)
    }
    const lessonCreate = await api.post("/lesson/createLesson",
    {
      headers: {
        'Authorization': localStorage.getItem("token"),
        body,
        },
      });
      setLessonId(lessonCreate.data.id);
      alert("Leccion creada");
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
          />

          <label className="block mb-2 font-bold">Contenido:</label>
          <div>
            {errors.content && <span>{errors.content}</span>}
          </div>
          <textarea
            className="w-full p-2 mb-4 border border-gray-300 rounded resize-none"
            value={form.content}
            onChange={changeHandler}
            name="content"
          ></textarea>

          <label className="block mb-2 font-bold">Recurso:</label>
          <input
            type="file"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setResource(e.target.files[0])}
          />
        </div>
        
      </form>
      <div className="flex justify-center">
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={(e)=> submitHandler(e)}>crear Leccion</button>
        </div>
    </div>
  );
}
