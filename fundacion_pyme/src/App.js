import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Pregunta from './Components/Pregunta';
import NavCuestionario from './Components/NavCuestionario';
import Tabla from './Components/Tabla';
import Sidebar from './Components/Sidebar';
import Usuarios from './Components/Usuarios';
import AltaUsuario from './Components/altaUsuario'
import Login from './Components/login'

import './App.css';
import listaDePreguntas from './listaDePreguntas.json';
import listaDeEncuentas from './lista_encuentas_la_posta.json';

function App() {

  const [state, setState] = useState({
      isSupervisor:true,
  });


  return (
    <Router>
          <div className="App">
          <Switch>
              <Route path="/home"> 
                  <div className="app__home">
                    <Sidebar isSupervisor={state.isSupervisor}/>
                    <Tabla/>
                  </div>
              </Route>
              <Route path="/usuarios"> 
                  <div className="app__home">
                    <Sidebar isSupervisor={state.isSupervisor}/>
                    <Usuarios />
                  </div>
              </Route>
              <Route path="/altaUsuario"> 
                  <div className="app__home">
                    <Sidebar isSupervisor={state.isSupervisor}/>
                    <AltaUsuario />
                  </div>
              </Route>
              <Route path="/detalle">
                <div className="app__home">
                <Sidebar isSupervisor={state.isSupervisor}/>
                    <div className="app__navPregunta">
                    <NavCuestionario 
                    isSupervisor={state.isSupervisor}>
                      {
                          listaDePreguntas.map((pregunta, index) => {
                                return  <Pregunta 
                                          key={index}
                                          objPregunta={pregunta}
                                          isSupervisor={state.isSupervisor} />
                          })
                      }
                    </NavCuestionario>
                    </div>
                </div>
            </Route>
            <Route path="/nav">
              <NavCuestionario 
                isSupervisor={state.isSupervisor}>Preguntas</NavCuestionario>
            </Route>
              <Route path="/"> 
                 <Login />
              </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
