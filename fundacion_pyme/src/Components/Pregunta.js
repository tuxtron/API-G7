import React, { useState } from 'react';
import './Pregunta.css';
import hourglass from './images/hourglass-regular.svg';
import checksolid from './images/check-solid.svg'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function Pregunta(props) {

    const pregunta = props.objPregunta;

    const [state, setState] = useState({
        isSupervisor: props.isSupervisor,
        aprobada: pregunta.aprobada,  // aprobada = false => En Revisión
        checked: pregunta.checked,
        validada: false,
    })

    const revisarBtnClicked = () => {
        setState({...state, aprobada:false, checked:true});
    }

    const aprobarBtnClicked = () => {
        setState({...state, aprobada:true, checked:true});
    }

    const validarBtnClicked = () => {
        setState({...state, validada:true});
    }

    const getResultByType = () => {
        switch (pregunta.tipo) {
            case "choice":
                return (
                        <Form.Group className="pregunta__formGroupContainer">
                        { 
                            pregunta.posiblesResultados.map((resultado, index) => {
                                return <Form.Check 
                                            key={index}
                                            type="checkbox" 
                                            label={resultado}
                                            name="choiceRadio"
                                            id={index} 
                                            defaultChecked={ pregunta.respuesta === index }
                                            disabled
                                            className="product__choiceItem"
                                        />
                            })
                        }
                        </Form.Group>
                )
            case "numerica":
                return (
                    // <div className="pregunta__respuestaContainer">
                        <input className="pregunta__respuestaContainer" value={pregunta.respuesta} disabled/>
                    // {/* </div> */}
                )
            case "desplegable":
                return (
                    <Form.Group className="pregunta__formGroupContainer">
                        <Form.Control className="pregunta__desplegableItem" as="select" defaultValue={pregunta.posiblesResultados[pregunta.respuesta]} disabled>
                            {
                                pregunta.posiblesResultados.map((resultado, index)=>{
                                    return <option key={index}>{resultado}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                )
            default:
                // case "text" or other
                return (
                        <textarea className="pregunta__respuestaContainer" value={pregunta.respuesta} disabled />
                )
        }
        
    }

    const getEditableResultByType = () => {
        switch (pregunta.tipo) {
            case "choice":
                return (
                        <Form.Group className="pregunta__formGroupContainer">
                        { 
                            pregunta.posiblesResultados.map((resultado, index) => {
                                return <Form.Check 
                                            key={index}
                                            type="checkbox" 
                                            label={resultado}
                                            name="choiceRadio"
                                            id={index} 
                                            className="product__choiceItem"
                                        />
                            })
                        }
                        </Form.Group>
                )
            case "numerica":
                return (
                        <input className="pregunta__inputRespuestaContainer" type="number" />
                )
            case "desplegable":
                return (
                        <Form.Group className="pregunta__formGroupContainer">
                            <Form.Control className="pregunta__desplegableItem" as="select" defaultValue="Elegir">
                                <option>Seleccionar</option>
                                {
                                    pregunta.posiblesResultados.map((resultado, index)=>{
                                        return <option key={index}>{resultado}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                )
            default:
                // case "text" or other
                return (
                        <textarea style={{marginLeft:'10px'}} className="pregunta__respuestaContainer"></textarea>
                )
        }
    }

    const pantallaSupervisor = (
        <div className="pregunta">
            <div className="pregunta__header">
                <p className="pregunta__numero">Pregunta {pregunta.id}</p>
                <p className="pregunta__enRevision">
                    {
                        !state.checked ? null :
                            state.aprobada 
                            ? 
                            <>
                            <img className="pregunta__hourglass" src={checksolid} alt="hourglass.svg"/>
                            Aprobado
                            </>
                            :
                            <>
                            <img className="pregunta__hourglass" src={hourglass} alt="hourglass.svg"/>
                                En revisión
                            </>
                    }
                </p>
            </div>
            <div className="pregunta__descripcionContainer">
                <p className="pregunta__descripcion">{pregunta.pregunta}</p>
            </div>
            <p className="pregunta__respuesta">Respuesta</p>
            {
                state.checked && !state.aprobada ? <p className="pregunta__respuesta">Observación</p> : null
            }
            <div className="pregunta__respuestaGeneral">
                {   getResultByType()    }
        {   state.checked && !state.aprobada ? <textarea className="pregunta__observacionContainer" >{ pregunta.observacion }</textarea> : null  }
            </div>
            <div className={ !state.checked || (state.checked && state.aprobada) ? "pregunta__btnSectionAprobado" : "pregunta__btnSectionEnRevision"} >
                <button className="pregunta__btnRevisar" onClick={revisarBtnClicked} >Revisar</button>
                <button className="pregunta__btnAprobar" onClick={aprobarBtnClicked}>Aprobar</button>
            </div>
        </div>
    ) 

    const pantallaOperador = (
         pregunta.checked && !pregunta.aprobada 
         ?
        <div className="pregunta">
            <div className="pregunta__header">
                <p className="pregunta__numero">Pregunta {pregunta.id}</p>
                <p className="pregunta__enRevision">
                    <img className="pregunta__hourglass" src={hourglass} alt="hourglass.svg"/>
                    { state.validada ? "Validada" : "En revisión" }
                </p>
            </div>
            <div className="pregunta__descripcionContainer">
                <p className="pregunta__descripcion">{pregunta.pregunta}</p>
            </div>
            <p className="pregunta__respuesta">Respuesta</p>
            {
                <p className="pregunta__respuesta">Respuesta Validada</p>
            }
            <div className="pregunta__respuestaGeneral">
                { getResultByType()    }
                { getEditableResultByType() }
            </div>
            <div className="pregunta__observacion">
                <p>Observación: <br />
                { pregunta.observacion ? pregunta.observacion : "-" }</p>
            </div>
            <div className={ !state.checked || (state.checked && state.aprobada) ? "pregunta__btnSectionAprobado" : "pregunta__btnSectionEnRevision"} >
                <button className="pregunta__btnValidar" onClick={validarBtnClicked} >Validar</button>
            </div>
        </div>
        :null
    )
    
    // const aprobada = props.aprobada;


    return (
        state.isSupervisor ? pantallaSupervisor : pantallaOperador
    )

}

export default Pregunta