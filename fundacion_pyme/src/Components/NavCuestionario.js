import React from 'react';
import './NavCuestionario.css';
import hourglass from './images/hourglass-regular.svg';
import checksolid from './images/check-solid.svg'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

function NavCuestionario(props) {
    return (
        <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
            Disabled
            </Nav.Link>
        </Nav.Item>
        </Nav>
    );
}

export default NavCuestionario