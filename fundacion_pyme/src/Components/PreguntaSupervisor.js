import React, { useState } from 'react';
import './Pregunta.css';
import hourglass from './images/hourglass-regular.svg';
import checksolid from './images/check-solid.svg'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawer from './Drawer';
import axios from 'axios';

 
function Pregunta(props) {

    const pregunta = props.objPregunta;

    const [state, setState] = useState({
        estado: pregunta.status,
    })

    const revisarBtnClicked = () => {
        setState({...state, estado:"REVISION"});
    }

    const aprobarBtnClicked = () => {
        setState({...state, estado:"APROBADA"});
        const data = { status: 'APROBADA' };
        let config = {
            headers: {
              Authorization: `Bearer `+localStorage.getItem('token'),
            }
          };
        axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/pregunta/${pregunta._id}/status`, data, config)
                  .then( response => { 
                        console.log(response) 
                    } )
                  .catch( error => { console.log(error) })
    }

    const getStickerByStatus = () => {
        switch (state.estado) {
            case "APROBADA":
                return <>
                          <img className="pregunta__hourglass" src={checksolid} alt="hourglass.svg"/>
                          Aprobado
                       </>
            case "REVISION":
                return <>
                           <img className="pregunta__hourglass" src={hourglass} alt="hourglass.svg"/>
                           En revisión
                       </>
            case "VALIDADA":
                return <>
                           <img className="pregunta__hourglass" src={hourglass} alt="hourglass.svg"/>
                           Validada
                       </>
            default:
                return null;
        }
    }

    const getResultByType = () => {
        switch (pregunta.type) {
            case "CHOICE":
                return (
                        <Form.Group style={{marginRight:"5px"}} className="pregunta__formGroupContainer">
                        { 
                            pregunta.options.map((resultado, index) => {
                                return <Form.Check 
                                            key={index}
                                            type="checkbox" 
                                            label={resultado}
                                            name="choiceRadio"
                                            id={index} 
                                            defaultChecked={ parseInt(pregunta.value)-1 === index }
                                            disabled
                                            className="product__choiceItem"
                                        />
                            })
                        }
                        </Form.Group>
                )
            case "NUMBER":
                return (
                    // <div className="pregunta__respuestaContainer">
                        <input style={{marginRight:"5px"}} className="pregunta__respuestaContainer" value={pregunta.value} disabled/>
                    // {/* </div> */}
                )
            case "SELECT":
                return (
                    <Form.Group style={{marginRight:"5px"}} className="pregunta__formGroupContainer">
                        <Form.Control className="pregunta__desplegableItem" as="select" defaultValue={pregunta.questions[parseInt(pregunta.value)-1] } disabled>
                            {
                                pregunta.options.map((resultado, index)=>{
                                    return <option key={index}>{resultado}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                )
            case "FILE":
                return (
                    <div style={{marginRight:"5px"}} className="pregunta__inputRespuestaContainer">
                        <a href={ pregunta.value }>Archivo Subido</a>
                    </div>
                )
            case "GROUPED":
                    return (
                        <div className="pregunta__groupedContainer" style={{marginLeft:'0px'}}>
                         {  pregunta.questions.map(question => {
                                     switch (question.type) {
                                        case "CHOICE":
                                            return (
                                                    <>
                                                    <p>{question.title+": "}</p>
                                                    <Form.Group className="pregunta__formGroupContainer marginBottom5px">
                                                    { 
                                                        question.options.map((resultado, index) => {
                                                            return <Form.Check 
                                                                        key={index}
                                                                        type="checkbox" 
                                                                        label={resultado}
                                                                        name="choiceRadio"
                                                                        id={index} 
                                                                        defaultChecked={ parseInt(question.value)-1 === index }
                                                                        disabled
                                                                        className="product__choiceItem"
                                                                    />
                                                        })
                                                    }
                                                    </Form.Group>
                                                    </>
                                            )
                                        case "NUMBER":
                                            return (
                                                // <div className="pregunta__respuestaContainer">
                                                    <input className="pregunta__respuestaContainer marginBottom5px" value={question.title+": "+question.value} disabled/>
                                                // {/* </div> */}
                                            )
                                        case "SELECT":
                                            return (
                                                <>
                                                <p>{question.title+": "}</p>
                                                <Form.Group className="pregunta__formGroupContainer marginBottom5px">
                                                    <Form.Control className="pregunta__desplegableItem" as="select" defaultValue={question.options[parseInt(pregunta.value)-1]} disabled>
                                                        {
                                                            question.options.map((resultado, index)=>{
                                                                return <option key={index}>{resultado}</option>
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                </>
                                            )
                                        case "FILE":
                                            return (
                                                <div className="pregunta__inputRespuestaContainer marginBottom5px" style={{marginLeft:'0px'}}>
                                                    <p>{ question.title+": " }</p>
                                                    <a href={question.value}>{ question.value }</a>
                                                </div>
                                            )
                                        default:
                                            // case "text" or other
                                            return (
                                                   <textarea className="pregunta__respuestaContainer marginBottom5px" value={question.title+": "+question.value} disabled />
                                                )
                                }
                            })}
                        </div>
                    )
            default:
                // case "text" or other
                return (
                        <textarea style={{marginRight:"5px"}} className="pregunta__respuestaContainer" value={`${pregunta.value}`} disabled />
                )
        }
        
    }

    const getEditableResultByType = () => {
        switch (pregunta.type) {
            case "CHOICE":
                return (
                        <Form.Group className="pregunta__formGroupContainer" style={{width:"auto"}}> 
                        { 
                            pregunta.options.map((resultado, index) => {
                                return <Form.Check 
                                            key={index}
                                            type="checkbox" 
                                            label={resultado}
                                            name="choiceRadio"
                                            id={index} 
                                            className="product__choiceItem"
                                            defaultChecked={ parseInt(pregunta.lastValue)-1 === index }
                                        />
                            })
                        }
                        </Form.Group>
                )
            case "NUMBER":
                return (
                        <input style={{marginLeft:"0"}} className="pregunta__inputRespuestaContainer" type="number" value={pregunta.lastValue} /> 
                )
            case "SELECT":
                return (
                        <Form.Group className="pregunta__formGroupContainer">
                            <Form.Control className="pregunta__desplegableItem" as="select" defaultValue={pregunta.lastValue ? pregunta.options[parseInt(pregunta.lastValue)-1]:null}>
                                <option>Seleccionar</option>
                                {
                                    pregunta.options.map((resultado, index)=>{
                                        return <option key={index}>{resultado}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                )
            case "FILE":
                return (
                    <>
                        {
                            state.estado !== "VALIDADA" ?
                            <>  
                            <input className="pregunta__inputRespuestaContainer" type="file" name="archivo" />
                            {
                                pregunta.lastValue ? 
                                <div className="pregunta__inputRespuestaContainer">
                                    <a href={ pregunta.lastValue }>Archivo Validado</a>
                                </div>
                                : null
                            }
                            </>
                            : 
                            <div className="pregunta__inputRespuestaContainer">
                                <a href={ pregunta.lastValue }>Archivo Validado</a>
                            </div>
                        }
                    </>
                )
            case "GROUPED":
                return (
                    <div className="pregunta__groupedContainer">
                        {  
                            pregunta.questions.map(question => {
                                switch (question.type) {
                                    case "CHOICE":
                                        return (
                                                <Form.Group className="pregunta__formGroupContainer marginBottom5px"> 
                                                { 
                                                    question.options.map((resultado, index) => {
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
                                    case "NUMBER":
                                        return (
                                                <input className="pregunta__inputRespuestaContainer marginBottom5px" type="number" value={question.lasValue} />
                                        )
                                    case "SELECT":
                                        return (
                                                <Form.Group className="pregunta__formGroupContainer marginBottom5px">
                                                    <Form.Control className="pregunta__desplegableItem" as="select" defaultValue={question.lastValue}>
                                                        <option>Seleccionar</option>
                                                        {
                                                            question.options.map((resultado, index)=>{
                                                                return <option key={index}>{resultado}</option>
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                        )
                                    case "FILE":
                                        return (
                                            <input className="pregunta__inputRespuestaContainer marginBottom5px" type="file" name="archivo" />
                                        )
                                    default:
                                        // case "text" or other
                                        return (
                                            <textarea  className="pregunta__respuestaContainer marginBottom5px" value={question.lastValue} />
                                        )
                                    }
                            })
                        }
                    </div>
                )
            default:
                // case "text" or other
                return (
                    <textarea  className="pregunta__respuestaContainer" value={pregunta.lastValue} />
                )
        }
    }

    return (
        <>  
            { <div className="pregunta">
                <div className="pregunta__header">
                    <p className="pregunta__numero">Pregunta {props.numId + 1} { pregunta.mandatory ? "(*)" : null }</p>
                    <p className="pregunta__sticker">
                        {   
                            getStickerByStatus()
                        }
                        </p>
                    </div>
                    <div className="pregunta__descripcionContainer">
                        <p className="pregunta__descripcion">{pregunta.title}</p>
                    </div>
                    <p className="pregunta__respuesta">Respuesta</p>
                    {
                        state.estado === "VALIDADA" ? <p className="pregunta__respuesta">Respuesta Validada</p> : null
                    }
                    <div className="pregunta__respuestaGeneral">
                        {   (state.estado === "APROBADA" && pregunta.revisiones.length === 0 ) || state.estado === "VALIDADA" ? getResultByType() : null }
                        {   state.estado === "VALIDADA" || (state.estado === "APROBADA" && pregunta.revisiones.length !==0) ? getEditableResultByType() : null  }
                        {   (state.estado === "PENDIENTE" || state.estado === "REVISION") ? getResultByType() : null }
                    </div>
                    <div className={ state.estado === "VALIDADA" ? "pregunta__btnSectionEnRevision" : "pregunta__btnSectionAprobado"} >
                        <Drawer pregunta={pregunta} revisarBtnClicked={revisarBtnClicked} />
                        {/* <button className="pregunta__btnRevisar" onClick={revisarBtnClicked} >Revisar</button> */}
                        <button className="pregunta__btnAprobar" onClick={aprobarBtnClicked}>Aprobar</button>
                    </div>
                </div> }
        </>
    )

}

export default Pregunta;