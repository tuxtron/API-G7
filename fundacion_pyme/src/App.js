import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
<<<<<<< HEAD
import ModalEjemplo from './Components/Modal';
=======
import Tabla from './Components/Tabla';
import listaDePreguntas from './listaDePreguntas.json';

>>>>>>> 2af45cf129011d890d4876983a54548835736fe6

function App() {

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
