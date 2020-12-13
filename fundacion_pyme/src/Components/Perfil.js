import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { decodeToken } from 'react-jwt';

function Perfil() {

    const [state, setState] = useState({
        name: '',
        user: '',
        password: '',
        rol: '',
        id: '',
    });

    const history = useHistory();
     
    useEffect(() => {
            let config = {
                headers: {
                  Authorization: `Bearer `+localStorage.getItem('token'),
                }
              }
            axios.get(`https://obs-pyme-validacion-back.herokuapp.com/api/usuario/`, config)
                        .then( (response) => {
                                    const data = response.data;
                                    const roles = ["", "SUPERVISOR", "OPERADOR", "SUPERADMIN"];
                                    const indexRol = roles.indexOf(data.rol)
                                    setState({...state, name:data.nombre, user:data.username, password:data.contraseña, rol:indexRol, id:data._id})
                                })
                        .catch( (error) => console.log(error))
    },[])

    const confirmarBtnClicked = () => {
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
                        const tokenData = decodeToken(localStorage.getItem('token'));
                        const rol = tokenData.role
                        if (rol === "ADMINISTRADOR"){
                            history.push("/usuarios")
                        }else{
                            history.push("/home");
                        }
                })
                .catch( (error) => console.log(error))
        }
    }

    const checkinput = () => {
        if (state.name !== '' && state.user !== '' && state.password !== '' && state.rol !== '') {
            return true
        }else {
            alert('Verifique los datos ingresados...');
            return false
        }
    }

    const perfilCancelarBtnClicked = () => {
        history.push("/home");
    }

    return (
        <div className="altaUsuario">
            <form className="loginForm">
                    <p><strong> Editar Mi Perfil</strong></p>
                    <label htmlFor="email">Nombre de Empleado</label>
                    <input
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={state.name}
                        onChange={(event)=>{setState({...state, name:event.target.value})}}
                        required
                        disabled
                    />
                    <label style={{marginTop:'20px'}} htmlFor="email">Usuario</label>
                    <input
                        name="usuario"
                        type="text"
                        placeholder="Usuario"
                        value={state.user}
                        onChange={(event)=>{setState({...state, user:event.target.value})}}
                        required
                        disabled
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
                    <select style={{width:'100%', marginBottom:'10px'}} value={state.rol} onChange={(event)=>{setState({...state, rol:event.target.value})}} disabled>
                        <option>-</option>
                        <option value={1}>Supervisor</option>
                        <option value={2}>Operador</option>
                        <option value={3}>Superadmin</option>
                    </select>
                        <Button onClick={confirmarBtnClicked} className="iniciarSesionBtn">Confirmar</Button>

                    <Link onClick={perfilCancelarBtnClicked} style={{textDecoration:'none'}}>
                        <Button className="cancelarBtn">Cancelar</Button>
                    </Link>
                </form>
        </div>
    )
}

export default Perfil;
