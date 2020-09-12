import React from 'react';
import './Pregunta.css';
import hourglass from './images/hourglass-regular.svg';

function Pregunta() {


    return (
        <div className="pregunta">
            <div className="pregunta__header">
                <p className="pregunta__numero">Pregunta X</p>
                <p className="pregunta__enRevision">
                    <img className="pregunta__hourglass" src={hourglass} alt="hourglass.svg"/>
                    En revisión
                </p>
            </div>
            <div className="pregunta__descripcionContainer">
                <p className="pregunta__descripcion">Cuantas personas trabajan en su empresa?</p>
            </div>
            <p className="pregunta__respuesta">Respuesta</p>
            <div className="pregunta__respuestaContainer">
                <p className="pregunta__descripcion">35</p>
            </div>
            <div className="pregunta__btnSection">
                <button className="pregunta__btnRevisar">Revisar</button>
                <button className="pregunta__btnAprobar">Aprobar</button>
            </div>
    


        </div>
    )
}

export default Pregunta
