import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Content from '../../components/Content';
import NewProfileStep from './NewProfileStep';
import UploadMediaStep from './UploadMediaStep';
import SearchSettingsStep from './SearchSettingsStep';

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
  // new profile state
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

  // search settings state
  const [rangeSetting, setRangeSetting] = useState('');
  const [gendersSetting, setGenderSetting] = useState<string[]>([]);
  const [locationsSetting, setLocationSetting] = useState<string[]>([]);
  const [genresSetting, setGenreSetting] = useState<string[]>([]);
  const [talentsSetting, setTalentSetting] = useState<string[]>([]);

  const newProfileStep = (
    <NewProfileStep
      onEmailInputChange={setEmail}
      onPasswordInputChange={setPassword}
      onConfirmPasswordInputChange={setConfirmPassword}
      onNameInputChange={setName}
      onBirthdayInputChange={setBirthday}
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