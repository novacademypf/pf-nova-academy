import React, { useState } from 'react';
import SimpleChatBot from 'react-simple-chatbot';


const ChatBot = () => {
    const [isMinimized, setIsMinimized] = useState(true);

    const toggleMinimize = () => {
      setIsMinimized(!isMinimized);
    };
  
    return (
      <div className="fixed bottom-0 right-0 z-50 p-4">
        {isMinimized ? (
          <button
            className="bg-blue-500 text-white p-2 rounded-full"
            onClick={toggleMinimize}
          >
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeiHnS1iG3ar2Dm8I2I3Iu8hB2fe1m-Sjs_UnqQAK9wehQU8S5"
              alt="Minimize Icon"
              className="h-6 w-6"
            />
          </button>
        ) : (
          <SimpleChatBot
            steps={[
              {
                id: '1',
                message: 'Hola! Soy Novabot. ¿Cuál es tu nombre?',
                trigger: '2',
              },
              {
                id: '2',
                user: true,
                validator: (value) => {
                  if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
                    return true;
                  } else {
                    return 'Por favor, ingresa un nombre válido';
                  }
                },
                trigger: '3',
              },
              {
                id: '3',
                message: 'Hola {previousValue}, ¡un gusto conocerte!',
                trigger: '4',
              },
              {
                id: '4',
                message: 'Te puedo ayudar en algo?',
                trigger: '5',
              },
              {
                id: '5',
                options: [
                  { value: 'yes', label: 'Sí', trigger: '6A' },
                  { value: 'no', label: 'No', trigger: '6B' },
                ],
              },
              {
                id: '6A',
                message: '¡Genial! Cuéntame qué estás buscando...',
                trigger: 'seleccion',
              },
              {
                id: '6B',
                message: 'Ok, continúa navegando en nuestro sitio. Estaré aquí si me necesitas.',
                end: true,
              },
              {
                id: 'seleccion',
                options: [
                  { value: 'f', label: 'Front-End', trigger: '7A' },
                  { value: 'b', label: 'Back-End', trigger: '7B' },
                ],
              },
        
            ]}
          />
        )}
      </div>
    );
  };
  
  export default ChatBot;