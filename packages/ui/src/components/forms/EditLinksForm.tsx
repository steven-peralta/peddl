import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { handleFormChange } from './utils';
import FormInput from './FormInput';

export type EditLinksFormProps = {
  spotifyLink: string;
  onSpotifyLinkInputChange: (link: string) => void;
  onSpotifyLinkInputBlur: () => void;
  spotifyLinkRequired?: boolean;
  spotifyLinkValidationText?: string;

  soundcloudLink: string;
  onSoundcloudLinkInputChange: (link: string) => void;
  onSoundcloudLinkInputBlur: () => void;
  soundcloudLinkRequired?: boolean;
  soundcloudLinkValidationText?: string;

  bandcampLink: string;
  onBandcampLinkInputChange: (link: string) => void;
  onBandcampLinkInputBlur: () => void;
  bandcampLinkRequired?: boolean;
  bandcampLinkValidationText?: string;
};

export default function EditLinksForm({
  spotifyLink,
  onSpotifyLinkInputChange,
  onSpotifyLinkInputBlur,
  spotifyLinkRequired = false,
  spotifyLinkValidationText,

  soundcloudLink,
  onSoundcloudLinkInputChange,
  onSoundcloudLinkInputBlur,
  soundcloudLinkRequired = false,
  soundcloudLinkValidationText,

  bandcampLink,
  onBandcampLinkInputChange,
  onBandcampLinkInputBlur,
  bandcampLinkRequired = false,
  bandcampLinkValidationText,
}: EditLinksFormProps) {
  return (
    <div>
      <FormInput
        forceShowValidation
        htmlFor="spotify-link"
        label="Spotify"
        required={spotifyLinkRequired}
        validationText={spotifyLinkValidationText}
      >
        <Form.Control
          name="spotify-link"
          onBlur={onSpotifyLinkInputBlur}
          onChange={handleFormChange(onSpotifyLinkInputChange)}
          placeholder="https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2?si=a464340973414399"
          type="text"
          value={spotifyLink}
        />
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="soundcloud-link"
        label="Soundcloud"
        required={soundcloudLinkRequired}
        validationText={soundcloudLinkValidationText}
      >
        <InputGroup>
          <InputGroup.Text>https://soundcloud.com/</InputGroup.Text>
          <Form.Control
            name="soundcloud-link"
            onBlur={onSoundcloudLinkInputBlur}
            onChange={handleFormChange(onSoundcloudLinkInputChange)}
            placeholder="Soundcloud username"
            type="text"
            value={soundcloudLink}
          />
        </InputGroup>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="bandcamp-link"
        label="Bandcamp"
        required={bandcampLinkRequired}
        validationText={bandcampLinkValidationText}
      >
        <InputGroup>
          <InputGroup.Text>https://</InputGroup.Text>
          <Form.Control
            name="bandcamp-link"
            onBlur={onBandcampLinkInputBlur}
            onChange={handleFormChange(onBandcampLinkInputChange)}
            placeholder="Bandcamp username"
            type="text"
            value={bandcampLink}
          />
          <InputGroup.Text>.bandcamp.com/</InputGroup.Text>
        </InputGroup>
      </FormInput>
    </div>
  );
}
