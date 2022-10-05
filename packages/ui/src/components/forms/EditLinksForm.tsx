import React from 'react';
import { Form } from 'react-bootstrap';

export default function EditLinksForm() {
  return (
    <Form>
      <div className="mb-3">
        <h2>Links</h2>
      </div>
      <Form.Group className="mb-3" controlId="formSpotify">
        <Form.Label>Spotify</Form.Label>
        <Form.Control type="link" placeholder="https://Spotify.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSoundCloud">
        <Form.Label>SoundCloud</Form.Label>
        <Form.Control type="link" placeholder="https://SoundCloud.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBandcamp">
        <Form.Label>Bandcamp</Form.Label>
        <Form.Control type="link" placeholder="https://Bandcamp.com" />
      </Form.Group>
    </Form>
  );
}
