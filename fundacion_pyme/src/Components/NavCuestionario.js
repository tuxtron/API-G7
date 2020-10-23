import React, { useState } from 'react';
import './NavCuestionario.css';
import chevron from './images/chevron-left-solid.svg';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalEjemplo } from './Modal';
import { Button } from 'react-bootstrap';


function NavCuestionario(props){
//   constructor(props){
//     super(props);
//     this.state = {
//       addModalShow : false,
//       modalType: "",
//     }
// }

  const [state, setState] = useState({
      addModalShow : false,
      modalType: "",
  });

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
        { props.children }
        <hr/>
        <div className="nav_accept_button">
        {  props.isSupervisor ? 
          <> 
              <Button 
                  className="nav_rechazarBtn"
                  onClick={()=> setState({addModalShow : true, modalType:"Rechazar"})}
                  >Rechazar Encuesta
              </Button>
              <Button 
                  className="nav_aprobarBtn"
                  onClick={()=> setState({addModalShow : true, modalType:"Aprobar"})}
                  >Aprobar Encuesta
              </Button>
              <ModalEjemplo
                  show = { state.addModalShow}
                  onHide = {addModalClose}
                  modalType = { state.modalType}
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


export default NavCuestionario
