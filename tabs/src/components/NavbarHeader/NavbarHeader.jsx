import React from "react";
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarHeader = () => {
 

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Container>
      <Navbar.Brand href=""></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link>
            {' '}
            <Link className="text-decoration-none text-black" to="/">
              Request
            </Link>
          </Nav.Link>
          <Nav.Link>
            {' '}
            <Link className="text-decoration-none text-black" to="/approval">
              Approval
            </Link>
          </Nav.Link>
          <Nav.Link>
            {' '}
            <Link className="text-decoration-none text-black" to="/settings">
              Settings
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>


  /*<nav class="navbar navbar-light bg-light navbar-expand-md p-10">
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse ms-auto" id="navbar">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Request <span class="sr-only"></span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/approval">Approval</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link " href="/configuration" role="button" aria-expanded="false">
            Configuration
          </a>
        </li>
      </ul>
    </div>
  </nav>*/
  );
};

export default NavbarHeader;