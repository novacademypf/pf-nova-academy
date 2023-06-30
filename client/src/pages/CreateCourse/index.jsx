import React, { useState } from "react";
import FormCourse from "./ModuleCreate";

export default function CreateCourse() {
  const [modules, setModules] = useState(0);

  const renderModules = () => {
    return Array.from({ length: modules }, (_, index) => (
      <FormCourse key={index} modules={modules} />
    ));
  };

  const addModule = () => {
    setModules(modules + 1);
  };

  const deleteModule = () => {
    if (modules === 0) return;
    setModules(modules - 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center">DATOS DEL CURSO</h1>
      <form className="flex flex-row justify-center bg-indigo-500">
        <div className="flex flex-col pt-10">
          <label className="block mb-2 font-bold">Nombre:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />

          <label className="block mb-2 font-bold">Categoría:</label>
          <select
            id="category"
            name="category"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="programacion">Programación</option>
            <option value="musica">Música</option>
            <option value="matematicas">Matemáticas</option>
            <option value="ciencia">Ciencia</option>
          </select>

          <label className="block mb-2 font-bold">Duración:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />
        </div>

        <div className="flex flex-col pt-10 ml-20">
          <label className="block mb-2 font-bold">Descripción:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />

          <label className="block mb-2 font-bold">Imagen:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />

          <label className="block mb-2 font-bold">Precio:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />
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
    </div>
  );
}
