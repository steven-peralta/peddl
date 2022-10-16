import { Form } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Gender, Location } from '@peddl/common';
import { genreSelections, handleFormChange, talentSelections } from './utils';
import FormInput from './FormInput';
import TagSelection from './TagSelection/TagSelection';

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

  genres: TagSelectionOption[];
  onGenreInputChange: (genres: TagSelectionOption[]) => void;
  genreRequired?: boolean;
  genreValidationText?: string;

  talents: TagSelectionOption[];
  onTalentInputChange: (talents: TagSelectionOption[]) => void;
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
  genreRequired = false,
  genreValidationText,

  talents,
  onTalentInputChange,
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
        <Form.Select
          aria-label="Default select example"
          name="location"
          onBlur={onLocationInputBlur}
          onChange={handleFormChange(onLocationInputChange)}
          value={location}
        >
          <option value={Location.AustinTX}>{Location.AustinTX}</option>
          <option value={Location.DenverCO}>{Location.DenverCO}</option>
          <option value={Location.ChicagoIL}>{Location.ChicagoIL}</option>
        </Form.Select>
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
        <TagSelection onChange={onGenreInputChange} options={genreSelections} />
        <em>Press enter to add a new genre</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="talents"
        label="Talents"
        required={talentRequired}
        validationText={talentValidationText}
      >
        <TagSelection
          onChange={onTalentInputChange}
          options={talentSelections}
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
