import React from 'react';
import './PeddlNavbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from 'react-bootstrap';
import peddlLogo from '../../peddlLogo.svg';

export default function PeddlNavbar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img alt="peddlLogo" className="logo" src={peddlLogo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas placement="end">
          <OffcanvasHeader closeButton>
            <OffcanvasTitle>Navigation</OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <Nav className="flex-grow-1 pe-3">
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </Nav>
          </OffcanvasBody>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
