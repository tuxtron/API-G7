import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pregunta from './Components/Pregunta';


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
                <Pregunta />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
