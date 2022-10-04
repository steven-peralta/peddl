import React from 'react';
import { Button } from 'react-bootstrap';

import './UploadMedia.css';

export default function UploadMedia() {
  return (
    <div className="d-grid gap-3">
      <Button className="upload-btn border-secondary">
        <input type="file" id="input" />
      </Button>
    </div>
  );
}
