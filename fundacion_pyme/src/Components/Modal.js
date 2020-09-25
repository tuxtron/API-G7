import React, { useState, Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import './Modal.css';


export class ModalEjemplo extends Component {
  constructor(props){
      super(props);
  }
 
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
        Hola!
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        Estas por cambiar el estado del formulario, ¿Deseas continuar?
      </p>
    </Modal.Body>
    <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={this.props.onHide}>
            Guarcar Cambios
          </Button>
        </Modal.Footer>
 
  </Modal>
);
}
}




