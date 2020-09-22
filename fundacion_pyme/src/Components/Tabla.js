import React from 'react';
import './Tabla.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import encuestas from '../data-table.json'



const Tabla =()=>{
    return(
        <Table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre encuesta</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
           {encuestas.map (ul => {
               return (
                   <tr key={ul.id}>
                       <td>{ul.id}</td>
                       <td>{ul.survey_name}</td>
                       <td>{ul.company}</td>
                       <td>{ul.status}</td>
                       <td>{ul.date}</td>
                       <td>
                           <i class="fas fa-eye"></i>
                           <a href="">Detalle</a>
                        </td>
                   </tr>
               )
           })}
        </tbody>
    </Table>
    )
}

export default Tabla