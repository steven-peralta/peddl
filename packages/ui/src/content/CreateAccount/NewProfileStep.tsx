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
  birthdayValue,
  onEmailInputChange,
  onPasswordInputChange,
  onConfirmPasswordInputChange,
  onNameInputChange,
  onBirthdayInputChange,
  onLocationInputChange,
  onGenderInputChange,
  onGenreInputChange,
  onTalentInputChange,
  onBioInputChange,
  onSpotifyLinkInputChange,
  onSoundcloudLinkInputChange,
  onBandcampLinkInputChange,
  emailRequired,
  passwordRequired,
  confirmPasswordRequired,
  emailValidationText,
  passwordValidationText,
  confirmPasswordValidationText,
  nameRequired,
  nameValidationText,
  birthdayRequired,
  birthdayValidationText,
  locationRequired,
  locationValidationText,
  genderRequired,
  genderValidationText,
  genreRequired,
  genreValidationText,
  talentRequired,
  talentValidationText,
  bioRequired,
  bioValidationText,
}: NewProfileStepProps) {
  return (
    <Form noValidate>
      <h2 className="mb-3">Login</h2>
      <EditLoginForm
        onEmailInputChange={onEmailInputChange}
        onPasswordInputChange={onPasswordInputChange}
        onConfirmPasswordInputChange={onConfirmPasswordInputChange}
        emailRequired={emailRequired}
        passwordRequired={passwordRequired}
        confirmPasswordRequired={confirmPasswordRequired}
        emailValidationText={emailValidationText}
        passwordValidationText={passwordValidationText}
        confirmPasswordValidationText={confirmPasswordValidationText}
      />

      <h2 className="mb-3">Personal Info</h2>
      <EditPersonalInfoForm
        birthdayValue={birthdayValue}
        onNameInputChange={onNameInputChange}
        onBirthdayInputChange={onBirthdayInputChange}
        onLocationInputChange={onLocationInputChange}
        onGenderInputChange={onGenderInputChange}
        onGenreInputChange={onGenreInputChange}
        onTalentInputChange={onTalentInputChange}
        onBioInputChange={onBioInputChange}
        nameRequired={nameRequired}
        nameValidationText={nameValidationText}
        birthdayRequired={birthdayRequired}
        birthdayValidationText={birthdayValidationText}
        locationRequired={locationRequired}
        locationValidationText={locationValidationText}
        genderRequired={genderRequired}
        genderValidationText={genderValidationText}
        genreRequired={genreRequired}
        genreValidationText={genreValidationText}
        talentRequired={talentRequired}
        talentValidationText={talentValidationText}
        bioRequired={bioRequired}
        bioValidationText={bioValidationText}
      />

      <h2 className="mb-3">Links</h2>
      <EditLinksForm
        onSpotifyLinkInputChange={onSpotifyLinkInputChange}
        onSoundcloudLinkInputChange={onSoundcloudLinkInputChange}
        onBandcampLinkInputChange={onBandcampLinkInputChange}
      />
    </Form>
  );
}
