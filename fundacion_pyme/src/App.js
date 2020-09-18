import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import Tabla from './Components/Tabla';
import listaDePreguntas from './listaDePreguntas.json';


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
              
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
