import React, { useState, useEffect } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import NavCuestionario from './Components/NavCuestionario';
import Tabla from './Components/Tabla';
import Sidebar from './Components/Sidebar';
import Usuarios from './Components/Usuarios';
import AltaUsuario from './Components/altaUsuario';
import Login from './Components/login';
import Perfil from './Components/Perfil';
import './App.css';

function App() {

  const [state, setState] = useState({
    isSupervisor: true,
    effect: ''
  });

  const checkSessionExpiration = () => {
    const isMyTokenExpired = isExpired(localStorage.getItem('token'));
    return isMyTokenExpired;
  }

  useEffect(()=> {
      checkSessionExpiration();
      const tokenData = decodeToken(localStorage.getItem('token'));
      setState({...state, userInfo: tokenData})
  }, [])

  return (
    <Router>
          <div className="App">
          <Switch>
              <Route path="/home" render={()=> (
                !checkSessionExpiration() ? (
                    <div className="app__home">
                      <Sidebar user={state.userInfo} />
                      <Tabla/>
                    </div> 
                  ) : ( 
                    <>
                        { localStorage.removeItem('token') }
                       <Redirect to="/login" />
                    </>)
              )}> 
              </Route>
              <Route path="/usuarios" render={()=> (
                  !checkSessionExpiration() ? (
                      <div className="app__home">
                          <Sidebar user={state.userInfo}/>
                          <Usuarios />
                      </div>
                  ) : (
                    <>
                        { localStorage.removeItem('token') }
                       <Redirect to="/login" />
                    </>
                  )
              )}> 
              </Route>
              <Route path="/perfil" render={()=>(
                !checkSessionExpiration() ? (
                    <div className="app__home">
                        <Sidebar user={state.userInfo}/>
                        <Perfil />
                    </div>
                ) : (
                  <>
                    { localStorage.removeItem('token') }
                    <Redirect to="/login" />
                  </>    
                )
              )}> 
            
              </Route>
              <Route path="/altaUsuario" render={()=>(
                    !checkSessionExpiration() ? (
                        <div className="app__home">
                            <Sidebar user={state.userInfo}/>
                            <AltaUsuario />
                        </div>
                    ) : (
                      <>
                        { localStorage.removeItem('token') }
                        <Redirect to="/login" />
                      </> 
                    )
              )}> 
              </Route>
              <Route path="/detalle" render={()=>(
                 !checkSessionExpiration() ? (
                    <div className="app__home">
                        <Sidebar user={state.userInfo}/>
                            <div className="app__navPregunta">
                                <NavCuestionario 
                                    user={state.userInfo}>
                                </NavCuestionario>
                            </div>
                    </div>
                 ) : (
                  <>
                      { localStorage.removeItem('token') }
                    <Redirect to="/login" />
                  </> 
                 )  
              )}>
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
