import SimpleChatBot from "react-simple-chatbot";
import { useState } from "react";
import Bot from "../../assets/icons/bot.svg";

const ChatBot = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  const toggleMaximize = () => {
    setIsMinimized(true);
  };

  return (
    <div className="fixed  bottom-0 right-0 z-50 p-4  ">
      {isMinimized ? (
        <button
          className="bg-purple-500  fixed bottom-28 right-12 p-2 rounded-full  h-32 w-32"
          onClick={toggleMinimize}
        >
          <img
            src={Bot}
            alt="Icono del chatbot"
            className="w-full h-full p-2"
          />
        </button>
      ) : (
        <SimpleChatBot
          steps={[
            {
              id: "1",
              message: "Hola! Soy Novabot. ¿Cuál es tu nombre?",
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              validator: (value) => {
                if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
                  return true;
                } else {
                  return "Oops, ingresa nombre valido";
                }
              },
              trigger: "3",
            },
            {
              id: "3",
              message: "Hola {previousValue}, ¡un gusto conocerte!",
              trigger: "4",
            },
            {
              id: "4",
              message: "¿Te puedo ayudar en algo?",
              trigger: "5",
            },
            {
              id: "5",
              options: [
                { value: "yes", label: "Sí", trigger: "6A" },
                { value: "no", label: "No", trigger: "6B" },
              ],
            },
            {
              id: "6A",
              message: "¡Genial! Cuéntame qué estás buscando...",
              trigger: "seleccion",
            },
            {
              id: "6B",
              message:
                "Ok, continúa navegando en nuestro sitio. Estaré aquí si me necesitas.",
              trigger: "Cierre",
            },

            {
              id: "Cierre",
              component: (
                <button
                  className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  href="http://localhost:5173/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMaximize}
                >
                  Cerrar Chat
                </button>
              ),
              end: true,
            },

            {
              id: "6BLink",
              component: (
                <a
                  className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  href="http://localhost:5173/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Registrate
                </a>
              ),
              end: true,
            },

            {
              id: "seleccion",
              options: [
                { value: "f", label: "Comprar cursos", trigger: "7A" },
                { value: "b", label: "Vender un curso", trigger: "7B" },
                {
                  value: "e",
                  label: "De que se trata Nova Academy?",
                  trigger: "7C",
                },
                {
                  value: "k",
                  label: "Cuales son los cursos disponibles?",
                  trigger: "7D",
                },
              ],
            },
            {
              id: "7ALink",
              component: (
                <a
                  className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  href="http://localhost:5173/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Registrate
                </a>
              ),
              trigger: "Cierre",
            },

            {
              id: "7A",
              message:
                "Para comprar un cursos necesitas registrarte en nuestro sitio, es muy simple ingresas aqui ",
              trigger: "7ALink",
            },

            {
              id: "7B",
              message:
                "Para vender un cursos necesitas registrarte en nuestro sitio, es muy simple ingresas aqui ",
              trigger: "7BLink",
            },
            {
              id: "7BLink",
              component: (
                <a
                  className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  href="http://localhost:5173/courses"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Registrate
                </a>
              ),
              trigger: "Cierre",
            },

            {
              id: "7C",
              message:
                "Somos una plataforma donde podes conseguir el cursos que necesitas o tambien vender cursos de un tema en el cual seas bueno ",
              trigger: "7CLink",
            },
            {
              id: "7CLink",
              component: (
                <a
                  className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  href="http://localhost:5173/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Qienes somos
                </a>
              ),
              trigger: "Cierre",
            },

            {
              id: "7D",
              message:
                'Para comprar un cursos necesitas registrarte en nuestro sitio, es muy simple ingresas aqui <a href="http://localhost:5173/register">REGISTRARSE</a>',
              trigger: "7DLink",
            },
            {
              id: "7DLink",
              component: (
                <a
                  className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  href="http://localhost:5173/courses"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cursos Disponibles
                </a>
              ),
              trigger: "Cierre",
            },
          ]}
        />
      )}
    </div>
  );
};

export default ChatBot;
