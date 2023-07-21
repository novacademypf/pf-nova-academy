import { Modal } from "flowbite-react";
import FormRating from "../FormRating";

export default function ModalRating({ openModalRating, setOpenModalRating }) {

  return (
    <>
      <Modal show={openModalRating} onClose={() => setOpenModalRating(false)}>
        <Modal.Header>Formulario de valoracion</Modal.Header>
        <Modal.Body>
            <FormRating setOpenModalRating={setOpenModalRating}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
