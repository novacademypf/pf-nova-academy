import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Tabs, Badge, Accordion } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import ModalModule from "../Modal/Module";
import ModalLesson from "../Modal/Lesson";
import CreateCourse from "../../CreateCourse";
import ModalRating from "../Modal/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getCourseForSaleById } from "../../../redux/actions/coursesActions";
import axios from "axios";

export default function CoursesCreated() {
  const { id } = useParams();
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [openModalModule, setOpenModalModule] = useState(false);
  const [openModalLesson, setOpenModalLesson] = useState(false);
  const [openModalRating, setOpenModalRating] = useState(false);
  const [module, setModule] = useState({});
  const [lesson, setLesson] = useState({});
  const courseCreated = useSelector((state) => state.coursesReducer.courseById);
  const dispatch = useDispatch();
  const location = useLocation();

  const getModule = async (id) => {
    const response = await axios.get(`/module/${id}`);
    setModule(response.data);
  };
  const getLesson = async (id) => {
    const response = await axios.get(`/lesson/${id}`);
    setLesson(response.data);
  };
  useEffect(() => {
    dispatch(getCourseForSaleById(id));
  }, [dispatch]);

  if (Object.keys(courseCreated).length === 0) {
    // Renderizar un indicador de carga mientras se obtiene la información del curso
    return <p>Cargando...</p>;
  }

  const handleClickLesson = async (event) => {
    const id = event.target.value;
    getLesson(id);
    setOpenModalLesson(true);
  };

  const handleClickModule = async (event) => {
    const id = event.target.value;
    getModule(id);
    setOpenModalModule(true);
  };
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
          {!location.pathname.startsWith("/courses-purchased") ? (
            <div>
              <Button
                onClick={() => setOpenModalCourse(true)}
                className="absolute top-0 right-0 m-4 text-sm"
              >
                Editar
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setOpenModalRating(true)}
              className="absolute top-0 right-0 m-4 text-sm"
            >
              Reseña
            </Button>
          )}
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
                    <Accordion collapseAll key={lesson.id}>
                      <Accordion.Panel>
                        <Accordion.Title>
                          {lesson.title}
                          {!location.pathname.startsWith(
                            "/courses-purchased"
                          ) ? (
                            <button
                              value={lesson.id}
                              className="mx-10 text-sm bg-amber-200 rounded-full px-1"
                              onClick={handleClickLesson}
                            >
                              Editar
                            </button>
                          ) : null}
                        </Accordion.Title>
                        <Accordion.Content>
                          <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {lesson.content}
                          </p>
                          {/* <div className="w-full h-screen flex items-center justify-center">
                          <iframe src={lesson.resource} width="100%" height="600px"></iframe>
                          </div> */}
                        </Accordion.Content>
                      </Accordion.Panel>
                    </Accordion>
                  );
                })}
                {!location.pathname.startsWith("/courses-purchased") ? (
                  <button
                    value={module.id}
                    className="w-full"
                    onClick={handleClickModule}
                  >
                    Editar Modulo
                  </button>
                ) : null}
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
        module={module}
      />
      <ModalLesson
        openModalLesson={openModalLesson}
        setOpenModalLesson={setOpenModalLesson}
        lessons={lesson}
      />
      <ModalRating
        openModalRating={openModalRating}
        setOpenModalRating={setOpenModalRating}
      />
    </div>
  );
}
