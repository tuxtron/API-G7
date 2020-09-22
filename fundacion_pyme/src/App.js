import React, { useState } from 'react';
import './App.css';
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
import { Button } from 'reactstrap';
>>>>>>> 0aa616431c644b2c0447320d596463d6ea1e9d76
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import ModalEjemplo from './Components/Modal';
import listaDePreguntas from './listaDePreguntas.json';
=======
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import Login from './Components/login'
>>>>>>> Stashed changes

function App() {

  const [state, setState] = useState({
      isSupervisor:true,
  });


  return (
    <Router>
          <div className="App">
              <Login />
          <Switch>
            <Route path="/login"> 
            
<<<<<<< Updated upstream
            </Route>
            <Route path="/home"> 
                <Tabla/>
            </Route>
=======
                  </Route>
>>>>>>> Stashed changes
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
