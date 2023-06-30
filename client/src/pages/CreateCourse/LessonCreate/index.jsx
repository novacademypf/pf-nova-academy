export default function CreateLesson() {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center">DATOS DE LA LECCION</h1>
      <form className="flex flex-row justify-center bg-indigo-500">
        <div className="flex flex-col pt-10">
          <label className="block mb-2 font-bold">Titulo:</label>
          <input
            type="text"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />

          <label className="block mb-2 font-bold">Contenido:</label>
          <textarea
            className="w-full p-2 mb-4 border border-gray-300 rounded resize-none"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label className="block mb-2 font-bold">Recurso:</label>
          <input
            type="file"
            className="w-96 p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setModule(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
