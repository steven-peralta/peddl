import React from 'react';
import { Button, Container } from 'react-bootstrap';
import './TitlePage.css';
import { Link } from 'react-router-dom';
import logo from './logoBlk.svg';

export default function TitlePage() {
  return (
    <Container>
      <div className="Tpage mb-3">
        <div className="imageContainer d-grid gap-3 col-md-6 mb-5 mx-auto">
          <img alt="Peddle Logo" className="splashLogo" src={logo} />
        </div>
        <div className="btn d-grid gap-3 mx-auto">
          <Link to="/register">
            <Button className="accountButton" size="lg" variant="primary">
              Create an accounthgskldfhgkls
            </Button>
          </Link>
          <Link to="/login">
            <Button
              className="accountButton"
              size="lg"
              type="button"
              variant="outline-primary"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
