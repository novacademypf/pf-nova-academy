import Layout from "../../Layout";

const MyAccount = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
  <div className="col-start-3 col-span-1 bg-purple-300 w-[15em] min-w-[15em] py-[2em] px-[1em] fixed z-50 left-0 h-[calc(100vh-5.5em)] flex flex-col justify-center">
    <div className="flex justify-center">
      <img className="w-[10em] h-[10em] mb-3 rounded-lg border-2 border-black" src="ruta-de-la-imagen" alt="Imagen de perfil" />
    </div>
    <div className="text-center">
      <h2 className="text-lg font-bold">Nombre del Usuario</h2>
      <p className="text-sm">Correo Electrónico</p>
    </div>
  </div>
  <div className="col-span-4 bg-blue-300 w-[60.3em] min-w-[15em] py-[0.5em] px-[2em] fixed z-50 right-0 top-[4.9em] text-lg font-bold">
    Cursos Creados
  </div>
  <div className="col-span-4 border-2 borde-red w-[60.3em] min-w-[15em] py-[4.7em] px-[2em] fixed z-50 right-0 top-[7.4em] text-lg font-bold">
    cursos
  </div>
  <div className="col-span-4 bg-blue-300 w-[60.3em] min-w-[15em] py-[0.5em] px-[2em] fixed z-50 bottom-60 right-0 text-lg font-bold">
    Cursos Comprados
  </div>
  <div className="col-span-4 w-[60.3em] min-w-[15em] py-[4.7em] px-[2em] fixed z-50 bottom-10 right-0 text-lg font-bold border-2 borde-red">
    curses
  </div>
</div>


  )
};

export default MyAccount;
