import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
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
  CreateUserResponse,
  CreateUserFormData,
  CreateSettingsFormData,
  CreateSettingsResponse,
  Genre,
  Talent,
  CreateProfileFormData,
} from '@peddl/common';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import axios, { AxiosError } from 'axios';
import Content from '../../components/Content';

import FormInput from '../../components/FormInput';
import Slider from '../../components/Slider/Slider';
import { useAuth, useValidation } from '../../utils/hooks';
import handleFormChange from '../../utils/form';
import UploadMediaBox from '../../components/UploadMediaBox/UploadMediaBox';
import convertToImageElement from '../../utils/convertToImageElement';
import axiosInstance from '../../utils/axiosInstance';
import PrevNextButtons from '../../components/PrevNextButtons';

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
  const minDate = new Date();
  minDate.setFullYear(new Date().getFullYear() - 18);
  const maxDate = new Date();
  maxDate.setFullYear(new Date().getFullYear() + 120);

  const {
    login: [doLogin],
  } = useAuth();

  const [loading, setLoading] = useState(false);

  const [requestError, setRequestError] = useState<AxiosError | undefined>();

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

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [uploadBoxEnabled, setUploadBoxEnabled] = useState<boolean[]>([true]);

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

  const handleUpload = (gridPos: number) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        convertToImageElement(file)
          .then((img) => {
            if (img) {
              images[gridPos] = img;
              setImages([...images]);
              uploadBoxEnabled[gridPos + 1] = true;
              setUploadBoxEnabled([...uploadBoxEnabled]);
            }
          })
          .catch((err: Error) => {
            console.error(err);
          });
      }
    };
  };

  const handleTrashButton = (gridPos: number) => {
    return () => {
      images.splice(gridPos, 1);
      setImages([...images]);
      uploadBoxEnabled.splice(gridPos, 1);
      setUploadBoxEnabled([...uploadBoxEnabled]);
    };
  };

  const uploadMediaStep = (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex flex-row justify-content-center mt-0">
        <UploadMediaBox
          enabled={uploadBoxEnabled[0]}
          image={images[0]}
          onClickTrash={handleTrashButton(0)}
          onUpload={handleUpload(0)}
          showTrashButton={!!images[0]}
        />

        <UploadMediaBox
          enabled={uploadBoxEnabled[1]}
          image={images[1]}
          onClickTrash={handleTrashButton(1)}
          onUpload={handleUpload(1)}
          showTrashButton={!!images[1]}
        />

        <UploadMediaBox
          enabled={uploadBoxEnabled[2]}
          image={images[2]}
          onClickTrash={handleTrashButton(2)}
          onUpload={handleUpload(2)}
          showTrashButton={!!images[2]}
        />
      </div>
      <div className="d-flex flex-row justify-content-center mt-3 mb-3">
        <UploadMediaBox
          enabled={uploadBoxEnabled[3]}
          image={images[3]}
          onClickTrash={handleTrashButton(3)}
          onUpload={handleUpload(3)}
          showTrashButton={!!images[3]}
        />

        <UploadMediaBox
          enabled={uploadBoxEnabled[4]}
          image={images[4]}
          onClickTrash={handleTrashButton(4)}
          onUpload={handleUpload(4)}
          showTrashButton={!!images[4]}
        />

        <UploadMediaBox
          enabled={uploadBoxEnabled[5]}
          image={images[5]}
          onClickTrash={handleTrashButton(5)}
          onUpload={handleUpload(5)}
          showTrashButton={!!images[5]}
        />
      </div>
    </div>
  );

  const searchSettingsStep = (
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
      </FormInput>
      {requestError && (
        <p className="small text-danger">
          {`An error occurred when trying to create a new user: ${requestError.message}`}
        </p>
      )}
    </Form>
  );

  const renderStep = () => {
    switch (step) {
      case CreateAccountSteps.NewProfile:
        return newProfileStep;
      case CreateAccountSteps.UploadMedia:
        return uploadMediaStep;
      case CreateAccountSteps.SearchSettings:
        return searchSettingsStep;
      default:
        return newProfileStep;
    }
  };

  return (
    <Content title={getPageTitle(step)}>
      {renderStep()}
      <PrevNextButtons
        nextDisabled={!newProfileFormsValid || loading}
        nextLoading={loading}
        nextText={step === CreateAccountSteps.SearchSettings ? 'Done' : 'Next'}
        nextVariant={requestError ? 'danger' : 'primary'}
        onNextClick={() => {
          if (step === CreateAccountSteps.SearchSettings) {
            setLoading(true);
            axiosInstance
              .post<CreateUserFormData, CreateUserResponse>('/users', {
                email,
                password,
              })
              .then((user) => {
                doLogin({ email, password }).then((token) => {
                  Promise.all([
                    axiosInstance.post<
                      CreateSettingsFormData,
                      CreateSettingsResponse
                    >(
                      // eslint-disable-next-line no-underscore-dangle
                      `/users/${user._id}/settings`,
                      {
                        genders: gendersSetting.map(
                          (value) => value.label
                        ) as Gender[],
                        genres: genresSetting.map(
                          (value) => value.label
                        ) as Genre[],
                        talents: talentsSetting.map(
                          (value) => value.label
                        ) as Talent[],
                        locations: locationsSetting.map(
                          (value) => value.label
                        ) as Location[],
                        ageRange: rangeSetting,
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    ),
                    axiosInstance.post<
                      CreateProfileFormData,
                      CreateSettingsResponse
                    >(
                      '/profiles',
                      {
                        name,
                        birthday: birthday ?? new Date(),
                        location: location as Location,
                        gender: gender as Gender,
                        genres: genres.map((value) => value.label) as Genre[],
                        talents: talents.map(
                          (value) => value.label
                        ) as Talent[],
                        bio,
                        spotifyLink,
                        soundcloudLink,
                        bandcampLink,
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    ),
                  ])
                    .then(() => setLoading(false))
                    .catch((err) => {
                      if (err === axios.isAxiosError(err)) {
                        setRequestError(err);
                        setLoading(false);
                      }
                    });
                });
              })
              .catch((err) => {
                if (err === axios.isAxiosError(err)) {
                  setRequestError(err);
                  setLoading(false);
                }
              });
          } else {
            setStep(step + 1);
          }
        }}
        onPrevClick={() => setStep(step > 0 ? step - 1 : step)}
        prevDisabled={loading}
        prevHidden={step === 0}
      />
    </Content>
  );
}
