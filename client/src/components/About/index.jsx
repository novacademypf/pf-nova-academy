const About = () => {
  return (
    <div id="mision y vision" className="bg-gray-100 py-12">
      <h2 className="text-3xl items-center font-bold mb-4 ">
        Misión, Visión y Valores
      </h2>
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap mb-8 items-center">
          <div className="w-full md:w-1/2 px-4">
            <img
              src="https://www.bizneo.com/blog/wp-content/uploads/2020/07/MISION-DE-LA-EMPRESA-Y-VISION-DE-LA-EMPRESA-810x455.jpg"
              alt="Imagen de la empresa"
              className="h-full"
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="-mx-4 max-w-screen-lg mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-2">Nuestra Misión</h3>
                <p className="text-gray-700 mb-4">
                  Nuestra misión es enfocarnos en las necesidades de nuestros
                  alumnos, transformandolas en una experiencia única. Con un
                  alto nivel académico como humano, acompañando siempre a la
                  evolución y desarrollo de quienes nos eligen. Ofrecer un
                  método de aprendizaje enfocado a ser intuitivo, de esta manera
                  el alumno asimila los conocimientos de manera simple, eficaz y
                  fluida.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Nuestra Visión</h3>
                <p className="text-gray-700 mb-4">
                  Nuestra visión? Ser el Centro de Capacitación más prestigioso
                  ofreciendo los mejores servicios para profesionales en cada
                  área pudiendo desarrollarse como alumno y como profesor, con
                  oportunidades laborales y educacionales genuinas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-30"></div>

      <div>
        <div className="max-w-screen-lg mx-auto px-6 w-full bg-gray-100">
          <h3 className="text-2xl font-bold mb-2">Nuestros Valores</h3>
          <ul className="list-disc text-gray-700">
            <li>Comunicación permanente, detallada y cercana con el alumno.</li>
            <li>
              Acción tutorial: seguimiento académico y atención personalizada.
            </li>
            <li>
              El uso de una metodología abierta, apoyada en las nuevas
              tecnologías.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default About;
