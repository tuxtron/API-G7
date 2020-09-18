
import React from 'react';
import './Nav.css';

function Nav() {
    return (
            <div className="Nav">
                  <div className="nav-header">
                    <p className="nav_empresa" >
                      Programa SRL
                    </p>
                  </div>
                  <div className="nav-body">
                    <p className="nav__id">
                      ID: 11111
                    </p>
                    <p className="nav_encuesta">
                      Encuesta AAAAAAA
                    </p>
                    <p className="nav_fecha" >
                      Fecha de envio : 11/11/1111
                    </p>
                  </div>
            </div>
            )
  }
  export default Nav