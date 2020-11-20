import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import './Modal.css';


export class ModalUsuario extends Component {

  render(){
  return (
    <Modal
    {...this.props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
         {this.props.modalType}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="modal__bodyText">
        Estas por elmiminar un usuario, ¿Deseas continuar?
      </p>
    </Modal.Body>
    <Modal.Footer>
            <Button className="modal__cancelarBtn" onClick={this.props.onHide}>
              Cancelar
            </Button>
            <Button className="modal__eliminarBtn" onClick={this.props.onHide}>
              Elminar
            </Button>
        </Modal.Footer>
 
  </Modal>
);
}
}