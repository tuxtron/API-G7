import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import './Modal.css';


function ModalEjemplo() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Title  closeButton></Modal.Title>
        <Modal.Header className="modal_title">Hola!
        </Modal.Header>
        <Modal.Body>Estas por cambiar este formulario, ¿Quéres continuar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEjemplo;


