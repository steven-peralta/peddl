import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateBirthday,
  validateBio,
  validateGender,
  validateSpotifyLink,
  Location,
  Gender,
  TagOption,
  GenreTagOptions,
  TalentTagOptions,
  GenderTagOptions,
  LocationTagOptions,
  validateSoundcloudLink,
  validateBandcampLink,
} from '@peddl/common';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Content from '../../components/Content';
import UploadMediaStep from './UploadMediaStep';
import { handleFormChange, useValidation } from '../../components/forms/utils';

import FormInput from '../../components/forms/FormInput';
import Slider from '../../components/Slider/Slider';

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

type PrevNextButtonsProps = {
  onNextClick: () => void;
  onPrevClick: () => void;
  nextHidden?: boolean;
  prevHidden?: boolean;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
};

function PrevNextButtons({
  onNextClick,
  onPrevClick,
  nextHidden,
  prevHidden,
  nextDisabled,
  prevDisabled,
}: PrevNextButtonsProps) {
  const justification = nextHidden
    ? 'justify-content-start'
    : prevHidden
    ? 'justify-content-end'
    : 'justify-content-between';
  return (
    <div className={`d-flex ${justification} mb-3`}>
      <Button
        disabled={prevDisabled}
        onClick={onPrevClick}
        style={{ display: prevHidden ? 'none' : undefined }}
        variant="secondary"
      >
        Back
      </Button>
      <Button
        disabled={nextDisabled}
        onClick={onNextClick}
        style={{ display: nextHidden ? 'none' : undefined }}
        variant="primary"
      >
        Next
      </Button>
    </div>
  );
}

