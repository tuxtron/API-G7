import React, { useState } from 'react';
import './Tabla.css';
import './Usuarios.css';
import { Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import usuarios from '../data-usuarios.json'
import trashAltRegular from './images/trash-alt-regular.svg'
import editRegular from './images/edit-regular.svg'
import { Link } from 'react-router-dom'
import { ModalUsuario } from './ModalUsuario';


const Usuarios =()=>{

    const [state, setState] = useState({
        addModalShow : false,
        modalType: "",
    })

    let addModalClose =() => setState({addModalShow : false});

    return(
        <div className="table">
        <p className="table-title">Listado de Usuarios</p>
        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
        <Link to="/altaUsuario" className="pregunta__btnAprobar" >Agregar usuario</Link>
        </div>
        <Table  borderless hover responsive>
        <thead class="survey-table" style={{borderBottom: '1px solid #42526E', textAlign:'center'}}>
            <tr>
                <th>Id</th>
                <th>Nombre del Empleado</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Rol</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody class="survey-table" style={{textAlign:'center'}}>
           {usuarios.map (ul => {
               return (
                   <tr key={ul.id}>
                       <td>{ul.id}</td>
                       <td style={{textAlign:'left'}}>{ul.nombre}</td>
                       <td>{ul.usuario}</td>
                       <td>{ul.contraseña}</td>
                       <td>{ul.rol}</td>
                       <td style={{display:'flex', justifyContent:'center', marginTop:'5px'}}>

                       <Link to="/altaUsuario" style={{display:'flex', alignItems:'center', textDecoration:'none'}}>  
                           <img class="detail-eye" src={editRegular} alt="eye-solid.svg"/>
                        </Link>
                        <Link style={{display:'flex', alignItems:'center', textDecoration:'none', marginLeft:'10px'}}
                              onClick={()=> setState({addModalShow : true, modalType:"Eliminar Usuario"})}>  
                           <img class="detail-eye" src={trashAltRegular} alt="eye-solid.svg"/>
                        </Link>
                        </td>
                   </tr>
               )
           })}
        </tbody>
    </Table>
           <ModalUsuario
                show = {state.addModalShow}
                onHide = {addModalClose}
                modalType = {state.modalType}/>
    </div>
    )
}

export default Usuarios;