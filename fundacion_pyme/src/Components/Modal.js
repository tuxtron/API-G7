import React, { useState, Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import './Modal.css';
import { Link } from 'react-router-dom'


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
         {this.props.modalType} Encuesta
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="modal__bodyText">
        Estas por {this.props.modalType.toLowerCase()} este formulario, ¿Deseas continuar?
      </p>
    </Modal.Body>
    <Modal.Footer>
            <Button className="modal__cancelarBtn" onClick={this.props.onHide}>
              Cancelar
            </Button>
          <Link to="/home">
            <Button className="modal__guardarCambioBtn">
              Aceptar
            </Button>
          </Link>
        </Modal.Footer>
 
  </Modal>
);
}
}




