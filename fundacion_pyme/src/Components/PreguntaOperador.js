import React, { useState, useEffect } from 'react';
import './Pregunta.css';
import hourglass from './images/hourglass-regular.svg';
import checksolid from './images/check-solid.svg'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawer from './Drawer';
import { decodeToken } from "react-jwt";
import axios from 'axios';
 
function Pregunta(props) {

    const pregunta = props.objPregunta;

    const [state, setState] = useState({
        estado: pregunta.status,
        resultado: pregunta.lastValue,
        filename: '',
        rol:'',
        groupedResultado: [...Array(pregunta.questions.length).keys()]
    })
        
    const validarBtnClicked = () => {
        setState({...state, estado:"VALIDADA"});
        var revisiones = pregunta.revisiones;
        var idUltimaRevision = '';
        var fechaUltimaRevision = ''
        revisiones.forEach((revision)=>{
            if (idUltimaRevision === ''){
                idUltimaRevision = revision._id;
                fechaUltimaRevision = revision.observacion.created;
            }else{
                var f1 = new Date(fechaUltimaRevision);
                var f2 = new Date(revision.observacion.created);
                if( f2 > f1){
                    idUltimaRevision = revision._id;
                    fechaUltimaRevision = revision.observacion.created;
                }
            }
            console.log(idUltimaRevision)
        })
        let configFile = {
            headers: {
              Authorization: `Bearer `+localStorage.getItem('token'),
              Accept:'application/form-data'
            }
          }
        var data = {
            idPregunta: pregunta._id,
            idRevision : idUltimaRevision,
            revision : {
                respuestaValidada: {
                    usuario: localStorage.getItem('username'),
                    value: state.resultado
                }
            }
        }
        if( pregunta.type === 'FILE' ){
            const form = new FormData();
            form.append('files', state.resultado, state.resultado.name);
            console.log(state.resultado, state.resultado.name);
            console.log("form", form)
            axios.post(`https://obs-pyme-validacion-back.herokuapp.com/api/upload`, form, configFile)
                .then( res => { 
                    console.log(res)
                    const config = {
                        headers: {
                          Authorization: `Bearer `+localStorage.getItem('token')
                        }
                      }
                    data = {
                        idPregunta: pregunta._id,
                        idRevision : idUltimaRevision,
                        revision : {
                            respuestaValidada: {
                                usuario: localStorage.getItem('username'),
                                value: res.data.files[0].url
                            }
                        }
                    }
                    axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/pregunta/revision`, data, config)
                    .then( response => { 
                          console.log(response) 
                      } )
                    .catch( error => { console.log(error) })
                 })
                .catch( err => { console.log(err) })
        }else{
            console.log(idUltimaRevision);
            console.log(data);
            const config = {
                headers: {
                  Authorization: `Bearer `+localStorage.getItem('token')
                }
              }
            axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/pregunta/revision`, data, config)
                      .then( response => { 
                            console.log(response) 
                        } )
                      .catch( error => { console.log(error) })
        }

    }

    useEffect(()=>{
        const tokenData = decodeToken(localStorage.getItem('token'));
        const rol = tokenData.role;
        setState({...state, rol: rol})
    }, [])

    const onChangeHandler= (event) =>{
        console.log(event.target.files[0]);
        setState({...state, resultado: event.target.files[0]})
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
                        <Form.Group className="pregunta__formGroupContainer">
                        { 
                            pregunta.options.map((resultado, index) => {
                                return <Form.Check 
                                            key={index}
                                            type="checkbox" 
                                            label={resultado}
                                            name="choiceRadio"
                                            id={index+1} 
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
                        <input className="pregunta__respuestaContainer" value={pregunta.value} disabled/>
                    // {/* </div> */}
                )
            case "SELECT":
                return (
                    <Form.Group className="pregunta__formGroupContainer">
                        <Form.Control className="pregunta__desplegableItem" as="select" defaultValue={pregunta.options[parseInt(pregunta.value)-1]} disabled>
                            {
                                pregunta.options.map((resultado, index)=>{
                                    return <option key={index+1}>{resultado}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                )
            case "FILE":
                return (
                    <div className="pregunta__inputRespuestaContainer" style={{marginLeft:'0px'}}>
                        <a href={ pregunta.value }>Archivo</a>
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
                                                                        id={index+1} 
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
                                                                return <option key={index+1}>{resultado}</option>
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
                                                    <a href={question.value }>Archivo</a>
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
                        <textarea className="pregunta__respuestaContainer" value={`${pregunta.value}`} disabled />
                )
        }
        
    }

    const getEditableResultByType = () => {
        switch (pregunta.type) {
            case "CHOICE":
                return (
                        <Form.Group className="pregunta__formGroupContainer"> 
                        { 
                            pregunta.options.map((resultado, index) => {
                                return <Form.Check 
                                            key={index+1}
                                            type="radio" 
                                            label={resultado}
                                            // defaultChecked={ state.resultado ? parseInt(state.resultado)-1 === index : null }
                                            name="choiceRadio"
                                            id={index+1} 
                                            className="product__choiceItem"
                                            value={index+1}
                                            onChange={ (event) => setState({...state, resultado: event.target.value}) }
                                        />
                            })
                        }
                        </Form.Group>
                )
            case "NUMBER":
                return (
                        <input className="pregunta__inputRespuestaContainer" 
                                type="number"
                                onChange={ (event) => setState({...state, resultado: event.target.value}) }/>
                )
            case "SELECT":
                return (
                        <Form.Group className="pregunta__formGroupContainer">
                            <Form.Control className="pregunta__desplegableItem" as="select"  onChange={ (event) => setState({...state, resultado: event.target.value}) } >
                                <option>Seleccionar</option>
                                {
                                    pregunta.options.map((resultado, index)=>{
                                        return <option key={index+1} value={index+1}>{resultado}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                )
            case "FILE":
                return (
                    <input className="pregunta__inputRespuestaContainer" type="file" name="archivo" onChange={(event)=>onChangeHandler(event)} />
                )
            case "GROUPED":
                return (
                    <div className="pregunta__groupedContainer">
                        {  
                            pregunta.questions.map((question, i) => {
                                switch (question.type) {
                                    case "CHOICE":
                                        return (
                                                <Form.Group className="pregunta__formGroupContainer marginBottom5px"> 
                                                { 
                                                    question.option.map((resultado, index) => {
                                                        return <Form.Check 
                                                                    key={index}
                                                                    type="checkbox" 
                                                                    label={resultado}
                                                                    name="choiceRadio"
                                                                    id={index} 
                                                                    className="product__choiceItem"
                                                                    value={index+1}
                                                                    onChange={ event => groupedResultadoChanged(event, i) }
                                                            
                                                                />
                                                    })
                                                }
                                                </Form.Group>
                                        )
                                    case "NUMBER":
                                        return (
                                                <input className="pregunta__inputRespuestaContainer marginBottom5px" type="number" onChange={ event => groupedResultadoChanged(event, i) }/>
                                        )
                                    case "SELECT":
                                        return (
                                                <Form.Group className="pregunta__formGroupContainer marginBottom5px">
                                                    <Form.Control className="pregunta__desplegableItem" as="select" onChange={ event => groupedResultadoChanged(event, i)}>
                                                        <option>Seleccionar</option>
                                                        {
                                                            question.option.map((resultado, index)=>{
                                                                return <option key={index+1} value={index+1} >{resultado}</option>
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                        )
                                    case "FILE":
                                        return (
                                            <input className="pregunta__inputRespuestaContainer marginBottom5px" type="file" name="archivo" onChange={ event => groupedResultadoChanged(event, i) }/>
                                        )
                                    default:
                                        // case "text" or other
                                        return (
                                            <textarea style={{marginLeft:'10px'}} className="pregunta__respuestaContainer marginBottom5px" onChange={ event => groupedResultadoChanged(event, i) }/>
                                        )
                                    }
                            })
                        }
                    </div>
                )
            default:
                // case "text" or other
                return (
                    <textarea style={{marginLeft:'10px'}} className="pregunta__respuestaContainer" onChange={ (event) => setState({...state, resultado: event.target.value}) }/>
                )
        }
    }

    const groupedResultadoChanged = (event, index) => {
                    const resultList = state.groupedResultado;
                    resultList[index] = event.target.value
                    setState({ ...state, groupedResultado: resultList})
    }

    return (
        <>  
            <div className="pregunta">
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
                <p className="pregunta__respuesta">Respuesta Validada</p>
                <div className="pregunta__respuestaGeneral">
                    { getResultByType()    }
                    { getEditableResultByType() }
                </div>
                <div className="pregunta__btnSectionEnRevision">
                    <Drawer pregunta={pregunta} rol={state.rol} />
                    <button className="pregunta__btnValidar" onClick={validarBtnClicked} >Validar</button>
                </div>
            </div>
        </>
    )

}

export default Pregunta;