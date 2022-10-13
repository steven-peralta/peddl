import { Form } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';
import { TagsInput } from 'react-tag-input-component';
import { Gender } from '@peddl/common';
import { handleFormChange } from './utils';
import FormInput from './FormInput';

export type EditPersonalInfoFormProps = {
  name: string;
  onNameInputChange: (name: string) => void;
  onNameInputBlur: () => void;
  nameRequired?: boolean;
  nameValidationText?: string;

  birthday: Date;
  onBirthdayInputChange: (date: Date | null) => void;
  onBirthdayInputBlur: () => void;
  birthdayRequired?: boolean;
  birthdayValidationText?: string;

  location: string;
  onLocationInputChange: (location: string) => void;
  onLocationInputBlur: () => void;
  locationRequired?: boolean;
  locationValidationText?: string;

  gender: string;
  onGenderInputChange: (gender: string) => void;
  onGenderInputBlur: () => void;
  genderRequired?: boolean;
  genderValidationText?: string;

  genres: string[];
  onGenreInputChange: (genres: string[]) => void;
  onGenreInputBlur: () => void;
  genreRequired?: boolean;
  genreValidationText?: string;

  talents: string[];
  onTalentInputChange: (talents: string[]) => void;
  onTalentInputBlur: () => void;
  talentRequired?: boolean;
  talentValidationText?: string;

  bio: string;
  onBioInputChange: (bio: string) => void;
  onBioInputBlur: () => void;
  bioRequired?: boolean;
  bioValidationText?: string;
};

export default function EditPersonalInfoForm({
  name,
  onNameInputChange,
  onNameInputBlur,
  nameRequired = false,
  nameValidationText,

  birthday,
  onBirthdayInputChange,
  onBirthdayInputBlur,
  birthdayRequired = false,
  birthdayValidationText,

  location,
  onLocationInputChange,
  onLocationInputBlur,
  locationRequired = false,
  locationValidationText,

  gender,
  onGenderInputChange,
  onGenderInputBlur,
  genderRequired = false,
  genderValidationText,

  genres,
  onGenreInputChange,
  onGenreInputBlur,
  genreRequired = false,
  genreValidationText,

  talents,
  onTalentInputChange,
  onTalentInputBlur,
  talentRequired = false,
  talentValidationText,

  bio,
  onBioInputChange,
  onBioInputBlur,
  bioRequired = false,
  bioValidationText,
}: EditPersonalInfoFormProps) {
  const minDate = new Date();
  minDate.setFullYear(new Date().getFullYear() - 18);
  const maxDate = new Date();
  maxDate.setFullYear(new Date().getFullYear() + 120);
  return (
    <div>
      <FormInput
        htmlFor="name"
        label="Name"
        required={nameRequired}
        validationText={nameValidationText}
      >
        <Form.Control
          isInvalid={!!nameValidationText}
          name="name"
          onBlur={onNameInputBlur}
          onChange={handleFormChange(onNameInputChange)}
          placeholder="Name"
          type="text"
          value={name}
        />
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="birthday"
        label="Birthday"
        required={birthdayRequired}
        validationText={birthdayValidationText}
      >
        <DatePicker
          className="form-control"
          dropdownMode="select"
          maxDate={maxDate}
          name="birthday"
          onBlur={onBirthdayInputBlur}
          onChange={onBirthdayInputChange}
          peekNextMonth
          selected={birthday ?? undefined}
          showMonthDropdown
          showYearDropdown
          value={birthday?.toDateString() ?? ''}
        />
      </FormInput>

      <FormInput
        htmlFor="location"
        label="Location"
        required={locationRequired}
        validationText={locationValidationText}
      >
        <Form.Control
          isInvalid={!!locationValidationText}
          name="location"
          onBlur={onLocationInputBlur}
          onChange={handleFormChange(onLocationInputChange)}
          placeholder="Enter location"
          type="text"
          value={location}
        />
      </FormInput>

      <FormInput
        htmlFor="gender"
        label="Gender"
        required={genderRequired}
        validationText={genderValidationText}
      >
        <Form.Select
          aria-label="Default select example"
          name="gender"
          onBlur={onGenderInputBlur}
          onChange={handleFormChange(onGenderInputChange)}
          value={gender}
        >
          <option value={Gender.Man}>{Gender.Man}</option>
          <option value={Gender.Woman}>{Gender.Woman}</option>
          <option value={Gender.TransMan}>{Gender.TransMan}</option>
          <option value={Gender.TransWoman}>{Gender.TransWoman}</option>
          <option value={Gender.NonBinary}>{Gender.NonBinary}</option>
        </Form.Select>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="genres"
        label="Genres"
        required={genreRequired}
        validationText={genreValidationText}
      >
        <TagsInput
          name="genres"
          onBlur={onGenreInputBlur}
          onChange={onGenreInputChange}
          placeHolder="Genres"
          value={genres}
        />
        <em>Press enter to add a new genre</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="talents"
        label="Talents"
        required={talentRequired}
        validationText={talentValidationText}
      >
        <TagsInput
          name="talents"
          onBlur={onTalentInputBlur}
          onChange={onTalentInputChange}
          placeHolder="Talents"
          value={talents}
        />
        <em>Press enter to add new talent</em>
      </FormInput>

      <FormInput
        htmlFor="bio"
        label="Bio"
        required={bioRequired}
        validationText={bioValidationText}
      >
        <Form.Control
          as="textarea"
          isInvalid={!!bioValidationText}
          name="bio"
          onBlur={onBioInputBlur}
          onChange={handleFormChange(onBioInputChange)}
          placeholder="Enter bio"
          rows={3}
          value={bio}
        />
      </FormInput>
    </div>
  );
}
