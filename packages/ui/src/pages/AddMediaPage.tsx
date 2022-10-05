import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Page from '../components/Page';
import EditMediaForm from '../components/forms/EditMediaForm/EditMediaForm';

export default function AddMedia() {
  return (
    <Page title="Upload Media">
      <>
        <Row className="mb-3">
          <Col s="auto">
            <EditMediaForm />
          </Col>
          <Col s="auto">
            <EditMediaForm />
          </Col>
          <Col s="auto">
            <EditMediaForm />
          </Col>
        </Row>
        <Row>
          <Col s="auto">
            <EditMediaForm />
          </Col>
          <Col s="auto">
            <EditMediaForm />
          </Col>
          <Col s="auto">
            <EditMediaForm />
          </Col>
        </Row>

        {/* Back & Next Button */}
        <div className="d-flex justify-content-between mb-3 mt-3">
          <Button variant="secondary" type="submit">
            Back
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </>
    </Page>
  );
}
