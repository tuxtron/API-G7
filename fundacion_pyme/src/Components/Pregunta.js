import React from 'react';
import './Pregunta.css';
import hourglass from './images/hourglass-regular.svg';
import checksolid from './images/check-solid.svg'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function Pregunta(props) {

    const getResultByType = () => {
        switch (props.tipo) {
            case "choice":
                return (
                        <Form.Group className="pregunta__formGroupContainer">
                        { 
                            props.posiblesResultados.map((resultado, index) => {
                                return <Form.Check 
                                            key={index}
                                            type="checkbox" 
                                            label={resultado}
                                            name="choiceRadio"
                                            id={index} 
                                            defaultChecked={ props.respuesta === index }
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
                        <input className="pregunta__respuestaContainer" value={props.respuesta} disabled/>
                    // {/* </div> */}
                )
            case "desplegable":
                return (
                    <Form.Group className="pregunta__formGroupContainer">
                        <Form.Control className="pregunta__desplegableItem" as="select" defaultValue={props.posiblesResultados[props.respuesta]} disabled>
                            {
                                props.posiblesResultados.map((resultado, index)=>{
                                    return <option key={index}>{resultado}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                )
            default:
                // case "text" or other
                return (
                        <textarea className="pregunta__respuestaContainer" value={props.respuesta} disabled />
                )
        }
        
    }

    const getEditableResultByType = () => {
        switch (props.tipo) {
            case "choice":
                return (
                        <Form.Group className="pregunta__formGroupContainer">
                        { 
                            props.posiblesResultados.map((resultado, index) => {
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
                                    props.posiblesResultados.map((resultado, index)=>{
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
    
    const aprobada = props.aprobada;

    return (
        <div className="pregunta">
            <div className="pregunta__header">
                <p className="pregunta__numero">Pregunta {props.id}</p>
                <p className="pregunta__enRevision">
                    {
                        aprobada 
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
                <p className="pregunta__descripcion">{props.pregunta}</p>
            </div>
            <p className="pregunta__respuesta">Respuesta</p>
            {
                aprobada ? null : <p className="pregunta__respuesta">Respuesta Modificada</p>
            }
            <div className="pregunta__respuestaGeneral">
                {   getResultByType()    }
                {   aprobada ? null : getEditableResultByType()  }
            </div>
            <div className={ aprobada ? "pregunta__btnSectionAprobado" : "pregunta__btnSectionEnRevision"} >
                <button className="pregunta__btnRevisar">Revisar</button>
                <button className="pregunta__btnAprobar">Aprobar</button>
            </div>
    


        </div>
    )
}

export default Pregunta