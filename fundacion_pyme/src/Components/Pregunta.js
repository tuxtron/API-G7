import React, { useState } from 'react';
import './Pregunta.css';
import hourglass from './images/hourglass-regular.svg';
import checksolid from './images/check-solid.svg'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Drawer from './Drawer';
 
function Pregunta(props) {

    const pregunta = props.objPregunta;

    const [state, setState] = useState({
        isSupervisor: props.isSupervisor,
        estado: pregunta.estado,
    })

    const revisarBtnClicked = () => {
        setState({...state, estado:"enRevision"});
    }

    const aprobarBtnClicked = () => {
        setState({...state, estado:"aprobada"});
    }

    const validarBtnClicked = () => {
        setState({...state, estado:"validada"});
    }

    const getStickerByStatus = () => {
        switch (state.estado) {
            case "aprobada":
                return <>
                          <img className="pregunta__hourglass" src={checksolid} alt="hourglass.svg"/>
                          Aprobado
                       </>
            case "enRevision":
                return <>
                           <img className="pregunta__hourglass" src={hourglass} alt="hourglass.svg"/>
                           En revisión
                       </>
            case "validada":
                return <>
                           <img className="pregunta__hourglass" src={hourglass} alt="hourglass.svg"/>
                           Validada
                       </>
            default:
                return null;
        }
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
                    <textarea style={{marginLeft:'10px'}} className="pregunta__respuestaContainer">{pregunta.respuestaValidada}</textarea>
                )
        }
    }

    const getObservacionByStatus = () => {
        // switch (state.estado) {
        //     case "enRevision":
        //         return   <div className="pregunta__observacion">
        //                     <p>Observación: </p>
        //                     <textarea>{pregunta.observacion}</textarea>
        //                 </div> 
        //     case "validada":
        //         return  <div className="pregunta__observacion">
        //                     <p>Observación: <br />
        //                     { pregunta.observacion ? pregunta.observacion : "-" }
        //                     </p> 
        //                 </div>
        //     default:
        //         return null;
        // }
        return <Drawer />
    }

    const pantallaSupervisor = (
        <div className="pregunta">
            <div className="pregunta__header">
                <p className="pregunta__numero">Pregunta {pregunta.id}</p>
                <p className="pregunta__sticker">
                    {   
                        getStickerByStatus()
                    }
                </p>
            </div>
            <div className="pregunta__descripcionContainer">
                <p className="pregunta__descripcion">{pregunta.pregunta}</p>
            </div>
            <p className="pregunta__respuesta">Respuesta</p>
            {
                state.estado === "validada" ? <p className="pregunta__respuesta">Respuesta Validada</p> : null
            }
            <div className="pregunta__respuestaGeneral">
                {   getResultByType()    }
                {   state.estado === "validada" ? getEditableResultByType() : null  }
            </div>
            <div className={ state.estado === "validada" ? "pregunta__btnSectionEnRevision" : "pregunta__btnSectionAprobado"} >
                <Drawer />
                <Link className="pregunta__btnRevisar" onClick={revisarBtnClicked} >Revisar</Link>
                <Link className="pregunta__btnAprobar" onClick={aprobarBtnClicked}>Aprobar</Link>
            </div>
        </div>
    ) 

    const pantallaOperador = (
         state.estado === "enRevision" || state.estado === "validada"
         ?
        <div className="pregunta">
            <div className="pregunta__header">
                <p className="pregunta__numero">Pregunta {pregunta.id}</p>
                <p className="pregunta__sticker">
                    {   
                        getStickerByStatus()
                    }
                </p>
            </div>
            <div className="pregunta__descripcionContainer">
                <p className="pregunta__descripcion">{pregunta.pregunta}</p>
            </div>
            <p className="pregunta__respuesta">Respuesta</p>
            <p className="pregunta__respuesta">Respuesta Validada</p>
            <div className="pregunta__respuestaGeneral">
                { getResultByType()    }
                { getEditableResultByType() }
            </div>
            <div className="pregunta__observacion">
                <p>Observación: <br />
                { pregunta.observacion ? pregunta.observacion : "-" }</p>
            </div>
            <div className="pregunta__btnSectionEnRevision">
                <button className="pregunta__btnValidar" onClick={validarBtnClicked} >Validar</button>
            </div>
        </div>
        :null
    )
    
    // const aprobada = props.aprobada;


    return (
        <>
            { state.isSupervisor ? pantallaSupervisor : pantallaOperador }
        </>
    )

}

export default Pregunta;