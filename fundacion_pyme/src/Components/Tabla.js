import React from 'react';
import './Tabla.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import encuestas from '../data-table.json'
import eye from './images/eye-solid.svg'




const Tabla =()=>{
    return(
        <Table  bordered hover responsive>
        <thead class="survey-table">
            <tr>
                <th>Id</th>
                <th>Nombre encuesta</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody class="survey-table">
           {encuestas.map (ul => {
               return (
                   <tr key={ul.id}>
                       <td>{ul.id}</td>
                       <td>{ul.survey_name}</td>
                       <td>{ul.company}</td>
                       <td>{ul.status}</td>
                       <td>{ul.date}</td>
                       <td>
                       <img class="detail-eye" src={eye} alt="eye-solid.svg"/>
                           <a href="">Ver detalle</a>
                        </td>
                   </tr>
               )
           })}
        </tbody>
    </Table>
    )
}

export default Tabla