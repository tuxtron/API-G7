import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import Modal from './Components/Modal';
import Nav from './Components/Nav';

function App() {

  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/login"> 
            
            </Route>
            <Route path="/detalle">

            </Route>
            <Route path="/">
                {/* Esta parte deberia ser dinamica pasando los parametros correspondientes, 
                  despues cuando tengamos bien como vendria los datos desde BD ajustamos los parametros 
                  de componente sin problema */}
                <Pregunta 
                  id={0} 
                  tipo="texto" 
                  pregunta="Como te llamas?" 
                  respuesta="soy respuesta de la pregunta 1" 
                  aprobada={false} />
                <Pregunta 
                  id={1} 
                  tipo="numerica" 
                  pregunta="Cuantos años tenes?" 
                  respuesta={2} 
                  aprobada={false}/>
                <Pregunta 
                  id={2} 
                  tipo="choice" 
                  pregunta="Cuantas tarjetas de credito tenes?" 
                  posiblesResultados={["uno", "dos", "tres", "cuatro"]} 
                  respuesta={1} 
                  aprobada={false}/>
                <Pregunta 
                  id={3} 
                  tipo="desplegable" 
                  pregunta="Cuantos hermanos tenes?" 
                  posiblesResultados={["uno", "dos", "tres", "cuatro"]} 
                  respuesta={2} 
                  aprobada={false}/>
                <Pregunta 
                  id={4} 
                  tipo="texto" 
                  pregunta="Como te llamas?" 
                  respuesta="soy respuesta de la pregunta 4" 
                  aprobada={true}/>
                <Pregunta 
                  id={5} 
                  tipo="numerica" 
                  pregunta="Cuantos años tenes?" 
                  respuesta={2} 
                  aprobada={true}/>
                <Pregunta 
                  id={6} 
                  tipo="choice" 
                  pregunta="Cuantas tarjetas de credito tenes?" 
                  posiblesResultados={["uno", "dos", "tres", "cuatro"]} 
                  respuesta={3} 
                  aprobada={true}/>
                <Pregunta 
                  id={7} 
                  tipo="desplegable" 
                  pregunta="Cuantos hermanos tenes?" 
                  posiblesResultados={["uno", "dos", "tres", "cuatro"]} 
                  respuesta={4} 
                  aprobada={true}/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
