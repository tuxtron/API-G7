import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import NavCuestionario from './Components/NavCuestionario';
import Tabla from './Components/Tabla';
import Sidebar from './Components/Sidebar';
import listaDePreguntas from './listaDePreguntas.json';
import Login from './Components/login'

function App() {

  const [state] = useState({
      isSupervisor:true,
  });


  return (
    <Router>
          <div className="App">
          <Switch>
              <Route path="/home"> 
                  <div className="app__home">
                    <Sidebar />
                    <Tabla/>
                  </div>
              </Route>
              <Route path="/detalle">
                <div className="app__home">
                <Sidebar />
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
