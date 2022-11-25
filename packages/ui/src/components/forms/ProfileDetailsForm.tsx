import React from 'react';
import {
  CreateProfileBody,
  validateBirthday,
  validateName,
  Location,
  validateLocation,
  Gender,
  validateGender,
  validateGenres,
  GenreTagOptions,
  TagOption,
  Genre,
  getTagOptionsFromValues,
  TalentTagOptions,
  Talent,
  validateTalents,
  validateBio,
  LocationTagOptions,
  getTagOptionFromValue,
  GenderTagOptions,
  validateSpotifyLink,
  validateBandcampUsername,
  validateSoundcloudUsername,
} from '@peddl/common';
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import FormInput from './FormInput';
import { ValidationFormProps } from './types';
import { getFormProps, validateOnBlur, validateOnChange } from './utils';
import extractTagOptions from '../../utils/extractTagOptions';

export type ProfileDetailsFormData = Partial<CreateProfileBody>;

export default function ProfileDetailsForm({
  dataState,
  validationState,
  initialValidateState,
}: ValidationFormProps<ProfileDetailsFormData>) {
  const [validationResults] = validationState;
  const [data] = dataState;

  const minDate = new Date();
  minDate.setFullYear(new Date().getFullYear() - 18);
  const maxDate = new Date();
  maxDate.setFullYear(new Date().getFullYear() + 120);

  return (
    <div>
      <h2 className="mb-3">Profile details</h2>
      <FormInput
        htmlFor="name"
        label="Name"
        required
        validationResult={validationResults.name}
      >
        <Form.Control
          name="name"
          placeholder="Name"
          type="text"
          {...getFormProps(
            'name',
            validateName,
            dataState,
            validationState,
            initialValidateState
          )}
        />
      </FormInput>
      <FormInput
        htmlFor="birthday"
        label="Birthday"
        required
        validationResult={validationResults.birthday}
      >
        <DatePicker
          className="form-control"
          dropdownMode="select"
          maxDate={maxDate}
          name="birthday"
          onBlur={validateOnBlur(
            'birthday',
            validateBirthday,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={validateOnChange(
            'birthday',
            validateBirthday,
            dataState,
            validationState,
            initialValidateState
          )}
          peekNextMonth
          selected={data?.birthday ? new Date(data.birthday) : null}
          showMonthDropdown
          showYearDropdown
          value={data.birthday}
        />
      </FormInput>
      <FormInput
        htmlFor="location"
        label="Location"
        required
        validationResult={validationResults.location}
      >
        <Select
          onBlur={validateOnBlur(
            'location',
            validateLocation,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(location) => {
            const change = validateOnChange(
              'location',
              validateLocation,
              dataState,
              validationState,
              initialValidateState
            );
            change(location?.value);
          }}
          options={LocationTagOptions}
          value={getTagOptionFromValue(data.location ?? 'AustinTX', Location)}
        />
      </FormInput>
      <FormInput
        htmlFor="gender"
        label="Gender"
        validationResult={validationResults.gender}
      >
        <Select
          onBlur={validateOnBlur(
            'gender',
            validateGender,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(gender) => {
            const change = validateOnChange(
              'gender',
              validateGender,
              dataState,
              validationState,
              initialValidateState
            );
            change(gender?.value);
          }}
          options={GenderTagOptions}
          value={getTagOptionFromValue(data.gender ?? 'Man', Gender)}
        />
      </FormInput>
      <FormInput htmlFor="genres" label="Genres">
        <Select
          isMulti
          onBlur={validateOnBlur(
            'genres',
            validateGenres,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(tags: readonly TagOption[]) => {
            const change = validateOnChange(
              'genres',
              validateGenres,
              dataState,
              validationState,
              initialValidateState
            );
            change(extractTagOptions<string>(tags));
          }}
          options={GenreTagOptions}
          value={getTagOptionsFromValues(data.genres ?? [], Genre)}
        />
      </FormInput>
      <FormInput htmlFor="talents" label="Talents">
        <Select
          isMulti
          onBlur={validateOnBlur(
            'talents',
            validateTalents,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(tags: readonly TagOption[]) => {
            const change = validateOnChange(
              'talents',
              validateTalents,
              dataState,
              validationState,
              initialValidateState
            );
            change(extractTagOptions<string>(tags));
          }}
          options={TalentTagOptions}
          value={getTagOptionsFromValues(data.talents ?? [], Talent)}
        />
      </FormInput>
      <FormInput
        htmlFor="bio"
        label="Bio"
        validationResult={validationResults.bio}
      >
        <Form.Control
          as="textarea"
          name="bio"
          placeholder="Enter bio"
          rows={3}
          {...getFormProps(
            'bio',
            validateBio,
            dataState,
            validationState,
            initialValidateState
          )}
        />
      </FormInput>
      <h2 className="mb-3">Links</h2>
      <FormInput
        htmlFor="spotify-link"
        label="Spotify"
        validationResult={validationResults.spotifyLink}
      >
        <Form.Control
          name="spotify-link"
          placeholder="https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2?si=a464340973414399"
          type="text"
          {...getFormProps(
            'spotifyLink',
            validateSpotifyLink,
            dataState,
            validationState,
            initialValidateState
          )}
        />
      </FormInput>
      <FormInput
        htmlFor="soundcloud-link"
        label="Soundcloud"
        validationResult={validationResults.soundcloudUsername}
      >
        <InputGroup>
          <InputGroup.Text>https://soundcloud.com/</InputGroup.Text>
          <Form.Control
            name="soundcloud-link"
            placeholder="Soundcloud username"
            type="text"
            {...getFormProps(
              'soundcloudUsername',
              validateSoundcloudUsername,
              dataState,
              validationState,
              initialValidateState
            )}
          />
        </InputGroup>
      </FormInput>
      <FormInput
        htmlFor="bandcamp-link"
        label="Bandcamp"
        validationResult={validationResults.bandcampUsername}
      >
        <InputGroup>
          <InputGroup.Text>https://</InputGroup.Text>
          <Form.Control
            name="bandcamp-link"
            placeholder="Bandcamp username"
            type="text"
            {...getFormProps(
              'bandcampUsername',
              validateBandcampUsername,
              dataState,
              validationState,
              initialValidateState
            )}
          />
          <InputGroup.Text>.bandcamp.com/</InputGroup.Text>
        </InputGroup>
      </FormInput>
    </div>
  );
}
