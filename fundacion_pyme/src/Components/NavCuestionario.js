import React, { Component } from 'react';
import './NavCuestionario.css';
import chevron from './images/chevron-left-solid.svg';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalEjemplo } from './Modal';
import { Button } from 'react-bootstrap';


export class NavCuestionario extends Component {
  constructor(props){
    super(props);
    this.state = {
      addModalShow : false,
      modalType: "",
    }
}

  render() {
    let addModalClose =() => this.setState({addModalShow : false});

    return (
        <>
        <div className="nav">
          <Link className="nav_button"
                to="/home">
                  <img
                  alt="<"
                  src={chevron}
                  className="nav_image"
                  /> Programas SRL</Link>
          <p/>
          <li>ID: 10204</li>
          <li>Encuesta: Calidad de empresa</li>
          <li>Fecha de envio: 29/08/2020</li>
          <hr/>
        </div>
        {this.props.children}
        <hr/>
        <div className="nav_accept_button">
        {  this.props.isSupervisor ? 
          <> 
              <Button 
                  className="nav_rechazarBtn"
                  onClick={()=> this.setState({addModalShow : true, modalType:"Rechazar"})}
                  >Rechazar Encuesta
              </Button>
              <Button 
                  className="nav_aprobarBtn"
                  onClick={()=> this.setState({addModalShow : true, modalType:"Aprobar"})}
                  >Aprobar Encuesta
              </Button>
              <ModalEjemplo
                  show = {this.state.addModalShow}
                  onHide = {addModalClose}
                  modalType = {this.state.modalType}
              />
            {/* <ModalEjemplo
            show = {this.state.addModalShow}
            onHide = {addModalClose}
            /> */}
          </> 
          : 
          <Link  to="/home" className="nav_enviarValidacionBtn">Enviar Validacion</Link>
        }
        </div>
        </>
    );
}
}

export default NavCuestionario
