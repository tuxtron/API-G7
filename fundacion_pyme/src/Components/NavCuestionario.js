import React from 'react';
import './NavCuestionario.css';
import chevron from './images/chevron-left-solid.svg';
import checksolid from './images/check-solid.svg'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import encuestas from '../data-table.json'

function NavCuestionario(props) {
    return (
      <div>
        <Navbar classname="nav_item" bg="bg-white" variant="light">
          <Navbar.Brand href="/home">
            <img
              alt=""
              src={chevron}
              className="d-inline-block align-top"
            />{' '}
            Programas SRL
          </Navbar.Brand>
        </Navbar>
        <li>ID: 10204</li>
        <li>Encuesta: Calidad de empresa</li>
        <li>Fecha de envio: 29/08/2020</li>
      </div>

    );
}

export default NavCuestionario