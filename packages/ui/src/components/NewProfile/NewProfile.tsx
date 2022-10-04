import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { TagsInput } from 'react-tag-input-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Page from '../Page';
import EditLoginForm from '../forms/EditLoginForm';

const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));

export default function NewProfile() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [dateInvalid, setDateInvalid] = useState<boolean>(false);

  const [genre, setGenre] = useState(['Rock']);
  const [talent, setTalent] = useState(['Guitar']);

  return (
    <Page title="New Profile">
      <div className="d-grid gap-3">
        <Form>
          {/* Login Information */}
          <EditLoginForm />

          {/* Personal Info */}
          <div className="mb-3">
            <h2>Personal Info</h2>
          </div>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <DatePicker
              className="form-control"
              selected={date}
              openToDate={date ?? undefined}
              onChange={(newDate) => {
                setDateInvalid(false);
                setDate(newDate);
                if (newDate) {
                  if (newDate > minDate) {
                    setDateInvalid(true);
                    setDate(minDate);
                  }
                }
              }}
            />
            {dateInvalid && (
              <p className="text-danger">You are too young bro</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Enter location" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Please select gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Trans-Male</option>
              <option value="4">Trans-Female</option>
              <option value="5">Non-Binary</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGenres">
            <Form.Label>Genres</Form.Label>
            <div>
              <TagsInput
                value={genre}
                onChange={setGenre}
                name="genres"
                placeHolder="Enter music genre"
              />
              <em>press enter to add new tag</em>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTalents">
            <Form.Label>Talents</Form.Label>
            <div>
              <TagsInput
                value={talent}
                onChange={setTalent}
                name="talents"
                placeHolder="Enter musical talents"
              />
              <em>press enter to add new tag</em>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter bio" />
          </Form.Group>

          {/* Links */}
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

          <div className="d-flex justify-content-between mb-3">
            <Button variant="secondary" type="submit">
              Back
            </Button>
            <Button variant="primary" type="submit">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </Page>
  );
}
