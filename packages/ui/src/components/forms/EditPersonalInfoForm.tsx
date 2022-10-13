import { Form } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Gender } from '@peddl/common';
import { genreSelections, handleFormChange, talentSelections } from './utils';
import FormInput from './FormInput';
import TagSelection from './TagSelection/TagSelection';

export type EditPersonalInfoFormProps = {
  birthdayValue: Date;
  onNameInputChange: (name: string) => void;
  onBirthdayInputChange: (date: Date | null) => void;
  onLocationInputChange: (location: string) => void;
  onGenderInputChange: (gender: string) => void;
  onGenreInputChange: (genres: string[]) => void;
  onTalentInputChange: (talents: string[]) => void;
  onBioInputChange: (bio: string) => void;
  nameRequired?: boolean;
  birthdayRequired?: boolean;
  locationRequired?: boolean;
  genderRequired?: boolean;
  genreRequired?: boolean;
  talentRequired?: boolean;
  bioRequired?: boolean;
  nameValidationText?: string;
  birthdayValidationText?: string;
  locationValidationText?: string;
  genderValidationText?: string;
  genreValidationText?: string;
  talentValidationText?: string;
  bioValidationText?: string;
};

export default function EditPersonalInfoForm({
  birthdayValue,
  onNameInputChange,
  onBirthdayInputChange,
  onLocationInputChange,
  onGenderInputChange,
  onGenreInputChange,
  onTalentInputChange,
  onBioInputChange,
  nameRequired = false,
  birthdayRequired = false,
  locationRequired = false,
  genderRequired = false,
  genreRequired = false,
  talentRequired = false,
  bioRequired = false,
  nameValidationText,
  birthdayValidationText,
  locationValidationText,
  genderValidationText,
  genreValidationText,
  talentValidationText,
  bioValidationText,
}: EditPersonalInfoFormProps) {
  const minDate = new Date();
  minDate.setFullYear(new Date().getFullYear() - 18);
  const maxDate = new Date();
  maxDate.setFullYear(new Date().getFullYear() + 120);
  return (
    <div>
      <FormInput
        label="Name"
        htmlFor="name"
        required={nameRequired}
        validationText={nameValidationText}
      >
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleFormChange(onNameInputChange)}
          isInvalid={!!nameValidationText}
        />
      </FormInput>

      <FormInput
        label="Birthday"
        htmlFor="birthday"
        required={birthdayRequired}
        validationText={birthdayValidationText}
        forceShowValidation
      >
        <DatePicker
          className="form-control"
          name="birthday"
          onChange={onBirthdayInputChange}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          value={birthdayValue.toDateString()}
          selected={birthdayValue}
          maxDate={maxDate}
        />
      </FormInput>

      <FormInput
        label="Location"
        htmlFor="location"
        validationText={locationValidationText}
        required={locationRequired}
      >
        <Form.Control
          type="text"
          name="location"
          placeholder="Enter location"
          onChange={handleFormChange(onLocationInputChange)}
          isInvalid={!!locationValidationText}
        />
      </FormInput>

      <FormInput
        label="Gender"
        htmlFor="gender"
        required={genderRequired}
        validationText={genderValidationText}
      >
        <Form.Select
          aria-label="Default select example"
          name="gender"
          onChange={handleFormChange(onGenderInputChange)}
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
        label="Genres"
        htmlFor="genres"
        required={genreRequired}
        validationText={genreValidationText}
      >
        <TagSelection options={genreSelections} />
        <em>Press enter to add a new genre</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Talents"
        htmlFor="talents"
        required={talentRequired}
        validationText={talentValidationText}
      >
        <TagSelection options={talentSelections} />
        <em>Press enter to add new talent</em>
      </FormInput>

      <FormInput
        label="Bio"
        htmlFor="bio"
        required={bioRequired}
        validationText={bioValidationText}
      >
        <Form.Control
          name="bio"
          as="textarea"
          rows={3}
          placeholder="Enter bio"
          onChange={handleFormChange(onBioInputChange)}
          isInvalid={!!bioValidationText}
        />
      </FormInput>
    </div>
  );
}
