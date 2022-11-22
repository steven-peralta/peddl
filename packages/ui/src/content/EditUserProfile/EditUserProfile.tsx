import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Gender,
  GenreTagOptions,
  TagOption,
  Location,
  TalentTagOptions,
  validateBandcampUsername,
  validateBio,
  validateConfirmPassword,
  validateEmail,
  validateGender,
  validateName,
  validatePassword,
  validateSoundcloudUsername,
  validateSpotifyLink,
} from '@peddl/common';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import handleFormChange from '../../utils/form';
import useValidation from '../../utils/hooks';
import UploadMediaBox from '../../components/UploadMediaBox/UploadMediaBox';
import convertToImageElement from '../../utils/convertToImageElement';
import PrevNextButtons from '../../components/PrevNextButtons';

export default function EditUserProfile() {
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
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadBoxEnabled, setUploadBoxEnabled] = useState<boolean[]>([true]);

  const {
    value: [name],
    setter: [setName],
    validationText: [nameValidationText],
    isValid: [nameIsValid],
  } = useValidation<string>(validateName, '', true);

  const [location, setLocation] = useState<string>(Location.AustinTX);

  const {
    value: [gender],
    setter: [setGender],
    validationText: [genderValidationText],
    isValid: [genderIsValid],
  } = useValidation<string>(validateGender, Gender.Man);

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
    value: [soundcloudUsername],
    setter: [setSoundcloudUsername],
    validationText: [soundcloudUsernameValidationText],
    isValid: [soundcloudUsernameIsValid],
  } = useValidation<string>(validateSoundcloudUsername, '');

  const {
    value: [bandcampUsername],
    setter: [setBandcampUsername],
    validationText: [bandcampUsernameValidationText],
    isValid: [bandcampUsernameIsValid],
  } = useValidation<string>(validateBandcampUsername, '');

  const newProfileFormsValid =
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    nameIsValid &&
    genderIsValid &&
    bioIsValid &&
    spotifyLinkIsValid &&
    soundcloudUsernameIsValid &&
    bandcampUsernameIsValid;

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
              imageFiles[gridPos] = file;
              setImageFiles([...imageFiles]);
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
      imageFiles.splice(gridPos, 1);
      setImageFiles([...imageFiles]);
    };
  };
  return (
    <Container>
      <div style={{ marginTop: '60px' }}>
        <Link to="/viewProfile">
          <Button className="mt-3" variant="outline-primary">
            <ArrowLeft className="me-3" />
            Profile
          </Button>
        </Link>

        <h1 className="mb-3 mt-3">Edit Profile</h1>
        <h2 className="mb-3">Media</h2>
        <Form noValidate>
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
          <FormInput
            htmlFor="bio"
            label="Bio"
            validationText={bioValidationText}
          >
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
            validationText={soundcloudUsernameValidationText}
          >
            <InputGroup>
              <InputGroup.Text>https://soundcloud.com/</InputGroup.Text>
              <Form.Control
                name="soundcloud-link"
                onChange={handleFormChange(setSoundcloudUsername)}
                placeholder="Soundcloud username"
                type="text"
                value={soundcloudUsername}
              />
            </InputGroup>
          </FormInput>
          <FormInput
            forceShowValidation
            htmlFor="bandcamp-link"
            label="Bandcamp"
            validationText={bandcampUsernameValidationText}
          >
            <InputGroup>
              <InputGroup.Text>https://</InputGroup.Text>
              <Form.Control
                name="bandcamp-link"
                onChange={handleFormChange(setBandcampUsername)}
                placeholder="Bandcamp username"
                type="text"
                value={bandcampUsername}
              />
              <InputGroup.Text>.bandcamp.com/</InputGroup.Text>
            </InputGroup>
          </FormInput>
        </Form>
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
        <PrevNextButtons
          // nextLoading={loading}
          nextDisabled={newProfileFormsValid}
          nextText="Done"
          nextVariant="primary"
          onNextClick={() => {
            console.log('done clicked');
          }}
          onPrevClick={() => {
            console.log('prev clicked clicked');
          }}
          prevDisabled
          prevHidden
        />
      </div>
    </Container>
  );
}
