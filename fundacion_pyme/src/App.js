import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import ModalEjemplo from './Components/Modal';
import listaDePreguntas from './listaDePreguntas.json';

function App() {

  const [state, setState] = useState({
      isSupervisor:true,
  });


  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/login"> 
            
            </Route>
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
              <ModalEjemplo />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
