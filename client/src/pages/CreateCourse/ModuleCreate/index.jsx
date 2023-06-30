import React, { useState } from "react";
import CreateLesson from "../LessonCreate";

export default function FormCourse() {
  const [lesson, setLesson] = useState(0);
  const renderLesson = () => {
    return Array.from({ length: lesson }, (_, index) => (
      <CreateLesson key={index} />
    ));
  };

  const addLesson = () => {
    setLesson(lesson + 1);
  };

  const deleteLesson = () => {
    if (lesson === 0) return;
    setLesson(lesson - 1);
  };

  return (
    <div className="mx-7">
      <h1 className="text-2xl pt-10">DATOS DEL MODULO</h1>
      <div>
        <div className="flex flex-col pt-5">
          <label className="block mb-2 font-bold">Nombre:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
          />

          <label className="block mb-2 font-bold">Descripcion:</label>
          <textarea
            className="w-full p-2 mb-4 border border-gray-300 rounded resize-none"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
