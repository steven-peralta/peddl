import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Page from '../Page';
import UploadMedia from '../UploadMedia/UploadMedia';

export default function NewProfileMedia() {
  return (
    <Page title="Upload Media">
      <div className="d-grid gap-3">
        <Row>
          <Col>
            <UploadMedia />
          </Col>
          <Col>
            <UploadMedia />
          </Col>
          <Col>
            <UploadMedia />
          </Col>
        </Row>
      </div>
    </Page>
  );
}
