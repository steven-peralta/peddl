import React from 'react';
import './MainNavbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from 'react-bootstrap';
import peddlLogo from '../../peddlLogo.svg';

export default function MainNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img className="logo" src={peddlLogo} alt="peddlLogo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas placement="end" id="basic-navbar-nav">
          <OffcanvasHeader closeButton>
            <OffcanvasTitle>Navigation</OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className="d-grid gap-3">
              <div className="p-2">
                <Nav.Link className="text-muted" href="#link">
                  Login
                </Nav.Link>
              </div>
              <div className="p-2">
                <Nav.Link className="text-muted" href="#link">
                  Register
                </Nav.Link>
              </div>
            </div>
          </OffcanvasBody>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
