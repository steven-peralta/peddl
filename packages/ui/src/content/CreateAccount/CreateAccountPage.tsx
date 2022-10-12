import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateLocation,
  validateBirthday,
  validateBio,
  validateSpotifyLink,
  validateSoundcloudLink,
  validateBandcampLink,
  validateGender,
  Genre,
  validateGenres,
  Talent,
  validateTalents,
  validateBio,
} from '@peddl/common';
import Content from '../../components/Content';
import NewProfileStep from './NewProfileStep';
import UploadMediaStep from './UploadMediaStep';
import SearchSettingsStep from './SearchSettingsStep';
import { useValidation } from '../../components/forms/utils';

const enum CreateAccountSteps {
  NewProfile,
  UploadMedia,
  SearchSettings,
}

const getPageTitle = (currentStep: CreateAccountSteps) => {
  switch (currentStep) {
    case CreateAccountSteps.NewProfile:
      return 'New Profile';
    case CreateAccountSteps.UploadMedia:
      return 'Upload Media';
    case CreateAccountSteps.SearchSettings:
      return 'Search Settings';
    default:
      return 'New Profile';
  }
};

export default function CreateAccountPage() {
  const [step, setStep] = useState<CreateAccountSteps>(
    CreateAccountSteps.NewProfile
  );

  const {
    value: [email],
    setter: [setEmail],
    validationText: [emailValidationText],
  } = useValidation(validateEmail);

  const {
    value: [password],
    setter: [setPassword],
    validationText: [passwordValidationText],
  } = useValidation(validatePassword);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [confirmPasswordValidationText, setConfirmPasswordValidationText] =
    useState<string | undefined>();

  const handleConfirmPasswordChange = (confirmNewPassword: string) => {
    setConfirmPassword(confirmNewPassword);
    const result = validateConfirmPassword(password, confirmNewPassword);
    if (!result.success) {
      setConfirmPasswordValidationText(result.reason);
    } else {
      setConfirmPasswordValidationText(undefined);
    }
  };

  const {
    value: [name],
    setter: [setName],
    validationText: [nameValidationText],
  } = useValidation(validateName);

  const {
    value: [birthday],
    setter: [setBirthday],
    validationText: [birthdayValidationText],
  } = useValidation<Date>(validateBirthday, new Date());

  const {
    value: [location],
    setter: [setLocation],
    validationText: [locationValidationText],
  } = useValidation(validateLocation);

  const {
    value: [gender],
    setter: [setGender],
    validationText: [genderValidationText],
  } = useValidation(validateGender);

  const {
    value: [genres],
    setter: [setGenres],
    validationText: [genreValidationText],
  } = useValidation<Genre[]>(validateGenres);

  const {
    value: [talents],
    setter: [setTalents],
    validationText: [talentValidationText],
  } = useValidation<Talent>(validateTalents);

  const {
    value: [bio],
    setter: [setBio],
    validationText: [bioValidationText],
  } = useValidation(validateBio);

  const {
    value: [talents],
    setter: [setTalents],
    validationText: [talentsValidationText],
  } = useValidation(validateTalents);

  const {
    value: [bio],
    setter: [setBio],
    validationText: [bioValidationText],
  } = useValidation(validateBio);

  const {
    value: [spotifyLink],
    setter: [setSpotifyLink],
    validationText: [spotifyLinkValidationText],
  } = useValidation(validateSpotifyLink);

  const {
    value: [soundcloudLink],
    setter: [setSoundcloudLink],
    validationText: [soundcloudLinkValidationText],
  } = useValidation(validateSoundcloudLink);

  const {
    value: [bandcampLink],
    setter: [setBandcampLink],
    validationText: [bandcampLinkValidationText],
  } = useValidation(validateBandcampLink);

  // search settings state
  const [rangeSetting, setRangeSetting] = useState('');
  const [gendersSetting, setGenderSetting] = useState<string[]>([]);
  const [locationsSetting, setLocationSetting] = useState<string[]>([]);
  const [genresSetting, setGenreSetting] = useState<string[]>([]);
  const [talentsSetting, setTalentSetting] = useState<string[]>([]);

  const newProfileStep = (
    <NewProfileStep
      birthdayValue={birthday ?? new Date()}
      onEmailInputChange={setEmail}
      onPasswordInputChange={setPassword}
      onConfirmPasswordInputChange={handleConfirmPasswordChange}
      onNameInputChange={setName}
      onBirthdayInputChange={(date) => setBirthday(date ?? new Date())}
      onLocationInputChange={setLocation}
      onGenderInputChange={setGender}
      onGenreInputChange={setGenres}
      onTalentInputChange={setTalents}
      onBioInputChange={setBio}
      onSpotifyLinkInputChange={setSpotifyLink}
      onSoundcloudLinkInputChange={setSoundcloudLink}
      onBandcampLinkInputChange={setBandcampLink}
      emailRequired
      passwordRequired
      confirmPasswordRequired
      emailValidationText={emailValidationText}
      passwordValidationText={passwordValidationText}
      confirmPasswordValidationText={confirmPasswordValidationText}
      nameValidationText={nameValidationText}
      locationValidationText={locationValidationText}
      birthdayValidationText={birthdayValidationText}
      genderValidationText={genderValidationText}
      genreValidationText={genresValidationText}
      talentValidationText={talentsValidationText}
      spotifyLinkValidationText={spotifyLinkValidationText}
      soundcloudLinkValidationText={soundcloudLinkValidationText}
      bandcampLinkValidationText={bandcampLinkValidationText}
      bioValidationText={bioValidationText}
    />
  );

  const searchSettingsProp = (
    <SearchSettingsStep
      onRangeSettingChange={setRangeSetting}
      onGenderSettingChange={setGenderSetting}
      onLocationSettingChange={setLocationSetting}
      onGenreSettingInputChange={setGenreSetting}
      onTalentSettingInputChange={setTalentSetting}
    />
  );

  const renderStep = () => {
    switch (step) {
      case CreateAccountSteps.NewProfile:
        return newProfileStep;
      case CreateAccountSteps.UploadMedia:
        return <UploadMediaStep />;
      case CreateAccountSteps.SearchSettings:
        return searchSettingsProp;
      default:
        return newProfileStep;
    }
  };

  return (
    <Content title={getPageTitle(step)}>
      <>
        {renderStep()}
        <div className="d-flex justify-content-between mb-3">
          <Button
            variant="secondary"
            type="submit"
            onClick={() => setStep(step > 0 ? step - 1 : step)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => setStep(step < 3 ? step + 1 : step)}
          >
            Next
          </Button>
        </div>
      </>
    </Content>
  );
}
