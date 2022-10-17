import React from 'react';
import { Form } from 'react-bootstrap';
import EditLoginForm, {
  EditLoginFormProps,
} from '../../components/forms/EditLoginForm';
import EditPersonalInfoForm, {
  EditPersonalInfoFormProps,
} from '../../components/forms/EditPersonalInfoForm';
import EditLinksForm, {
  EditLinksFormProps,
} from '../../components/forms/EditLinksForm';

export type NewProfileStepProps = EditLoginFormProps &
  EditPersonalInfoFormProps &
  EditLinksFormProps;

export default function NewProfileStep({
  email,
  onEmailInputChange,
  onEmailInputBlur,
  emailRequired = false,
  emailValidationText,

  password,
  onPasswordInputChange,
  onPasswordInputBlur,
  passwordRequired = false,
  passwordValidationText,

  confirmPassword,
  onConfirmPasswordInputChange,
  onConfirmPasswordInputBlur,
  confirmPasswordRequired = false,
  confirmPasswordValidationText,

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
}: NewProfileStepProps) {
  return (
    <Form noValidate>
      <h2 className="mb-3">Login</h2>
      <EditLoginForm
        confirmPassword={confirmPassword}
        confirmPasswordRequired={confirmPasswordRequired}
        confirmPasswordValidationText={confirmPasswordValidationText}
        email={email}
        emailRequired={emailRequired}
        emailValidationText={emailValidationText}
        onConfirmPasswordInputBlur={onConfirmPasswordInputBlur}
        onConfirmPasswordInputChange={onConfirmPasswordInputChange}
        onEmailInputBlur={onEmailInputBlur}
        onEmailInputChange={onEmailInputChange}
        onPasswordInputBlur={onPasswordInputBlur}
        onPasswordInputChange={onPasswordInputChange}
        password={password}
        passwordRequired={passwordRequired}
        passwordValidationText={passwordValidationText}
      />

      <h2 className="mb-3">Personal Info</h2>
      <EditPersonalInfoForm
        bio={bio}
        bioRequired={bioRequired}
        bioValidationText={bioValidationText}
        birthday={birthday}
        birthdayRequired={birthdayRequired}
        birthdayValidationText={birthdayValidationText}
        gender={gender}
        genderRequired={genderRequired}
        genderValidationText={genderValidationText}
        genreRequired={genreRequired}
        genres={genres}
        genreValidationText={genreValidationText}
        location={location}
        locationRequired={locationRequired}
        locationValidationText={locationValidationText}
        name={name}
        nameRequired={nameRequired}
        nameValidationText={nameValidationText}
        onBioInputBlur={onBioInputBlur}
        onBioInputChange={onBioInputChange}
        onBirthdayInputBlur={onBirthdayInputBlur}
        onBirthdayInputChange={onBirthdayInputChange}
        onGenderInputBlur={onGenderInputBlur}
        onGenderInputChange={onGenderInputChange}
        onGenreInputChange={onGenreInputChange}
        onLocationInputBlur={onLocationInputBlur}
        onLocationInputChange={onLocationInputChange}
        onNameInputBlur={onNameInputBlur}
        onNameInputChange={onNameInputChange}
        onTalentInputChange={onTalentInputChange}
        talentRequired={talentRequired}
        talents={talents}
        talentValidationText={talentValidationText}
      />

      <h2 className="mb-3">Links</h2>
      <EditLinksForm
        bandcampLink={bandcampLink}
        bandcampLinkRequired={bandcampLinkRequired}
        bandcampLinkValidationText={bandcampLinkValidationText}
        onBandcampLinkInputBlur={onBandcampLinkInputBlur}
        onBandcampLinkInputChange={onBandcampLinkInputChange}
        onSoundcloudLinkInputBlur={onSoundcloudLinkInputBlur}
        onSoundcloudLinkInputChange={onSoundcloudLinkInputChange}
        onSpotifyLinkInputBlur={onSpotifyLinkInputBlur}
        onSpotifyLinkInputChange={onSpotifyLinkInputChange}
        soundcloudLink={soundcloudLink}
        soundcloudLinkRequired={soundcloudLinkRequired}
        soundcloudLinkValidationText={soundcloudLinkValidationText}
        spotifyLink={spotifyLink}
        spotifyLinkRequired={spotifyLinkRequired}
        spotifyLinkValidationText={spotifyLinkValidationText}
      />
    </Form>
  );
}
