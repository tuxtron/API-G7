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
import { Link, useHistory } from 'react-router-dom';
import trashAltRegular from './images/trash-alt-regular.svg'
import editRegular from './images/edit-regular.svg';
import './Usuarios.css';
import Button from '@material-ui/core/Button';

const columns = [
  { id: 'id', label: 'ID', minWidth: 20 },
  { id: 'name', label: 'Nombre del Empleado', minWidth: 250 },
  {
    id: 'usuario',
    label: 'Usuario',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'password',
    label: 'Contraseña',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'rol',
    label: 'Rol',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'accion',
    label: 'Acción',
    minWidth: 100,
    align: 'center',
  }
];

function createData(id, name, usuario, password, rol, action) {
  return { id, name, usuario, password, rol, action };
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  }
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

const [rows, setRows] = useState([]);

const history = useHistory();

useEffect(() => {
  async function fetchData() {
    let config = {
      headers: {
        Authorization: `Bearer `+localStorage.getItem('token'),
      }
    }
    const response = await axios.get(`https://obs-pyme-validacion-back.herokuapp.com/api/usuario/list`, config);
    const usuarios = response.data;
    const rows_list = []
    usuarios.forEach(usuario => {
      rows_list.push(createData(usuario._id, usuario.nombre, usuario.username, usuario.contraseña, usuario.rol, usuario.username));
    })
    setRows(rows_list);
  }
  fetchData();
}, []);

const deleteBtnClicked = (event) => {
    const id = event.target.alt;
    let config = {
      headers: {
        Authorization: `Bearer `+localStorage.getItem('token'),
      }
    }
    console.log(id)
    axios.delete(`https://obs-pyme-validacion-back.herokuapp.com/api/usuario/${id}`, config)
      .then(res => {
          console.log("deleting... "+res.statusText)
          const newRows = rows.filter(function( obj ) {
            return obj.id !== id;
        });
        setRows(newRows);
      })
      .catch(err => {
        console.log(err);
      });
}

const modificarBtnClicked = (event) => {
  event.preventDefault();
  const id = event.target.alt;
  history.push({pathname:'/altaUsuario', state:{tipo:'Modificar', username:id}})
}

let currentId = '';

  return (
    <div className="table">
        <p className="table-title">Listado de Usuarios</p>
        <div style={{display:'flex', marginBottom:'30px'}}>
            <input 
                type="text" 
                placeholder="Buscar usuario" 
                style={{padding:'8px 10px', borderRadius:'5px 0 0 5px', outline:'none'}}
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    if ( row['id'].toLowerCase().includes(searchText) || row['name'].toLowerCase().includes(searchText) || 
                    row['usuario'].toLowerCase().includes(searchText) || row['rol'].toLowerCase().includes(searchText) ){
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                if (column.id !== 'accion') {
                                    if (column.id === 'password'){
                                      
                                      return (
                                        <TableCell key={column.id} align={column.align}>
                                          { "*".repeat(value.length) }
                                      </TableCell>
                                      )
                                    }
                                    if (column.id === 'id'){
                                        currentId = value;
                                        return (
                                          <TableCell key={column.id} align={column.align}>
                                            {value.slice(value.length - 6)}
                                          </TableCell>
                                        )
                                    }
                                    if (column.id === 'usuario'){
                                      return (
                                        <TableCell key={column.id} align={column.align}>
                                          {value}
                                        </TableCell>
                                      )
                                  }
                                    return (            
                                        <TableCell key={column.id} align={column.align}>
                                            {value}
                                        </TableCell>
                                        );
                                }else{
                                    return (
                                        <TableCell key={column.id} align={column.align} style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'15px 0px'}}>
                                            <Link style={{display:'flex', alignItems:'center', textDecoration:'none'}} onClick={(event)=>modificarBtnClicked(event)}> 
                                                <img className="detail-eye" src={editRegular} alt={currentId}/>
                                            </Link>
                                            <Link style={{display:'flex', alignItems:'center', textDecoration:'none', marginLeft:'10px'}}
                                                    onClick={(event)=>deleteBtnClicked(event)}>  
                                                <img className="detail-eye" src={trashAltRegular} alt={currentId} />
                                            </Link>
                                        </TableCell>
                                    );
                                }
                            })}
                            </TableRow>
                        );
                    }
                    return null
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
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'20px'}}>
                <Link to={{pathname:'/altaUsuario', state:{tipo:'Alta'}}} style={{textDecoration:'none'}}>
                    <Button className="buttonAlta">Alta Usuario</Button>
                </Link>
        </div>
    </div>
  );
}