import React from 'react';
import { Button, Container } from 'react-bootstrap';
import './TitlePage.css';
import logo from './logoBlk.svg';

export default function TitlePage() {
  return (
    <Container>
      <div className="Tpage mb-3">
        <div className="imageContainer d-grid gap-3 col-md-6 mb-5 mx-auto">
          <img alt="Peddle Logo" className="splashLogo" src={logo} />
        </div>
        <div className="d-grid gap-3 mx-auto">
          <Button href="/register" size="lg" variant="primary">
            Create an account
          </Button>
          <Button
            href="/login"
            size="lg"
            type="button"
            variant="outline-primary"
          >
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
}
