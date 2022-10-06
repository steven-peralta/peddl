import { Form } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';
import { TagsInput } from 'react-tag-input-component';
import 'react-datepicker/dist/react-datepicker.css';
import { Gender } from '@peddl/common/dist/api/enums';
import handleFormChange from './utils';

export type EditPersonalInfoFormProps = {
  onNameInputChange: (name: string) => void;
  onBirthdayInputChange: (date: Date | null) => void;
  onLocationInputChange: (location: string) => void;
  onGenderInputChange: (gender: string) => void;
  onGenreInputChange: (genres: string[]) => void;
  onTalentInputChange: (talents: string[]) => void;
  onBioInputChange: (bio: string) => void;
};

export default function EditPersonalInfoForm({
  onNameInputChange,
  onBirthdayInputChange,
  onLocationInputChange,
  onGenderInputChange,
  onGenreInputChange,
  onTalentInputChange,
  onBioInputChange,
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
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          onChange={handleFormChange(onNameInputChange)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Birthday</Form.Label>
        <DatePicker onChange={onBirthdayInputChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          onChange={handleFormChange(onLocationInputChange)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={handleFormChange(onGenderInputChange)}
        >
          <option>Please select gender</option>
          <option value={Gender.Man}>{Gender.Man}</option>
          <option value={Gender.Woman}>{Gender.Woman}</option>
          <option value={Gender.TransMan}>{Gender.TransMan}</option>
          <option value={Gender.TransWoman}>{Gender.TransWoman}</option>
          <option value={Gender.NonBinary}>{Gender.NonBinary}</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genres</Form.Label>
        <div>
          <TagsInput
            onChange={onGenreInputChange}
            name="genres"
            placeHolder="Genres"
          />
          <em>Press enter to add new tag</em>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Talents</Form.Label>
        <div>
          <TagsInput
            onChange={onTalentInputChange}
            name="talents"
            placeHolder="Talents"
          />
          <em>press enter to add new tag</em>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter bio"
          onChange={handleFormChange(onBioInputChange)}
        />
      </Form.Group>
    </div>
  );
}
