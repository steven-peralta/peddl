import React from 'react';
import { Form } from 'react-bootstrap';
import handleFormChange from './utils';
import FormInput from './FormInput';

export type EditLinksFormProps = {
  onSpotifyLinkInputChange: (link: string) => void;
  spotifyLinkRequired?: boolean;
  spotifyLinkValidationText?: string;
  onSoundcloudLinkInputChange: (link: string) => void;
  soundcloudLinkRequired?: boolean;
  soundcloudLinkValidationText?: string;
  onBandcampLinkInputChange: (link: string) => void;
  bandcampLinkRequired?: boolean;
  bandcampLinkValidationText?: string;
};

export default function EditLinksForm({
  onSpotifyLinkInputChange,
  spotifyLinkRequired = false,
  spotifyLinkValidationText,
  onSoundcloudLinkInputChange,
  soundcloudLinkRequired = false,
  soundcloudLinkValidationText,
  onBandcampLinkInputChange,
  bandcampLinkRequired = false,
  bandcampLinkValidationText,
}: EditLinksFormProps) {
  return (
    <div>
      <FormInput
        label="Spotify"
        htmlFor="spotify-link"
        required={spotifyLinkRequired}
        validationText={spotifyLinkValidationText}
      >
        <Form.Control
          type="text"
          name="spotify-link"
          placeholder="https://spotify.com"
          onChange={handleFormChange(onSpotifyLinkInputChange)}
        />
      </FormInput>

      <FormInput
        label="Soundcloud"
        htmlFor="soundcloud-link"
        required={soundcloudLinkRequired}
        validationText={soundcloudLinkValidationText}
      >
        <Form.Control
          type="text"
          placeholder="https://soundcloud.com"
          onChange={handleFormChange(onSoundcloudLinkInputChange)}
        />
      </FormInput>

      <FormInput
        label="Bandcamp"
        htmlFor="bandcamp-link"
        required={bandcampLinkRequired}
        validationText={bandcampLinkValidationText}
      >
        <Form.Control
          type="text"
          placeholder="https://bandcamp.com"
          onChange={handleFormChange(onBandcampLinkInputChange)}
        />
      </FormInput>
    </div>
  );
}
