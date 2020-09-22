import React from 'react';
import './App.css';
<<<<<<< Updated upstream
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
<<<<<<< HEAD
import ModalEjemplo from './Components/Modal';
=======
import Tabla from './Components/Tabla';
import listaDePreguntas from './listaDePreguntas.json';
=======
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import Login from './Components/login'
>>>>>>> Stashed changes

>>>>>>> 2af45cf129011d890d4876983a54548835736fe6

function App() {

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
                                id={pregunta.id} 
                                tipo={pregunta.tipo} 
                                pregunta={pregunta.pregunta}
                                posiblesResultados={pregunta.posiblesResultados}
                                respuesta={pregunta.respuesta}
                                aprobada={pregunta.aprobada} />
                  })
                }
            </Route>
            <Route path="/">
<<<<<<< HEAD
              <ModalEjemplo />
=======
              
>>>>>>> 2af45cf129011d890d4876983a54548835736fe6
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
