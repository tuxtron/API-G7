import React, { Component } from 'react';
import './NavCuestionario.css';
import chevron from './images/chevron-left-solid.svg';
import { Link, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalEjemplo } from './Modal';
import { Button } from 'react-bootstrap';
import PreguntaSupervisor from '../Components/PreguntaSupervisor';
import PreguntaOperador from '../Components/PreguntaOperador';
import axios from 'axios';



class NavCuestionario extends Component {

  constructor(props){
    super(props);
    this.state = {
      addModalShow : false,
      modalType: "",
      encuestaEnviableParaRevison: true,
      encuestaEnviableParaAprobar: true,
      encuestaEnviableParaValidar: true,
      statusPreguntas: [],
      rol: ''
    }
  }


  async fetchData() {
    let config = {
      headers: {
        Authorization: `Bearer `+localStorage.getItem('token'),
      }
    }
    const idEncuesta = this.props.location.state.idEncuesta;
    var response = await axios.get(`https://obs-pyme-validacion-back.herokuapp.com/api/encuesta/${idEncuesta}`, config);
    const encuestas = response.data;
    this.setState({...this.state, objEncuesta:encuestas[0]});
     axios.get(`https://obs-pyme-validacion-back.herokuapp.com/api/usuario`, config)
      .then( res => { 
          console.log(res) 
          const rol = res.data.rol;
          this.setState({...this.state, rol: rol});
        })
      .catch( err => { console.log(err) } )
  }

  componentDidMount(){
    this.fetchData()
  }

  addModalClose =() => this.setState({...this.state, addModalShow : false});

