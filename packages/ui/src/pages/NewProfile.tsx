import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Page from '../components/Page';
import EditLoginForm from '../components/forms/EditLoginForm';
import EditPersonalInfoForm from '../components/forms/EditPersonalInfoForm';
import EditLinksForm from '../components/forms/EditLinksForm';

export default function NewProfile() {
  return (
    <Page title="New Profile">
      <div className="d-grid gap-3">
        <Form>
          {/* Login Information */}
          <EditLoginForm />

          {/* Personal Info */}
          <EditPersonalInfoForm />

          {/* Links */}
          <EditLinksForm />

          {/* Back & Next Button */}
          <div className="d-flex justify-content-between mb-3">
            <Button variant="secondary" type="submit">
              Back
            </Button>
            <Button variant="primary" type="submit">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </Page>
  );
}
