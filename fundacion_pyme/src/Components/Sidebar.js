import React from 'react';
import isoFOP from './images/isoFOP.svg';
import './Sidebar.css';
import singout from './images/sign-out.svg';
import listSolid from './images/listSolid.svg'

function Sidebar () {

    return (
        <>
               <div className="sidebar-body">

                    <div className="content">
                        <div style={{display:'flex'}}>
                            <img className="sidebar-ISO" src={isoFOP} alt="IsoFOP.svg"/>
                            <p  className="sidebar-FOP">Fundacion observatorio PYME </p>
                        </div>
                    <div>
                        <div className="location-text">
                            <img className="solid.list" src={listSolid} alt="listSolid.svg"/>
                            <a className="sidebar-text"href="#Encuestas">Encuestas</a>
                        </div>

                    </div>
                    </div>
                    <div>
                            <div style={{'display': ['flex']}}>
                                <img src={singout} alt="IsoFOP.svg"/>
                                <a className="sidebar-logoff" href="#LogOut">Cerrar Sesión</a>
                            </div>
                    </div>

                </div>
        </>
    );
}

export default Sidebar;