  revisarBtnClicked = () => {
      if (this.state.objEncuesta) {
          const encuesta = this.state.objEncuesta;
          encuesta.sections.forEach(section => {
                section.options.forEach(question => {
                    if (question.status === 'PENDIENTE'){
                        this.setState({...this.state, addModalShow : false, encuestaEnviableParaRevison: false});
                    }
                });
          });
        }
      if (this.state.encuestaEnviableParaRevison) {
          // FALTA PROBAR
          if(window.confirm('Desea enviar esta encuesta a revisar?')){
            let config = {
              headers: {
                Authorization: `Bearer `+localStorage.getItem('token'),
              }
            }
              const data = { status: 'REVISION' }
              axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/encuesta/${this.state.objEncuesta._id}/status`, data, config)
                  .then( response => { 
                      console.log(response)
                      this.props.history.push('/home');
                    })
                  .catch( error => { console.log(error) })
          }
      }else{
          alert('Existen preguntas que todavia estan PENDIENTES. Por favor aprobarlas o mandarlas a revisión antes de enviar esta encuesta a revisión.')
      }
  }

  aprobarBtnClicked = () => {
      this.fetchData().then(()=>{
        if (this.state.objEncuesta) {
          const encuesta = this.state.objEncuesta;
          encuesta.sections.forEach(section => {
                this.setState({...this.state, encuestaEnviableParaAprobar: true});
                section.options.forEach((question) => {                  
                    if (question.status !== 'APROBADA'){
                        this.setState({...this.state, encuestaEnviableParaAprobar: false});
                    }
                });
          });
        }
        if (this.state.encuestaEnviableParaAprobar) {
          // FALTA PROBAR
          if(window.confirm('Desea aprobar esta encuesta?')){
            let config = {
              headers: {
                Authorization: `Bearer `+localStorage.getItem('token'),
              }
            }
              const data = { status: 'APROBADA' }
              axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/encuesta/${this.state.objEncuesta._id}/status`, data, config)
                  .then( response => { 
                      console.log(response);
                      this.props.history.push('/home');
                    } )
                  .catch( error => { console.log(error) })
          }
        }else{
            alert('Existen preguntas que todavia no estan APROBADAS. Por favor aprobarlas antes de aprobar esta encuesta.')
        }
        })
  }


  rechazarBtnClicked = () => {
      if(window.confirm('Desea rechazar esta encuesta?')){
        const data = { status: 'RECHAZADA' }
        let config = {
          headers: {
            Authorization: `Bearer `+localStorage.getItem('token'),
          }
        }
        axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/encuesta/${this.state.objEncuesta._id}/status`, data, config)
            .then( response => { 
                console.log(response)
                this.props.history.push('/home');
               })
            .catch( error => { console.log(error) })
      }
  }

  validarBtnClicked = ()=> {
    this.fetchData().then(()=>{
      if (this.state.objEncuesta) {
        const encuesta = this.state.objEncuesta;
        encuesta.sections.forEach(section => {
              this.setState({...this.state, encuestaEnviableParaValidar: true});
              section.options.forEach((question) => {                  
                  if (question.status === 'REVISION' ){
                      this.setState({...this.state, encuestaEnviableParaValidar: false});
                  }
              });
        });
      }
      if (this.state.encuestaEnviableParaValidar) {
        // FALTA PROBAR
        if(window.confirm('Desea terminar de validar esta encuesta?')){
          let config = {
            headers: {
              Authorization: `Bearer `+localStorage.getItem('token'),
            }
          }
            const data = { status: 'VALIDADA' }
            axios.patch(`https://obs-pyme-validacion-back.herokuapp.com/api/encuesta/${this.state.objEncuesta._id}/status`, data, config)
                .then( response => { 
                    console.log(response);
                    this.props.history.push('/home');
                  } )
                .catch( error => { console.log(error) })
        }
      }else{
          alert('Existen preguntas que todavia estan en REVISION. Por favor aprobarlas antes de aprobar esta encuesta.')
      }
      })
  }

  encuestaNoAprobable = () => {
     this.setState({ ...this.state, encuestaEnviableParaAprobar:false })
  }

    render(){
      return (
        <>
        {
          this.state.objEncuesta ? 
            <div className="nav">
                <Link className="nav_button"
                      to="/home">
                        <img
                        alt="<"
                        src={chevron}
                        className="nav_image"
                  /> 
                    {  this.state.objEncuesta.name ? " "+ this.state.objEncuesta.company.name : ' Loading...'}
                  </Link>
                <p/>
                <li><strong>ID:</strong> { this.state.objEncuesta._id.slice( this.state.objEncuesta._id.length - 6) }</li>
                <li><strong>Encuesta:</strong>  {  this.state.objEncuesta.name } </li>
                <li><strong>Fecha creada:</strong>  { this.state.objEncuesta.created.split("T",1) }</li>
                <li><strong> Fecha actualizada:</strong>  { this.state.objEncuesta.modified.split("T",1) }</li>
                <hr/>
            </div> : null
        }
        {
             this.state.objEncuesta ?  this.state.objEncuesta.sections.map((section)=>{
                return( 
                    <>
                      <p>{section.title}</p>
                      <p>{section.description}</p>
                      {
                        this.state.rol === 'SUPERVISOR' || this.state.rol === 'ADMINISTRADOR' ? 
                        section.options.map((pregunta, index) => {
                            return <PreguntaSupervisor
                                      key={pregunta._id}
                                      numId={ index }
                                      objPregunta={pregunta}
                                      userRol={this.state.rol}
                                   />
                        }) 
                        :null
                      }
                      {
                        this.state.rol === 'OPERADOR' ? 
                          section.options.map((pregunta, index) => {
                            if (pregunta.status === "REVISION") {
                              
                                return <PreguntaOperador
                                key={pregunta._id}
                                numId={ index }
                                objPregunta={pregunta}
                                userRol={this.state.rol}
                          />
                            }
                            return null
                        }) : null
                      }
                      <hr/>
                    </>
                )
            }) : null
        }
        <div className="nav_accept_button">
        {  (this.state.rol === "SUPERVISOR" || this.state.rol === "ADMINISTRADOR") && this.state.objEncuesta ?  
          <> 
              <Button 
                  className="nav_rechazarBtn"
                  onClick={ this.rechazarBtnClicked }
                  >Rechazar Encuesta
              </Button>
              <Button 
                  className="nav__revisarBtn"
                  onClick={ this.revisarBtnClicked }
                  >Enviar para revisar
              </Button>
              <Button 
                className="nav_aprobarBtn"
                onClick={ this.aprobarBtnClicked }
                >Aprobar Encuesta
              </Button> 
              <ModalEjemplo
                  show = { this.state.addModalShow}
                  onHide = {this.addModalClose}
                  modalType = { this.state.modalType}
              />
          </> : null 
        }
        {
          this.state.rol === "OPERADOR" ? 
          <Button 
          className="nav_enviarValidacionBtn"
          onClick={ this.validarBtnClicked }
          >Encuesta Validada
          </Button> : null
        }
        </div>
        </>
    );
    }
}


export default withRouter(NavCuestionario)
