import React from 'react'
import { Link } from 'react-router-dom'

function altaUsuario() {

    const handleSubmit = () => {

    }


    return (
        <div className="altaUsuario">
            <form className="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Nombre de Empleado</label>
                    <input
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                    />
                    <label style={{marginTop:'20px'}} htmlFor="email">Usuario</label>
                    <input
                        name="usuario"
                        type="text"
                        placeholder="Usuario"
                    />
                    <label style={{marginTop:'20px'}} htmlFor="email">Password</label>
                    <input
                        name="usuario"
                        type="password"
                        placeholder="Password"
                    />
                    <label style={{marginTop:'20px'}} htmlFor="email">Rol</label>
                    <select style={{width:'100%', marginBottom:'10px'}}>
                        <option>-</option>
                        <option value="">Supervisor</option>
                        <option value="">Operador</option>
                    </select>
                    <Link className="iniciarSesionBtn" to="/usuarios" style={{marginTop:'20px'}} type="submit">
                        Confirmar
                    </Link>
                </form>
        </div>
    )
}

export default altaUsuario
