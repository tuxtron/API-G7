import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import './Drawer.css';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
  rtaList: {
    backgroundColor:'#c6c6c6',
  },
  list: {
    width: 300,
    height: "100%",
    overflowY: "scroll"
  },
  fullList: {
    width: 'auto',
    overflowY: 'scroll'
  },
  inline: {
    color: "#42536E",
    fontWeight: "bold"
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
    inputObs: '',
    idPregunta: props.pregunta._id,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const pregunta = props.pregunta;

  const getFechaHora = (date) => {
    //transforma "2020-10-28T18:15:35.468Z" a "28-10-2020"
    const newDate = date.split("T", 1);
    var newHora = date.split("T", 2);
    newHora = newHora[1].split(".", 1)
    return newHora+" "+newDate
}

  const revisarBtnClicked = () => {
      props.revisarBtnClicked();
      setState({...state, right:false});
      const data = {
        idPregunta: state.idPregunta,
        revision : {
            observacion: {
                // falta la parte de traer usuario
                usuario: "adrewes123",
                mensaje: state.inputObs
                }
        }
    };
    
    let config = {
      headers: {
        Authorization: `Bearer `+localStorage.getItem('token'),
      }
    }

    axios.post(`https://obs-pyme-validacion-back.herokuapp.com/api/pregunta/revision`, data, config)
        .then( (response) => console.log(response))
        .catch( (error) => console.log(error));
    
    
  }

  const textAreaOnChange = (event) => {
      const value = event.target.value;
      setState({...state, inputObs:value});
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.rtaList}>
            <ListItem>
                <ListItemText secondary={"Respuesta Original: " + pregunta.value} />
            </ListItem>
      </List>
      <Divider />
      {
          pregunta.revisiones.length !== 0 ? 
          <>
          {
              pregunta.revisiones.map((revision, index) => {
                  return (
                      <>
                        {
                           revision.observacion ? 
                           <List key={index}>
                            <ListItem>
                              <ListItemIcon><PersonIcon /></ListItemIcon>
                              <ListItemText secondary={
                                  <React.Fragment>
                                      <Typography
                                          component="span"
                                          variant="body2"
                                          className={classes.inline}
                                          color="textPrimary"
                                      >
                                      { revision.observacion.usuario+" - Supervisor" }
                                      </Typography>
                                      <br/>
                                      { <strong>Observación:</strong> }
                                      <br/>
                                      { revision.observacion.mensaje }
                                      <br/>
                                      { getFechaHora(revision.observacion.created) }
                                  </React.Fragment>
                              } />
                            </ListItem>
                          </List>:null
                        }
                        {
                          revision.respuestaValidada ? 
                            <List key={index} style={{width:"300px", overflowX:"hidden"}}>
                              <Divider />
                              <ListItem>
                                <ListItemIcon><PersonIcon /></ListItemIcon>
                                <ListItemText secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                        { revision.respuestaValidada.usuario+" - Operador" } 
                                        </Typography>
                                        <br/>
                                        { <strong>Respuesta Validada:</strong> }
                                        <br/>
                                        { revision.respuestaValidada.value }
                                        <br/>
                                        { revision.respuestaValidada.created ? getFechaHora(revision.respuestaValidada.created) : null }
                                    </React.Fragment>
                                } />
                              </ListItem>
                          </List> : null
                        }
                        <Divider />
                      </>
                  )
              })
          }
        </> : null
      }
      
      {
        props.rol !== "OPERADOR" ?
            <div className="drawer__inputSection">
                <textarea className="drawer__input" rows={5} placeholder={"Escriba su comentario..."} onChange={(event) => textAreaOnChange(event)} />
                <Button onClick={revisarBtnClicked} className="drawer__inputBtun" >Enviar a Revisar</Button>
            </div> 
          :
          null
      }

    </div>
  );

  return (
        <React.Fragment key={'right'}>
          {
            props.rol !== "OPERADOR" ?
                <Button className="drawer__btnObservacionSupervisor" onClick={toggleDrawer('right', true)}>Revisar</Button>
            :
                <Button className="drawer__btnObservacionOperador" onClick={toggleDrawer('right', true)}>Obervaciones</Button>
          }
          <Drawer  anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
  );
}
