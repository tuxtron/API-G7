import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import ModalEjemplo from './Components/Modal';
import listaDePreguntas from './listaDePreguntas.json';
// import "./styles.css";
import Login from './Components/login'
import Tabla from './Components/Tabla'

function App() {

  const [state, setState] = useState({
      isSupervisor:false,
  });


  return (
    <Router>
          <div className="App">
          <Switch>
              <Route path="/home"> 
                  <Tabla/>
              </Route>
              <Route path="/detalle">
                {
                    listaDePreguntas.map((pregunta, index) => {
                          return  <Pregunta 
                                    key={index}
                                    objPregunta={pregunta}
                                    isSupervisor={state.isSupervisor} />
                    })
                }
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
