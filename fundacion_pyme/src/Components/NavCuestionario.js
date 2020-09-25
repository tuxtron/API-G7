import React from 'react';
import './NavCuestionario.css';
import chevron from './images/chevron-left-solid.svg';
import checksolid from './images/check-solid.svg'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import encuestas from '../data-table.json'

function NavCuestionario(props) {
    return (
      <>
        <div className="nav">
          <Link className="nav_button"
                to="/about">
                  <img
                  alt="<"
                  src={chevron}
                  className="nav_image"
                  /> Programas SRL</Link>
          <p/>
          <li>ID: 10204</li>
          <li>Encuesta: Calidad de empresa</li>
          <li>Fecha de envio: 29/08/2020</li>
        </div>
        {props.children}
        <div className="nav_accept_button">
        {  props.isSupervisor ? 
          <> 
            <button>Aprobar</button>
            <button>Rechazar</button>
          </> 
          : <button>Enviar Validacion</button>
        }
        </div>
      </>
    );
}

export default NavCuestionario