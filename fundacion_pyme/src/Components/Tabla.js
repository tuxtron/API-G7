import React from 'react';
import './Tabla.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import encuestas from '../data-table.json'
import eye from './images/eye-solid.svg'
import { Link } from 'react-router-dom'
// import SearchIcon from '@material-ui/icons/Search';




const Tabla =()=>{
    return(
        <div className="table">
            <p className="table-title">Listado de Encuestas</p>
            {/* <div style={{display:'flex', marginBottom:'30px'}}>
            <input type="text" placeholder="buscar encuesta" style={{padding:'8px 10px'}}/>
            <Link>
                <SearchIcon fontSize="large" style={{color:'black'}}/>
            </Link>
            </div> */}
        <Table  borderless hover responsive>
        <thead class="survey-table" style={{borderBottom: '1px solid #42526E', textAlign:'center'}}>
            <tr>
                <th>Id</th>
                <th>Nombre encuesta</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody class="survey-table" style={{textAlign:'center'}}>
           {encuestas.map (ul => {
               return (
                   <tr key={ul.id}>
                       <td>{ul.id}</td>
                       <td style={{textAlign:'left'}}>{ul.survey_name}</td>
                       <td>{ul.company}</td>
                       <td>{ul.status}</td>
                       <td>{ul.date}</td>
                       <td>
                       <Link to="/detalle" style={{display:'flex', alignItems:'center', textDecoration:'none'}}>  
                           <img class="detail-eye" src={eye} alt="eye-solid.svg"/>
                           <p className="verDetalle">Ver detalle</p>
                        </Link>
                        </td>
                   </tr>
               )
           })}
        </tbody>
    </Table>
    </div>
    )
}

export default Tabla