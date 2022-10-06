import React from 'react';
import './PeddlNavbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from 'react-bootstrap';
import peddlLogo from '../../peddlLogo.svg';

export default function PeddlNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container fluid>
        <Navbar.Brand>
          <img className="logo" src={peddlLogo} alt="peddlLogo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas placement="end">
          <OffcanvasHeader closeButton>
            <OffcanvasTitle>Navigation</OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <Nav className="flex-grow-1 pe-3">
              <Nav.Link href="#">Login</Nav.Link>
              <Nav.Link href="#">Register</Nav.Link>
            </Nav>
          </OffcanvasBody>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
