import { useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_nfxusdk",
        "template_5ncam6y",
        form.current,
        "LezlJegUkPK_3njsu"
      )
      .then(() => {
        Swal.fire({
          title: "Éxito",
          text: "El correo se envió correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        form.current.reset();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al enviar el correo",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error("Error sending email:", error);
      });
  };

  return (
    <div id="contact" className="bg-purple-500 h-96 w-full">
      <div className="w-full flex items-center justify-center my-12">
        <div className="absolute top-40 bg-white shadow rounded py-12 lg:px-28 px-8">
          <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
            Contactate con nosotros
          </p>

          <form ref={form} onSubmit={sendEmail}>
            <div className="md:flex items-center mt-12">
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Nombre
                </label>
                <input
                  tabIndex={0}
                  type="text"
                  name="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Email
                </label>
                <input
                  tabIndex={0}
                  type="email"
                  name="email"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Ingresa tu email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Consulta
                </label>
                <textarea
                  tabIndex={0}
                  role="textbox"
                  name="message"
                  type="name"
                  className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
                  defaultValue={""}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                type="submit"
                className=" mt-9 text-base font-semibold leading-none text-black py-4 px-10 bg-[#00FFFF] rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
