import React, { useState } from "react";

export default function FormCourse() {
  const [module, setModule] = useState();

  return (
    <div>
      {/* {module.map((e, i) => {
        return (
          <div key={i}>
            <h1>{e.name}</h1>
            <h2>{e.apellido}</h2>
          </div>
        );
      })} */}
    </div>
  );
}
