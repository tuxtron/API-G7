import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';
import ModalEjemplo from './Components/Modal';

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
              <ModalEjemplo />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
