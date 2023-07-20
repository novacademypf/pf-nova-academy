import { Modal } from "flowbite-react";
import CreateLesson from "../../CreateCourse/LessonCreate";

export default function ModalLesson({openModalLesson,setOpenModalLesson,lessons}) {
  return (
    <>
      <Modal show={openModalLesson} onClose={() => setOpenModalLesson(false)}>
        <Modal.Header>Formulario de actualizacion</Modal.Header>
        <Modal.Body>
          {/* <FormCourse module={module} /> */}
          <CreateLesson lessons={lessons} setOpenModalLesson={setOpenModalLesson}/>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModalModule(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModalModule(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
