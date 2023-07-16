import { Modal } from "flowbite-react";
import FormCourse from "../../CreateCourse/ModuleCreate";

export default function ModalModule({openModalModule,setOpenModalModule,idModule,}) {
    console.log(idModule)

  return (
    <>
      <Modal show={openModalModule} onClose={() => setOpenModalModule(false)}>
        <Modal.Header>Formulario de actualizacion</Modal.Header>
        <Modal.Body>
          <FormCourse />
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
