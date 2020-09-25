import React from 'react';
import isoFOP from './images/isoFOP.svg';
import './Sidebar.css';
import singout from './images/sign-out.svg';
import listSolid from './images/listSolid.svg';
import userSolid from './images/user-solid.svg';

import { Link } from 'react-router-dom';

function Sidebar (props) {

    return (
        <>
               <div className="sidebar-body">

                    <div className="content">
                        <div style={{'display': ['flex'], alignItems:'flex-end'}}>
                            <img className="sidebar-ISO" src={isoFOP} alt="IsoFOP.svg"/>
                            <p  className="sidebar-FOP">Fundación Observatorio PYME </p>
                        </div>
                    <div>
                        <Link to="/home" className="location-text">
                            <img className="solid.list" src={listSolid} alt="listSolid.svg"/>
                            <p className="sidebar-text"href="#Encuestas">Encuestas</p>
                        </Link>
                        {   
                            props.isSupervisor ? 
                            <Link to="/usuarios" className="location-text" style={{marginTop:'20px'}} >
                                <img className="solid.list" src={userSolid} alt="listSolid.svg"/>
                                <p className="sidebar-text"href="#Encuestas">Usuarios</p>
                            </Link> 
                            : null
                        }
                    </div>
                    </div>
                    <div>
                            <Link to="/login" className="signOutBtn">
                                <img src={singout} alt="IsoFOP.svg"/>
                                <p className="sidebar-logoff" href="#LogOut">Cerrar Sesión</p>
                            </Link>
                    </div>

                </div>
        </>
    );
}

export default Sidebar;
