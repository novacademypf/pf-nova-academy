import React, { useState } from "react";
import FormCourse from "./Form-Create";

export default function CreateCourse() {
  const [modules, setModules] = useState(3);

  const renderModules = () => {
    return Array.from({ length: modules }, (_, index) => (
      <FormCourse key={index} />
    ));
  };

  const addModule = () => {
    setModules(modules + 1);
  };

  const deleteModule = () => {
    if (modules === 1) return;
    setModules(modules - 1);
  };

  return (
    <div>
      <label>Nombre del curso:</label>
      <input
        type="text"
        placeholder="Escribe el nombre del curso."
        onChange={(e) => setModule(e.target.value)}
      />
      <br />
      <label>Descripcion del curso</label>
      <input
        type="text"
        placeholder="Escribe una descripcion del curso."
        onChange={(e) => setModule(e.target.value)}
      />
      <br />
      <label for="categorias">Selecciona una categoria:</label>
      <select id="fruits" name="fruits">
        <option value="programacion">programacion</option>
        <option value="musica">musica</option>
        <option value="matematicas">matematicas</option>
        <option value="ciencia">ciencia</option>
      </select>
      <br />
      {renderModules()}
      <button onClick={addModule}>Agregar Módulo</button>
      <br />
      <button onClick={deleteModule}>Eliminar Módulo</button>
    </div>
  );
}
