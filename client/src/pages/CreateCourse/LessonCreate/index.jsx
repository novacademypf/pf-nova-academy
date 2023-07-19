import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import api from "../../../services/api";
import { uploadFile } from "../../../firebase/config";
import Swal from "sweetalert2";
import { getCourseForSaleById } from "../../../redux/actions/coursesActions";
import { useParams } from "react-router-dom";
export default function CreateLesson({moduleId, lesson, setLesson, setFlagFinally, lessons, setOpenModalLesson}) {
  const dispatch = useDispatch();
  const {id} = useParams()
  const [resource, setResource] = useState(null)
  const [lessonId, setLessonId] = useState(0)
  const [flagButton, setFlagButton] = useState(true)
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
  useEffect(() => {
    if (lessons !== undefined) {
      const {
        title,
        content,
      } = lessons;

      if (title && content) {
        setForm({
          title:title,
          content: content,
        });
      }
    }
  }, [lessons]);
  const validate = (form)=>{
    let errores = {};
    if(!form.title){
      errores.title = "Ingrese Titulo";
    } else {
      errores.title = "";
    }
    if(resource && resource.type && !resource.type.endsWith("pdf")){
      errores.resource = "Debe ser PDF";
    } else {
      errores.resource = "";
    }
    if(!form.content){
      errores.content = "Ingrese Contenido";
    } else {
      errores.content = "";
    }
    return errores;
  }
  const deleteLesson= ()  => {
    api.delete(`/lesson/deleteLesson/${lessons?.id}`);
    dispatch(getCourseForSaleById(id))
    setOpenModalLesson(false)
    // if(lesson===0) return;
    // setLesson(lesson - 1);
    Swal.fire({
      icon: "success",
      title: "Lección Eliminada Correctamente",
    });
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    if(resource && resource.type && !resource.type.endsWith("pdf")){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe ser PDF",
      });
    } else if(!form.title){
      // return alert("Ingrese Titulo");
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Titulo",
      });
    } else if(!form.content){
      // return alert("Ingrese Contenido");
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese Contenido",
      });
    } 
    const body = {
      ...form,
      resource: await uploadFile(resource)
    }
    if(location.pathname.startsWith("/courses-created")){
      console.log(body)
      await api.put(`/lesson/updateLesson/${lessons?.id}`, body,
    {
      headers: {
        'Authorization': localStorage.getItem("token"),
        },
      });
      dispatch(getCourseForSaleById(id))
      Swal.fire({
        icon: "success",
        title: "Actualizado Correctamente",
      });
    }else{
      const lessonCreate = await api.post("/lesson/createLesson", body,
    {
      headers: {
        'Authorization': localStorage.getItem("token"),
        },
      });
      setFlagButton(false)
      setLessonId(lessonCreate.data.id);
      setFlagFinally(true)
      Swal.fire({
        icon: "success",
        title: "Leccion creada",
      });
    }
    }
    


  return (
    <div className="m-7 px-6 bg-slate-50 rounded-lg">
      <h1 className="text-2xl text-center my-4">DATOS DE LA LECCION</h1>
      <form className="flex flex-row justify-center bg-white rounded-lg p-4 shadow-md">
        <div className="flex flex-col pt-5">
          <label className="block mb-2 font-bold">Titulo:</label>
          <div>
            {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title}</span>}
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
            {errors.content && <span className="text-red-500 text-xs mt-1">{errors.content}</span>}
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
            disabled={ !flagButton }
          />
        </div>
        
      </form>
      <div className="flex justify-center">
        {flagButton ? (
          location.pathname.startsWith("/courses-created") ? (
            <div className="flex justify-center">
            <button className="px-4 m-4 py-2 bg-amber-300 rounded hover:bg-amber-100" onClick={(e)=> submitHandler(e)}>Actualizar Leccion</button>
            <button className="px-4 m-4 py-2 text-white bg-red-700 rounded hover:bg-red-400" onClick={deleteLesson}>Eliminar Leccion</button>
            </div>
          ) : (
            <div className="flex justify-center">
            <button className="px-4 m-4 py-2 bg-cyan-300 rounded hover:bg-cyan-100" onClick={(e)=> submitHandler(e)}>Crear Leccion</button>
          </div>
          )
        )
        :null
      }
      </div>
    </div>
  );
}
