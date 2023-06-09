import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { FcExport } from 'react-icons/fc'

function Header() {

    const state = useContext(GlobalState);
    const [user, setUser] = state.UserAPI.user;

    return(
        <Navbar bg="dark" variant='dark' expand="lg" sticky='top' style={{marginBottom: "24px"}}>
      <Container>
        <Navbar.Brand href="#home">RESUME PARSER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
          <Nav className='ms-auto'>
            {user && <Button>{user.first_name + ' ' + user.last_name}<FcExport/></Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
    // return (
    //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: "24px"}}>
    //         <div className="container-fluid">
    //             <a className="navbar-brand" href="/">ResumeParser</a>
    //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span className="navbar-toggler-icon"></span>
    //             </button>
    //             <div className="collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarSupportedContent">
    //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //                     {/*<li className="nav-item">
    //                         <a className="nav-link active" aria-current="page" href="#">Home</a>
    //                     </li>
    //                      <li className="nav-item">
    //                         <a className="nav-link" href="#">Link</a>
    //                     </li>
    //                     <li className="nav-item dropdown">
    //                         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                             Dropdown
    //                         </a>
    //                         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    //                             <li><a className="dropdown-item" href="#">Action</a></li>
    //                             <li><a className="dropdown-item" href="#">Another action</a></li>
    //                             <li><a className="dropdown-item" href="#">Something else here</a></li>
    //                         </ul>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    //                     </li> */}
    //                 </ul>
    //             </div>
    //             <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
    //                 <ul className="navbar-nav ms-auto">
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="#">{user.first_name + ' ' + user.last_name}</a>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </div>
    //     </nav>
    // )
}

export default Header