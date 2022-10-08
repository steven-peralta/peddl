import { Form } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';
import { TagsInput } from 'react-tag-input-component';
import 'react-datepicker/dist/react-datepicker.css';
import { Gender } from '@peddl/common/dist/api/enums';
import handleFormChange from './utils';
import FormInput from './FormInput';

export type EditPersonalInfoFormProps = {
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
  // const [date, setDate] = useState<Date | null>(new Date());
  // const [dateInvalid, setDateInvalid] = useState<boolean>(false);
  // const minDate = new Date(
  //   new Date().setFullYear(new Date().getFullYear() - 18)
  // );
  //
  // const [genre, setGenre] = useState(['Rock']);
  // const [talent, setTalent] = useState(['Guitar']);
  // <DatePicker
  //   className="form-control"
  //   selected={date}
  //   openToDate={date ?? undefined}
  //   onChange={(newDate) => {
  //     setDateInvalid(false);
  //     setDate(newDate);
  //     if (newDate) {
  //       if (newDate > minDate) {
  //         setDateInvalid(true);
  //         setDate(minDate);
  //       }
  //     }
  //   }}
  // />
  // {dateInvalid && <p className="text-danger">You are too young bro</p>}
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
        <TagsInput
          onChange={onGenreInputChange}
          name="genres"
          placeHolder="Genres"
        />
        <em>Press enter to add a new genre</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Talents"
        htmlFor="talents"
        required={talentRequired}
        validationText={talentValidationText}
      >
        <TagsInput
          onChange={onTalentInputChange}
          name="talents"
          placeHolder="Talents"
        />
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
