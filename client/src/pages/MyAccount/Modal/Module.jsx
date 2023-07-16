import { Modal } from "flowbite-react";
import FormCourse from "../../CreateCourse/ModuleCreate";
import axios from "axios";
import { useEffect } from "react";

export default function ModalModule({openModalModule,setOpenModalModule,module}) {
 
      console.log("module ",module)
  return (
    <>
      <Modal show={openModalModule} onClose={() => setOpenModalModule(false)}>
        <Modal.Header>Formulario de actualizacion</Modal.Header>
        <Modal.Body>
          <FormCourse module={module} />
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
