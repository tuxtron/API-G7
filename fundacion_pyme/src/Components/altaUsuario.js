import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './altaUsuario.css'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { decodeToken } from "react-jwt";

export default function AltaUsuario(props) {

    const history = useHistory();

    const [state, setState] = useState({
        name: '',
        user: '',
        password: '',
        rol: '',
        id: '',
    });

    const confirmarBtnClicked = () => {
        switch (history.location.state.tipo) {
            case 'Alta':
                if (checkinput()) {
                    const roles = ["", "SUPERVISOR", "OPERADOR", "ADMINISTRADOR"]
                    const data = {
                        username: state.user,
                        contraseña: state.password,
                        nombre: state.name,
                        rol: roles[state.rol]
                  }
                  let config = {
                    headers: {
                      Authorization: `Bearer `+localStorage.getItem('token'),
                    }
                  }
                  axios.post(`https://obs-pyme-validacion-back.herokuapp.com/api/usuario`, data, config)
                        .then( (response) => {
                                    alert('Usuario agregado!');
                                    history.push("/usuarios")
                                })
                        .catch( (error) => console.log(error))
                }
                break;
            case 'Modificar': 
                if (checkinput()){
                    const data = {
                        username: state.user,
                        contraseña: state.password,
                    }
                    let config = {
                        headers: {
                          Authorization: `Bearer `+localStorage.getItem('token'),
                        }
                      }
                axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/usuario/${state.id}`, data, config)
                        .then( (response) => {
                            console.log(response);
                            alert('Contraseña actualizada!');
                            history.push("/usuarios");
                        })
                        .catch( (error) => console.log(error))
                }
                break;
            default:
                
                break;
        }
    }

    const cancelarBtnClicked = () => {
            history.push("/usuarios")
    }

    const checkinput = () => {
        if (state.name !== '' && state.user !== '' && state.password !== '' && state.rol !== '') {
            return true
        }else {
            alert('Verifique los datos ingresados...');
            return false
        }
    }

    useEffect(() => {
        if (history.location.state.tipo === 'Modificar'){
            const dataToken = decodeToken(localStorage.getItem('token'));
            let config = {
                headers: {
                  Authorization: `Bearer `+localStorage.getItem('token'),
                }
              }
            axios.get(`https://obs-pyme-validacion-back.herokuapp.com/api/usuario/${dataToken.userId}`, config)
                        .then( (response) => {
                                    const data = response.data;
                                    const roles = ["", "SUPERVISOR", "OPERADOR", "SUPERADMIN"];
                                    const indexRol = roles.indexOf(data.rol)
                                    setState({...state, name:data.nombre, user:data.username, password:data.contraseña, rol:indexRol, id:data._id})
                                })
                        .catch( (error) => console.log(error))
        }
    },[])

    return (
        <div className="altaUsuario">
            <form className="loginForm" onSubmit={confirmarBtnClicked}>
                    <p><strong>{ history.location.state.tipo } Usuario</strong></p>
                    <label htmlFor="email">Nombre de Empleado</label>
                    <input
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={state.name}
                        onChange={(event)=>{setState({...state, name:event.target.value})}}
                        required
                        disabled={ history.location.state.tipo === 'Modificar' ? true : false }
                    />
                    <label style={{marginTop:'20px'}} htmlFor="email">Usuario</label>
                    <input
                        name="usuario"
                        type="text"
                        placeholder="Usuario"
                        value={state.user}
                        onChange={(event)=>{setState({...state, user:event.target.value})}}
                        required
                    />
                    <label style={{marginTop:'20px'}} htmlFor="email">Password</label>
                    <input
                        name="usuario"
                        type="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={(event)=>{setState({...state, password:event.target.value})}}
                        required
                    />
                    <label style={{marginTop:'20px'}} htmlFor="email">Rol</label>
                    <select style={{width:'100%', marginBottom:'10px'}} value={state.rol} onChange={(event)=>{setState({...state, rol:event.target.value})}} disabled={ history.location.state.tipo === 'Modificar' ? true : false }>
                        <option>-</option>
                        <option value={1}>Supervisor</option>
                        <option value={2}>Operador</option>
                        <option value={3}>Superadmin</option>
                    </select>
                        <Button onClick={confirmarBtnClicked} className="iniciarSesionBtn">Confirmar</Button>

                    <Link to="/usuarios" onClick={cancelarBtnClicked} style={{textDecoration:'none'}}>
                        <Button className="cancelarBtn">Cancelar</Button>
                    </Link>
                </form>
        </div>
    )
}

