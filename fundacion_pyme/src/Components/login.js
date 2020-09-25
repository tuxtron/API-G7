import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import "./Login.css";

const ValidatedLoginForm = () => (
    <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Iniciando Sesion", values);
                console.log("Iniciando Sesion", values);
                setSubmitting(false);
            }, 500);
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email("Ingrese un email valido.")
                .required("Obligatorio"),
            password: Yup.string()
                .required("Obligatorio.")
                .min(6, "Su clave es muy corta. Necesita al menos 6 caracteres")
        })}

    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;
            return (
                <div className="pantallaLogin">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <img src={require("./images/fundacionObsPymeLogo.png")} alt="logo" className="logo" />
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Ingrese su direccion de email"
                        value={values.email}
                        onChange={handleChange}
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
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                    <Link className="iniciarSesionBtn" to="/home" style={{marginTop:'20px'}} type="submit" disabled={isSubmitting}>
                        Iniciar Sesion
                    </Link>
                </form>
                </div>
            );
        }}
    </Formik>
);



export default ValidatedLoginForm;