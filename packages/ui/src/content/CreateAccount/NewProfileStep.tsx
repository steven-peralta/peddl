import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import EditLoginForm from '../../components/forms/EditLoginForm';
import EditPersonalInfoForm from '../../components/forms/EditPersonalInfoForm';
import EditLinksForm from '../../components/forms/EditLinksForm';

export default function NewProfileStep() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(new Date());
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [talents, setTalents] = useState<string[]>([]);
  const [bio, setBio] = useState('');

  const [spotifyLink, setSpotifyLink] = useState('');
  const [soundcloudLink, setSoundcloudLink] = useState('');
  const [bandcampLink, setBandcampLink] = useState('');

  useEffect(() => {
    console.log({
      email,
      password,
      confirmPassword,
      name,
      birthday,
      location,
      gender,
      genres,
      talents,
      bio,
      spotifyLink,
      soundcloudLink,
      bandcampLink,
    });
  });

  return (
    <Form>
      <h2 className="mb-3">Login</h2>
      <EditLoginForm
        onEmailInputChange={setEmail}
        onPasswordInputChange={setPassword}
        onConfirmPasswordInputChange={setConfirmPassword}
      />

      <h2 className="mb-3">Personal Info</h2>
      <EditPersonalInfoForm
        onNameInputChange={setName}
        onBirthdayInputChange={setBirthday}
        onLocationInputChange={setLocation}
        onGenderInputChange={setGender}
        onGenreInputChange={setGenres}
        onTalentInputChange={setTalents}
        onBioInputChange={setBio}
      />

      <h2 className="mb-3">Links</h2>
      <EditLinksForm
        onSpotifyLinkInputChange={setSpotifyLink}
        onSoundcloudLinkInputChange={setSoundcloudLink}
        onBandcampLinkInputChange={setBandcampLink}
      />
    </Form>
  );
}
