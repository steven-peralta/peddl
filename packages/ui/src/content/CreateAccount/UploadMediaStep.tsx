import React from 'react';
import { Row, Col } from 'react-bootstrap';
import EditMediaForm from '../../components/forms/EditMediaForm/EditMediaForm';

export default function UploadMediaStep() {
  return (
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
    </>
  );
}
