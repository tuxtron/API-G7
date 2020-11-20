import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import eye from './images/eye-solid.svg';
import { decodeToken } from "react-jwt";

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
    id: 'sections',
    label: 'Acción',
    minWidth: 100,
    align: 'center',
  },
];

function createData(id, name, empresa, estado, creado, modificado, sections) {
  return { id, name, empresa, estado, creado, modificado, sections};
};

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
  const [searchText, setSearchText] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

// https://obs-pyme-validacion-back.herokuapp.com/api/encuesta

const [data, setData] = useState({rol:''});
const [rows, setRows] = useState([]);

useEffect(() => {
  async function fetchData() {
    let config = {
      headers: {
        Authorization: `Bearer `+localStorage.getItem('token'),
      }
    }
    const response = await axios.get(`https://obs-pyme-validacion-back.herokuapp.com/api/encuesta`, config);
    const encuestas = response.data;
    const rows_list = []
    encuestas.forEach(encuesta => {
        var date = encuesta.modified.split("T", 1).toString();
        const modifiedFullDate = date
        date = encuesta.created.split("T", 1).toString();
        const createdFullDate = date
        const id = encuesta._id.slice(encuesta._id.length - 6)
        rows_list.push(createData(id, encuesta.name, encuesta.company.name, encuesta.status, createdFullDate, modifiedFullDate, encuesta._id));
    })
    setRows(rows_list);
    setData(encuestas);
  }
  fetchData();
}, []);

const tokenData = decodeToken(localStorage.getItem('token'));
const rol = tokenData.role;

  return (
    <div className="table">
        <p className="table-title">Listado de Encuestas</p>
        <div style={{display:'flex', marginBottom:'30px'}}>
            <input 
                type="text" 
                placeholder="Buscar encuesta" 
                style={{padding:'8px 10px', 
                borderRadius:'5px 0 0 5px', outline:'none'}} 
                value={searchText}
                onChange={(event)=>setSearchText(event.target.value.toLowerCase())}
              />
            {/* <button style={{height:'37px', border:'none', backgroundColor:'#42536E', color:'white', padding:'0 20px', borderRadius:'0 5px 5px 0'}}>Buscar</button> */}
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
              {
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  if ( row['name'].toLowerCase().includes(searchText) || row['id'].toLowerCase().includes(searchText) || 
                       row['empresa'].toLowerCase().includes(searchText) || row['estado'].toLowerCase().includes(searchText) ||
                       row['creado'].toLowerCase().includes(searchText) || row['modificado'].toLowerCase().includes(searchText) ){
                         if ( rol !== "OPERADOR" ){
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                if (column.id !== 'sections') {
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
                                                     state:{ idEncuesta:value }
                                                }} 
                                                style={{display:'flex', 
                                                        alignItems:'center',
                                                        textDecoration:'none',
                                                        marginLeft:'20px'}}
                                                >  
                                                    <img className="detail-eye" src={eye} alt="eye-solid.svg"/>
                                                    <p className="verDetalle">Ver detalle</p>
                                            </Link>
                                        </TableCell>
                                    );
                                }
                            })}
                            </TableRow>
                          );
                         }else{
                            if ( row['estado'] === "REVISION" ){
                              return (              
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    if (column.id !== 'sections') {
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
                                                         state:{ idEncuesta:value }
                                                    }} 
                                                    style={{display:'flex', 
                                                            alignItems:'center',
                                                            textDecoration:'none',
                                                            marginLeft:'20px'}}
                                                    >  
                                                        <img className="detail-eye" src={eye} alt="eye-solid.svg"/>
                                                        <p className="verDetalle">Ver detalle</p>
                                                </Link>
                                            </TableCell>
                                        );
                                    }
                                })}
                                </TableRow>
                              );
                            }else{
                                return null
                            }
                
                         }
                  }
                  return null
                })
              }
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