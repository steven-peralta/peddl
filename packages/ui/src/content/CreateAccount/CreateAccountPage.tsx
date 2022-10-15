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
  validateGender,
  validateGenres,
  validateTalents,
  validateSpotifyLink,
} from '@peddl/common';
import Content from '../../components/Content';
import NewProfileStep from './NewProfileStep';
import UploadMediaStep from './UploadMediaStep';
import SearchSettingsStep from './SearchSettingsStep';
import { useValidation } from '../../components/forms/utils';
import TagSelection, {
  TagSelectionOption,
} from '../../components/forms/TagSelection/TagSelection';

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
    onBlur: [emailInputOnBlur],
  } = useValidation<string>(validateEmail, '');

  const {
    value: [password],
    setter: [setPassword],
    validationText: [passwordValidationText],
    onBlur: [passwordInputOnBlur],
  } = useValidation<string>(validatePassword, '');

  const {
    value: [name],
    setter: [setName],
    validationText: [nameValidationText],
    onBlur: [nameInputOnBlur],
  } = useValidation<string>(validateName, '');

  const {
    value: [birthday],
    setter: [setBirthday],
    validationText: [birthdayValidationText],
    onBlur: [birthdayInputOnBlur],
  } = useValidation<Date | undefined>(validateBirthday, new Date());

  const {
    value: [location],
    setter: [setLocation],
    validationText: [locationValidationText],
    onBlur: [locationInputOnBlur],
  } = useValidation<string>(validateLocation, '');

  const {
    value: [gender],
    setter: [setGender],
    validationText: [genderValidationText],
    onBlur: [genderInputOnBlur],
  } = useValidation<string>(validateGender, '');

  const {
    setter: [setGenres],
    validationText: [genreValidationText],
    onBlur: [genreInputOnBlur],
  } = useValidation<string[]>(validateGenres, []);

  const {
    setter: [setTalents],
    validationText: [talentValidationText],
    onBlur: [talentsInputOnBlur],
  } = useValidation<string[]>(validateTalents, []);

  const {
    value: [bio],
    setter: [setBio],
    validationText: [bioValidationText],
    onBlur: [bioInputOnBlur],
  } = useValidation<string>(validateBio, '');

  const {
    value: [spotifyLink],
    setter: [setSpotifyLink],
    validationText: [spotifyLinkValidationText],
    onBlur: [spotifyLinkInputOnBlur],
  } = useValidation<string>(validateSpotifyLink, '');

  const {
    value: [soundcloudLink],
    setter: [setSoundcloudLink],
    validationText: [soundcloudLinkValidationText],
    onBlur: [soundcloudLinkInputOnBlur],
  } = useValidation<string>(validateEmail, '');

  const {
    value: [bandcampLink],
    setter: [setBandcampLink],
    validationText: [bandcampLinkValidationText],
    onBlur: [bandcampLinkInputOnBlur],
  } = useValidation<string>(validateEmail, '');

  // search settings state
  const [rangeSetting, setRangeSetting] = useState('');
  const [gendersSetting, setGenderSetting] = useState<readonly string[]>([]);
  const [locationsSetting, setLocationSetting] = useState<readonly string[]>(
    []
  );
  const [genresSetting, setGenreSetting] = useState<readonly string[]>([]);
  const [talentsSetting, setTalentSetting] = useState<readonly string[]>([]);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValidationText, setConfirmPasswordValidationText] =
    useState<string | undefined>();

  const confirmPasswordInputBlur = () => {
    const result = validateConfirmPassword(password, confirmPassword);
    if (!result.success) {
      setConfirmPasswordValidationText(result.reason);
    } else {
      setConfirmPasswordValidationText(undefined);
    }
  };

  const newProfileStep = (
    <NewProfileStep
      bandcampLink={bandcampLink}
      bandcampLinkValidationText={bandcampLinkValidationText}
      bio={bio}
      bioValidationText={bioValidationText}
      birthday={birthday ?? new Date()}
      birthdayRequired
      birthdayValidationText={birthdayValidationText}
      confirmPassword={confirmPassword}
      confirmPasswordRequired
      confirmPasswordValidationText={confirmPasswordValidationText}
      email={email}
      emailRequired
      emailValidationText={emailValidationText}
      gender={gender}
      genderValidationText={genderValidationText}
      genreValidationText={genreValidationText}
      location={location}
      locationRequired
      locationValidationText={locationValidationText}
      name={name}
      nameRequired
      nameValidationText={nameValidationText}
      onBandcampLinkInputBlur={bandcampLinkInputOnBlur}
      onBandcampLinkInputChange={setBandcampLink}
      onBioInputBlur={bioInputOnBlur}
      onBioInputChange={setBio}
      onBirthdayInputBlur={birthdayInputOnBlur}
      onBirthdayInputChange={(date) => setBirthday(date ?? new Date())}
      onConfirmPasswordInputBlur={confirmPasswordInputBlur}
      onConfirmPasswordInputChange={setConfirmPassword}
      onEmailInputBlur={emailInputOnBlur}
      onEmailInputChange={setEmail}
      onGenderInputBlur={genderInputOnBlur}
      onGenderInputChange={setGender}
      onGenreInputChange={setGenres}
      onLocationInputBlur={locationInputOnBlur}
      onLocationInputChange={setLocation}
      onNameInputBlur={nameInputOnBlur}
      onNameInputChange={setName}
      onPasswordInputBlur={passwordInputOnBlur}
      onPasswordInputChange={setPassword}
      onSoundcloudLinkInputBlur={soundcloudLinkInputOnBlur}
      onSoundcloudLinkInputChange={setSoundcloudLink}
      onSpotifyLinkInputBlur={spotifyLinkInputOnBlur}
      onSpotifyLinkInputChange={setSpotifyLink}
      onTalentInputChange={setTalents}
      password={password}
      passwordRequired
      passwordValidationText={passwordValidationText}
      soundcloudLink={soundcloudLink}
      soundcloudLinkValidationText={soundcloudLinkValidationText}
      spotifyLink={spotifyLink}
      spotifyLinkValidationText={spotifyLinkValidationText}
      talentValidationText={talentValidationText}
    />
  );

  const searchSettingsProp = (
    <SearchSettingsStep
      onGenderSettingChange={setGenderSetting}
      onGenreSettingInputChange={setGenreSetting}
      onLocationSettingChange={setLocationSetting}
      onRangeSettingChange={setRangeSetting}
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
            onClick={() => setStep(step > 0 ? step - 1 : step)}
            type="submit"
            variant="secondary"
          >
            Back
          </Button>
          <Button
            onClick={() => setStep(step < 3 ? step + 1 : step)}
            type="submit"
            variant="primary"
          >
            Next
          </Button>
        </div>
      </>
    </Content>
  );
}
