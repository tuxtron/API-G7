import React, { useState } from 'react';
import './NavCuestionario.css';
import chevron from './images/chevron-left-solid.svg';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './Modal'

function NavCuestionario(props) {

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
        {props.children}
        <hr/>
        <div className="nav_accept_button">
        {  props.isSupervisor ? 
          <> 
            <Link to="/home" className="nav_rechazarBtn">Rechazar Encuesta</Link>
            <Link to="/home" className="nav_aprobarBtn">Aprobar Encuesta</Link>
          </> 
          : <Link  to="/home" className="nav_enviarValidacionBtn">Enviar Validacion</Link>
        }
        </div>
      </>
    );
}

export default NavCuestionario