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
import { useAuth } from '../../providers/AuthProvider';

export default function PeddlNavbar() {
  const {
    isAuthed: [isAuthed],
  } = useAuth();

  const unauthenticatedLinks = (
    <Nav className="flex-grow-1 pe-3">
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/register">
        Register
      </Link>
    </Nav>
  );

  const authenticatedLinks = (
    <Nav className="flex-grow-1 pe-3">
      <Link className="nav-link" to="/profiles">
        Home
      </Link>
      <Link className="nav-link" to="/matches">
        Matches
      </Link>
      <Link className="nav-link" to="/viewProfile">
        Profile
      </Link>
      <Link className="nav-link" to="/searchSettings">
        Search Settings
      </Link>
      <Link className="nav-link" to="/logout">
        Logout
      </Link>
    </Nav>
  );
  return (
    <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img alt="peddlLogo" className="logo" src={peddlLogo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas placement="end">
          <OffcanvasHeader closeButton>
            <OffcanvasTitle>Navigation</OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            {isAuthed ? authenticatedLinks : unauthenticatedLinks}
          </OffcanvasBody>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
