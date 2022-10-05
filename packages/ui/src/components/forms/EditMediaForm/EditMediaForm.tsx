import React from 'react';
import { Button } from 'react-bootstrap';

import './EditMediaForm.css';

export default function UploadMedia() {
  return (
    <div className="d-grid gap-3">
      <Button className="upload-btn border-secondary">
        <input type="file" id="input" />
        {/* if content is not filled and first in order => show plus */}
        {/* else => disable button function */}
      </Button>
    </div>
  );
}
