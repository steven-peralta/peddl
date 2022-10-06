import React from 'react';
import { Form } from 'react-bootstrap';
import handleFormChange from './utils';

export type EditLinksFormProps = {
  onSpotifyLinkInputChange: (link: string) => void;
  onSoundcloudLinkInputChange: (link: string) => void;
  onBandcampLinkInputChange: (link: string) => void;
};

export default function EditLinksForm({
  onSpotifyLinkInputChange,
  onSoundcloudLinkInputChange,
  onBandcampLinkInputChange,
}: EditLinksFormProps) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Spotify</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://spotify.com"
          onChange={handleFormChange(onSpotifyLinkInputChange)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>SoundCloud</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://soundcloud.com"
          onChange={handleFormChange(onSoundcloudLinkInputChange)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bandcamp</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://bandcamp.com"
          onChange={handleFormChange(onBandcampLinkInputChange)}
        />
      </Form.Group>
    </div>
  );
}
