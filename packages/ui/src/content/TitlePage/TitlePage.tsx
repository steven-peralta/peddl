import React from 'react';
import { Button, Container } from 'react-bootstrap';
import './TitlePage.css';
import logo from './logoBlk.svg';

export default function TitlePage() {
  return (
    <Container>
      <div className="Tpage mb-3">
        <div className="imageContainer d-grid gap-3 col-md-6 mx-auto">
          <img alt="Peddle Logo" className="splashLogo" src={logo} />
        </div>
        <div className="d-grid gap-3 col-6 mx-auto">
          <Button href="/register" variant="primary">
            Create an account
          </Button>
          <Button href="/login" type="button" variant="outline-primary">
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
}
