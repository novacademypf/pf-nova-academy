import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Tabs, Badge, Accordion } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import ModalModule from "../Modal/Module";
import CreateLesson from "../../CreateCourse/LessonCreate";
import CreateCourse from "../../CreateCourse";

export default function CoursesCreated() {
  const { id } = useParams();
  const [courseCreated, setCourseCreated] = useState({});
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [openModalModule, setOpenModalModule] = useState(false);
  const [idModule, setIdModule] = useState(0);

  const getCourseCreated = async () => {
    const response = await axios.get(
      `http://localhost:3001/courseForSale/${id}`
    );
    const courseCreated = response.data;
    setCourseCreated(courseCreated);
    return courseCreated;
  };

  useEffect(() => {
    getCourseCreated();
  }, []);

  if (Object.keys(courseCreated).length === 0) {
    // Renderizar un indicador de carga mientras se obtiene la información del curso
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Card className="container mx-auto mt-10 relative">
        <div>
          <img
            src={courseCreated.images}
            alt="Meaningful alt text for an image that is not purely decorative"
            className="object-cover w-full h-80"
          />
          <Badge color="info" className="absolute top-0 left-0 m-4 text-sm">
            {courseCreated.category}
          </Badge>
          <Badge
            color="purple"
            className="absolute botton-0 right-0 m-4 text-sm"
          >
            {courseCreated.duration}
          </Badge>
          <Button
            onClick={() => setOpenModalCourse(true)}
            className="absolute top-0 right-0 m-4 text-sm"
          >
            Editar
          </Button>
          {courseCreated.duration}
        </div>
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>{courseCreated.name}</p>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {courseCreated.description}
          </p>
        </div>
        <Tabs.Group aria-label="Pills" style="pills">
          {courseCreated?.Modules?.map((module) => {
            return (
              <Tabs.Item key={module.id} title={module.name}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {module.description}
                </p>
                {module.Lessons.map((lesson) => {
                  return (
                    <Accordion key={lesson.id}>
                      <Accordion.Panel>
                        <Accordion.Title>{lesson.title}</Accordion.Title>
                        <Accordion.Content>
                          <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {lesson.content}
                          </p>
                        </Accordion.Content>
                      </Accordion.Panel>
                    </Accordion>
                  );
                })}
                <Button
                  className="tabs__item__title"
                  onClick={() => {setIdModule(module.id), setOpenModalCourse(true)}}
                >
                  Editar Modulo
                </Button>
              </Tabs.Item>
            );
          })}
        </Tabs.Group>
      </Card>

      <Modal show={openModalCourse} onClose={() => setOpenModalCourse(false)}>
        <Modal.Header>Formulario de Actualizacion:</Modal.Header>
        <Modal.Body>
          {/* <FormCourse moduleUpdate = {courseCreated.Modules} />
          <CreateLesson /> */}
          <CreateCourse courseUpdate={courseCreated} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
      <ModalModule
        openModalModule={openModalModule}
        setOpenModalModule={setOpenModalModule}
        idModule={idModule}
      />
    </div>
  );
}
