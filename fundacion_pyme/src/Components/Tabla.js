// import React from 'react';
// import './Tabla.css';
// import { Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import encuestas from '../data-table.json'
// import eye from './images/eye-solid.svg'
// import { Link } from 'react-router-dom'
// import listaDeEncuentas from '../lista_encuentas_la_posta.json';

// const Tabla =()=>{
//     return(
//         <div className="table">
//             <p className="table-title">Listado de Encuestas</p>
//             <div style={{display:'flex', marginBottom:'30px'}}>
//             <input type="text" placeholder="buscar encuesta" style={{padding:'8px 10px'}}/>
//             </div>
//         <Table  borderless hover responsive>
//         <thead class="survey-table" style={{borderBottom: '1px solid #42526E', textAlign:'center'}}>
//             <tr>
//                 <th>Id</th>
//                 <th>Nombre encuesta</th>
//                 <th>Empresa</th>
//                 <th>Estado</th>
//                 <th>Creado</th>
//                 <th>Modificado</th>
//                 <th>Acciones</th>
//             </tr>
//         </thead>
//         <tbody class="survey-table" style={{textAlign:'center'}}>
//            {listaDeEncuentas.map (encuesta => {
//                return (
//                    <tr className="tabla__row" key={encuesta.id}>
//                        <td>{encuesta.id}</td>
//                        <td style={{textAlign:'left'}}>{encuesta.name}</td>
//                        <td>{encuesta.company}</td>
//                        <td>{encuesta.status}</td>
//                        <td>{encuesta.created}</td>
//                        <td>{encuesta.modified}</td>
//                        <td>
//                        <Link 
//                             to={{pathname:"/detalle",
//                                   state:{preguntas:encuesta.sections}
//                                 }} 
//                             style={{display:'flex', 
//                                     alignItems:'center',
//                                     textDecoration:'none'}}
//                         >  
//                            <img class="detail-eye" src={eye} alt="eye-solid.svg"/>
//                            <p className="verDetalle">Ver detalle</p>
//                        </Link>
//                         </td>
//                    </tr>
//                )
//            })}
//         </tbody>
//     </Table>
//     </div>
//     )
// }

// export default Tabla

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import listaDeEncuentas from '../lista_encuentas_la_posta.json';
import { Link } from 'react-router-dom';
import eye from './images/eye-solid.svg';

const columns = [
  { id: 'id', label: 'ID', minWidth: 20 },
  { id: 'name', label: 'Encuesta', minWidth: 250 },
  {
    id: 'empresa',
    label: 'Empresa',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'estado',
    label: 'Estado',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'creado',
    label: 'Creado',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'modificado',
    label: 'Modificado',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'accion',
    label: 'Acción',
    minWidth: 100,
    align: 'center',
  },
];

function createData(id, name, empresa, estado, creado, modificado, accion) {
  return { id, name, empresa, estado, creado, modificado, accion};
}

const rows = [];
listaDeEncuentas.forEach(encuesta => {
    rows.push(createData(encuesta.id, encuesta.name, encuesta.empresa, encuesta.status, encuesta.created, encuesta.modified, encuesta.sections));
});

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="table">
        <p className="table-title">Listado de Encuestas</p>
        <div style={{display:'flex', marginBottom:'30px'}}>
            <input type="text" placeholder="buscar encuesta" style={{padding:'8px 10px'}}/>
        </div>
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id !== 'accion') {
                            return (            
                                <TableCell key={column.id} align={column.align}>
                                    {value}
                                </TableCell>
                                );
                        }else{
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    <Link 
                                        to={{pathname:"/detalle",
                                            preguntas:value
                                        }} 
                                        style={{display:'flex', 
                                                alignItems:'center',
                                                textDecoration:'none',
                                                marginLeft:'20px'}}
                                        >  
                                            <img class="detail-eye" src={eye} alt="eye-solid.svg"/>
                                            <p className="verDetalle">Ver detalle</p>
                                    </Link>
                                </TableCell>
                            );
                        }
                    })}
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
    </div>
  );
}