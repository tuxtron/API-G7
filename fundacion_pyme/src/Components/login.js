import React, { useState } from 'react'
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';
import "./Login.css";
import { decodeToken } from 'react-jwt';

function Login() {

    const [state, setState] = useState({
        username: '',
        password: ''
    })

    const iniciarSesionClicked = () => {
        login(state.username, state.password);
    }

    const history = useHistory();

    async function login(user, password) {
        const data = {
            username: user,
            contraseña: password
        }
        let config = {
            headers: {
              Authorization: `Bearer `+localStorage.getItem('token'),
            }
          }
        await axios.post(`https://obs-pyme-validacion-back.herokuapp.com/api/login`, data, config)
            .then( response => { 
                localStorage.removeItem('username');
                localStorage.removeItem('token');
                localStorage.setItem('username', state.username);
                const token = response.data.token;
                localStorage.setItem('token', token);
                const tokenData = decodeToken(token);
                const rol = tokenData.role;
                if (rol === "ADMINISTRADOR") {
                    history.push('/usuarios')
                }else {
                    history.push('/home');
                }
            })
            .catch( error => { 
                alert('Usuario o contraseña inválido... Por favor, Reintente con otra combinación')
                console.log(error)
             })
    }

    return (
        <div>
            <Formik
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Ingrese un email valido.")
                        .required("Obligatorio"),
                    // password: Yup.string()
                    //     .required("Obligatorio.")
                    //     .min(6, "Su clave es muy corta. Necesita al menos 6 caracteres")
                })}

            >
                {props => {
                    const {
                        touched,
                        errors,
                        isSubmitting,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <div className="pantallaLogin">
                        <form className="loginForm" onSubmit={handleSubmit}>
                            <img src={require("./images/fundacionObsPymeLogo.png")} alt="logo" className="logo" />
                            <label htmlFor="email">Email</label>
                            <input
                                name="user"
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={state.username}
                                onChange={(e)=>setState({...state, username:e.target.value})}
                                onBlur={handleBlur}
                                className={errors.email && touched.email && "error"}
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                            <label style={{marginTop:'20px'}} htmlFor="email">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Ingrese su clave"
                                value={state.password}
                                onChange={(e)=>setState({...state, password:e.target.value})}
                                onBlur={handleBlur}
                                className={errors.password && touched.password && "error"}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                            <Link className="iniciarSesionBtn" onClick={iniciarSesionClicked} style={{marginTop:'20px'}} type="submit" disabled={isSubmitting}>
                                Iniciar Sesion
                            </Link>
                            <br/><br/>
                            <p style={{textAlign:'center'}}><strong>usuario: </strong>sup <strong>password: </strong>123</p>
                        </form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    )
}

export default Login