export default function CreateAccountPage() {
  const minDate = new Date();
  minDate.setFullYear(new Date().getFullYear() - 18);
  const maxDate = new Date();
  maxDate.setFullYear(new Date().getFullYear() + 120);

  const [step, setStep] = useState<CreateAccountSteps>(
    CreateAccountSteps.NewProfile
  );

  const {
    value: [email],
    setter: [setEmail],
    validationText: [emailValidationText],
    isValid: [emailIsValid],
  } = useValidation<string>(validateEmail, '', true);

  const {
    value: [password],
    setter: [setPassword],
    validationText: [passwordValidationText],
    isValid: [passwordIsValid],
  } = useValidation<string>(validatePassword, '', true);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValidationText, setConfirmPasswordValidationText] =
    useState<string | undefined>();
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
  const [
    confirmPasswordInitialValidation,
    setConfirmPasswordInitialValidation,
  ] = useState(false);

  const performConfirmPasswordValidation = () => {
    const result = validateConfirmPassword(password, confirmPassword);

    if (result.reason) {
      setConfirmPasswordValidationText(result.reason);
    } else {
      setConfirmPasswordValidationText(undefined);
    }
    setConfirmPasswordIsValid(result.isValid);
  };

  useEffect(() => {
    if (confirmPasswordInitialValidation) {
      performConfirmPasswordValidation();
    }
  });

  const confirmPasswordInputBlur = () => {
    if (!confirmPasswordInitialValidation) {
      performConfirmPasswordValidation();
    }
    setConfirmPasswordInitialValidation(true);
  };

  const {
    value: [name],
    setter: [setName],
    validationText: [nameValidationText],
    isValid: [nameIsValid],
  } = useValidation<string>(validateName, '', true);

  const {
    value: [birthday],
    setter: [setBirthday],
    validationText: [birthdayValidationText],
    isValid: [birthdayIsValid],
  } = useValidation<Date | null>(validateBirthday, null, true);

  const [location, setLocation] = useState('');

  const {
    value: [gender],
    setter: [setGender],
    validationText: [genderValidationText],
    isValid: [genderIsValid],
  } = useValidation<string>(validateGender, '');

  const [genres, setGenres] = useState<readonly TagOption[]>([]);

  const [talents, setTalents] = useState<readonly TagOption[]>([]);

  const {
    value: [bio],
    setter: [setBio],
    validationText: [bioValidationText],
    isValid: [bioIsValid],
  } = useValidation<string>(validateBio, '');

  const {
    value: [spotifyLink],
    setter: [setSpotifyLink],
    validationText: [spotifyLinkValidationText],
    isValid: [spotifyLinkIsValid],
  } = useValidation<string>(validateSpotifyLink, '');

  const {
    value: [soundcloudLink],
    setter: [setSoundcloudLink],
    validationText: [soundcloudLinkValidationText],
    isValid: [soundcloudLinkIsValid],
  } = useValidation<string>(validateSoundcloudLink, '');

  const {
    value: [bandcampLink],
    setter: [setBandcampLink],
    validationText: [bandcampLinkValidationText],
    isValid: [bandcampLinkIsValid],
  } = useValidation<string>(validateBandcampLink, '');

  // search settings state
  const [rangeSetting, setRangeSetting] = React.useState<[number, number]>([
    20, 40,
  ]);
  const [gendersSetting, setGenderSetting] = useState<readonly TagOption[]>([]);
  const [locationsSetting, setLocationSetting] = useState<readonly TagOption[]>(
    []
  );
  const [genresSetting, setGenreSetting] = useState<readonly TagOption[]>([]);
  const [talentsSetting, setTalentSetting] = useState<readonly TagOption[]>([]);

  const newProfileFormsValid =
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    nameIsValid &&
    birthdayIsValid &&
    genderIsValid &&
    bioIsValid &&
    spotifyLinkIsValid &&
    soundcloudLinkIsValid &&
    bandcampLinkIsValid;

  const newProfileStep = (
    <Form noValidate>
      <h2 className="mb-3">Login</h2>
      <FormInput
        htmlFor="email"
        label="E-mail"
        required
        validationText={emailValidationText}
      >
        <Form.Control
          id="email"
          isInvalid={!!emailValidationText}
          name="email"
          onChange={handleFormChange(setEmail)}
          placeholder="name@example.com"
          required
          type="email"
          value={email}
        />
      </FormInput>
      <FormInput
        htmlFor="password"
        label="Password"
        required
        validationText={passwordValidationText}
      >
        <Form.Control
          id="password"
          isInvalid={!!passwordValidationText}
          name="password"
          onChange={handleFormChange(setPassword)}
          placeholder="Password"
          type="password"
          value={password}
        />
      </FormInput>
      <FormInput
        htmlFor="confirmPassword"
        label="Confirm password"
        required
        validationText={confirmPasswordValidationText}
      >
        <Form.Control
          id="confirmPassword"
          isInvalid={!!confirmPasswordValidationText}
          name="confirmPassword"
          onBlur={confirmPasswordInputBlur}
          onChange={handleFormChange(setConfirmPassword)}
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
        />
      </FormInput>

      <h2 className="mb-3">Personal Info</h2>
      <FormInput
        htmlFor="name"
        label="Name"
        required
        validationText={nameValidationText}
      >
        <Form.Control
          isInvalid={!!nameValidationText}
          name="name"
          onChange={handleFormChange(setName)}
          placeholder="Name"
          type="text"
          value={name}
        />
      </FormInput>
      <FormInput
        forceShowValidation
        htmlFor="birthday"
        label="Birthday"
        required
        validationText={birthdayValidationText}
      >
        <DatePicker
          className="form-control"
          dropdownMode="select"
          maxDate={maxDate}
          name="birthday"
          onChange={(date) => setBirthday(date)}
          peekNextMonth
          selected={birthday ?? undefined}
          showMonthDropdown
          showYearDropdown
          value={birthday?.toDateString() ?? ''}
        />
      </FormInput>
      <FormInput htmlFor="location" label="Location" required>
        <Form.Select
          aria-label="Default select example"
          name="location"
          onChange={handleFormChange(setLocation)}
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
        validationText={genderValidationText}
      >
        <Form.Select
          aria-label="Default select example"
          name="gender"
          onChange={handleFormChange(setGender)}
          value={gender}
        >
          <option value={Gender.Man}>{Gender.Man}</option>
          <option value={Gender.Woman}>{Gender.Woman}</option>
          <option value={Gender.TransMan}>{Gender.TransMan}</option>
          <option value={Gender.TransWoman}>{Gender.TransWoman}</option>
          <option value={Gender.NonBinary}>{Gender.NonBinary}</option>
        </Form.Select>
      </FormInput>
      <FormInput htmlFor="genres" label="Genres">
        <Select
          isMulti
          onChange={setGenres}
          options={GenreTagOptions}
          value={genres}
        />
      </FormInput>
      <FormInput htmlFor="talents" label="Talents">
        <Select
          isMulti
          onChange={setTalents}
          options={TalentTagOptions}
          value={talents}
        />
      </FormInput>
      <FormInput htmlFor="bio" label="Bio" validationText={bioValidationText}>
        <Form.Control
          as="textarea"
          isInvalid={!!bioValidationText}
          name="bio"
          onChange={handleFormChange(setBio)}
          placeholder="Enter bio"
          rows={3}
          value={bio}
        />
      </FormInput>

      <h2 className="mb-3">Links</h2>
      <FormInput
        forceShowValidation
        htmlFor="spotify-link"
        label="Spotify"
        validationText={spotifyLinkValidationText}
      >
        <Form.Control
          name="spotify-link"
          onChange={handleFormChange(setSpotifyLink)}
          placeholder="https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2?si=a464340973414399"
          type="text"
          value={spotifyLink}
        />
      </FormInput>
      <FormInput
        forceShowValidation
        htmlFor="soundcloud-link"
        label="Soundcloud"
        validationText={soundcloudLinkValidationText}
      >
        <InputGroup>
          <InputGroup.Text>https://soundcloud.com/</InputGroup.Text>
          <Form.Control
            name="soundcloud-link"
            onChange={handleFormChange(setSoundcloudLink)}
            placeholder="Soundcloud username"
            type="text"
            value={soundcloudLink}
          />
        </InputGroup>
      </FormInput>
      <FormInput
        forceShowValidation
        htmlFor="bandcamp-link"
        label="Bandcamp"
        validationText={bandcampLinkValidationText}
      >
        <InputGroup>
          <InputGroup.Text>https://</InputGroup.Text>
          <Form.Control
            name="bandcamp-link"
            onChange={handleFormChange(setBandcampLink)}
            placeholder="Bandcamp username"
            type="text"
            value={bandcampLink}
          />
          <InputGroup.Text>.bandcamp.com/</InputGroup.Text>
        </InputGroup>
      </FormInput>
    </Form>
  );

  const searchSettingsProp = (
    <Form noValidate>
      <FormInput htmlFor="ageSetting" label="Age">
        <div className="mt-4 pt-2 mb-2">
          <Slider
            max={100}
            min={18}
            onChange={([num1, num2]) => setRangeSetting([num1, num2])}
            step={1}
            values={rangeSetting}
          />
        </div>
      </FormInput>
      <FormInput htmlFor="gendersSetting" label="Gender">
        <Select
          isMulti
          name="gendersSetting"
          onChange={setGenderSetting}
          options={GenderTagOptions}
          value={gendersSetting}
        />
      </FormInput>
      <FormInput htmlFor="locationsSetting" label="Locations">
        <Select
          isMulti
          name="locationsSetting"
          onChange={setLocationSetting}
          options={LocationTagOptions}
          value={locationsSetting}
        />
      </FormInput>
      <FormInput htmlFor="genresSetting" label="Genres">
        <Select
          isMulti
          name="genresSetting"
          onChange={setGenreSetting}
          options={GenreTagOptions}
          value={genresSetting}
        />
      </FormInput>
      <FormInput htmlFor="talentsSetting" label="Talents">
        <Select
          isMulti
          name="talentsSetting"
          onChange={setTalentSetting}
          options={TalentTagOptions}
          value={talentsSetting}
        />
        <em>Press enter to add new tag</em>
      </FormInput>
    </Form>
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
      {renderStep()}
      <PrevNextButtons
        nextDisabled={!newProfileFormsValid}
        onNextClick={() => setStep(step < 2 ? step + 1 : step)}
        onPrevClick={() => setStep(step > 0 ? step - 1 : step)}
        prevHidden={step === 0}
      />
    </Content>
  );
}
