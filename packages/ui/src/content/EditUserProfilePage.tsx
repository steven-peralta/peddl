import React, { useEffect } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import axios from 'axios';
import {
  Profile,
  User,
  validateBio,
  validateBirthday,
  validateConfirmPassword,
  validateEmail,
  validateForm,
  validateGender,
  validateGenres,
  validateLocation,
  validateName,
  validatePassword,
  validateTalents,
  ValidationFailure,
} from '@peddl/common';
import useAxios from 'axios-hooks';
import ProfileDetailsForm, {
  ProfileDetailsFormData,
} from '../components/forms/ProfileDetailsForm';
import UserDetailsForm, {
  UserDetailsFormData,
} from '../components/forms/UserDetailsForm';
import MediaUploadGrid from '../components/MediaUploadGrid';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance, { getAuthHeader } from '../axiosInstance';
import useFormState from '../components/forms/hooks';

export default function EditUserProfilePage() {
  const {
    userId: [loggedInUserId],
    token: [token],
  } = useAuth();

  const [{ data: profileData, loading: profileLoading }] = useAxios<Profile>({
    url: `/users/${loggedInUserId}/profile`,
    headers: getAuthHeader(token),
  });

  const [{ data: userData, loading: userLoading }] = useAxios<
    Omit<User, 'salt' | 'password'>
  >({
    url: `/users/${loggedInUserId}`,
    headers: getAuthHeader(token),
  });

  const {
    imagesState: [
      [images, setImages],
      [imageFiles, setImageFiles],
      [uploadBoxEnabled, setUploadBoxEnabled],
      [uploadValidationText, setUploadValidationText],
    ],
    userFormDataState: [
      [userFormData, setUserFormData],
      [userFormValidationResults, setUserFormValidationResults],
      [userFormInitialValidate, setUserFormInitialValidate],
    ],
    profileFormDataState: [
      [profileFormData, setProfileFormData],
      [profileFormValidationResults, setProfileFormValidationResults],
      [profileFormInitialValidate, setProfileFormInitialValidate],
    ],
    submitLoadingState: [submitLoading, setSubmitLoading],
    requestErrorState: [requestError, setRequestError],
  } = useFormState();

  useEffect(() => {
    if (userData) {
      const user: UserDetailsFormData = {
        email: userData.email,
      };
      setUserFormData(user);
    }

    if (profileData) {
      const profile: ProfileDetailsFormData = {
        name: profileData.name,
        birthday: profileData.birthday as unknown as string,
        location: profileData.location,
        gender: profileData.gender,
        genres: profileData.genres,
        talents: profileData.talents,
        bio: profileData.bio,
        spotifyLink: profileData.spotifyLink,
        soundcloudUsername: profileData.soundcloudUsername,
        bandcampUsername: profileData.bandcampUsername,
      };
      setProfileFormData(profile);
    }
  }, [userData, profileData, setUserFormData, setProfileFormData]);

  const submitData = async () => {
    try {
      setSubmitLoading(true);

      await axiosInstance.put(`/users/${loggedInUserId}`, userFormData, {
        headers: getAuthHeader(token),
      });
      await axiosInstance.put(
        `/users/${loggedInUserId}/profile`,
        profileFormData,
        { headers: getAuthHeader(token) }
      );

      setSubmitLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRequestError(error);
      }
      setSubmitLoading(false);
    }
  };

  const btnClick = () => {
    const userValidateResults = validateForm(
      userFormData,
      {
        email: validateEmail,
        password: validatePassword,
      },
      true
    );

    // this is an edge case that needs to be set explicitly
    userValidateResults.confirmPassword = validateConfirmPassword(
      userFormData.password,
      userFormData.confirmPassword
    );

    const userInitialValidate = Object.keys(userValidateResults).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Partial<Record<string, true>>
    );

    const profileValidateResults = validateForm(
      profileFormData,
      {
        name: validateName,
        birthday: validateBirthday,
        location: validateLocation,
        gender: validateGender,
        genres: validateGenres,
        talents: validateTalents,
        bio: validateBio,
      },
      true
    );

    const profileInitialValidate = Object.keys(profileValidateResults).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Partial<Record<string, true>>
    );

    setUserFormValidationResults(userValidateResults);
    setUserFormInitialValidate(userInitialValidate);

    setProfileFormValidationResults(profileValidateResults);
    setProfileFormInitialValidate(profileInitialValidate);

    // if (imageFiles.length === 0) {
    //   setUploadValidationText('You need at least one photo.');
    // }

    const isValid =
      Object.values({
        ...userValidateResults,
        ...profileValidateResults,
      }).filter((result): result is ValidationFailure => !result?.isValid)
        .length === 0; // && imageFiles.length > 0;

    if (isValid) {
      submitData().catch(console.error);
    }
  };

  const areFormsValid =
    Object.values({
      ...userFormValidationResults,
      ...profileFormValidationResults,
    }).filter((result): result is ValidationFailure => !result?.isValid)
      .length === 0; // && imageFiles.length > 0;

  return (
    <Container>
      <div style={{ marginTop: '60px' }}>
        <Link to="/viewProfile">
          <Button className="mt-3" variant="outline-primary">
            <ArrowLeft className="me-3" />
            Profile
          </Button>
        </Link>
      </div>
      <h1 className="mb-3 mt-3">Edit Profile</h1>

      {userLoading || profileLoading ? (
        <h1>Loading</h1>
      ) : (
        <Form noValidate>
          <MediaUploadGrid
            boxEnabledState={[uploadBoxEnabled, setUploadBoxEnabled]}
            fileState={[imageFiles, setImageFiles]}
            imageState={[images, setImages]}
            validationTextState={[
              uploadValidationText,
              setUploadValidationText,
            ]}
          />
          <ProfileDetailsForm
            dataState={[profileFormData, setProfileFormData]}
            initialValidateState={[
              profileFormInitialValidate,
              setProfileFormInitialValidate,
            ]}
            validationState={[
              profileFormValidationResults,
              setProfileFormValidationResults,
            ]}
          />
          <UserDetailsForm
            dataState={[userFormData, setUserFormData]}
            initialValidateState={[
              userFormInitialValidate,
              setUserFormInitialValidate,
            ]}
            validationState={[
              userFormValidationResults,
              setUserFormValidationResults,
            ]}
          />
          {requestError && (
            <p className="small text-danger">
              {`An error occurred when trying to create a new user: ${requestError.message}`}
            </p>
          )}
          <Button disabled={!areFormsValid} onClick={btnClick}>
            {submitLoading && (
              <Spinner
                animation="border"
                aria-hidden="true"
                as="span"
                className="me-2"
                role="status"
                size="sm"
              />
            )}
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
}

// import { Button, Container, Form, InputGroup } from 'react-bootstrap';
// import Select from 'react-select';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import {
//   Gender,
//   GenreTagOptions,
//   TagOption,
//   Location,
//   TalentTagOptions,
//   validateBandcampUsername,
//   validateBio,
//   validateConfirmPassword,
//   validateEmail,
//   validateGender,
//   validateName,
//   validatePassword,
//   validateSoundcloudUsername,
//   validateSpotifyLink,
// } from '@peddl/common';
// import { ArrowLeft } from 'react-bootstrap-icons';
// import { Link } from 'react-router-dom';
// import FormInput from '../components/FormInput';
// import handleFormChange from '../utils/form';
// import useValidation from '../utils/hooks';
// import UploadMediaBox from '../components/UploadMediaBox/UploadMediaBox';
// import convertToImageElement from '../utils/convertToImageElement';
// import PrevNextButtons from '../components/PrevNextButtons';
//
// export default function EditUserProfilePage() {
//   const {
//     value: [email],
//     setter: [setEmail],
//     validationText: [emailValidationText],
//     isValid: [emailIsValid],
//   } = useValidation<string>(validateEmail, '', true);
//
//   const {
//     value: [password],
//     setter: [setPassword],
//     validationText: [passwordValidationText],
//     isValid: [passwordIsValid],
//   } = useValidation<string>(validatePassword, '', true);
//
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [confirmPasswordValidationText, setConfirmPasswordValidationText] =
//     useState<string | undefined>();
//   const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
//   const [
//     confirmPasswordInitialValidation,
//     setConfirmPasswordInitialValidation,
//   ] = useState(false);
//
//   const performConfirmPasswordValidation = () => {
//     const result = validateConfirmPassword(password, confirmPassword);
//
//     if (result.reason) {
//       setConfirmPasswordValidationText(result.reason);
//     } else {
//       setConfirmPasswordValidationText(undefined);
//     }
//     setConfirmPasswordIsValid(result.isValid);
//   };
//
//   useEffect(() => {
//     if (confirmPasswordInitialValidation) {
//       performConfirmPasswordValidation();
//     }
//   });
//
//   const confirmPasswordInputBlur = () => {
//     if (!confirmPasswordInitialValidation) {
//       performConfirmPasswordValidation();
//     }
//     setConfirmPasswordInitialValidation(true);
//   };
//   const [images, setImages] = useState<HTMLImageElement[]>([]);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [uploadBoxEnabled, setUploadBoxEnabled] = useState<boolean[]>([true]);
//
//   const {
//     value: [name],
//     setter: [setName],
//     validationText: [nameValidationText],
//     isValid: [nameIsValid],
//   } = useValidation<string>(validateName, '', true);
//
//   const [location, setLocation] = useState<string>(Location.AustinTX);
//
//   const {
//     value: [gender],
//     setter: [setGender],
//     validationText: [genderValidationText],
//     isValid: [genderIsValid],
//   } = useValidation<string>(validateGender, Gender.Man);
//
//   const [genres, setGenres] = useState<readonly TagOption[]>([]);
//
//   const [talents, setTalents] = useState<readonly TagOption[]>([]);
//
//   const {
//     value: [bio],
//     setter: [setBio],
//     validationText: [bioValidationText],
//     isValid: [bioIsValid],
//   } = useValidation<string>(validateBio, '');
//
//   const {
//     value: [spotifyLink],
//     setter: [setSpotifyLink],
//     validationText: [spotifyLinkValidationText],
//     isValid: [spotifyLinkIsValid],
//   } = useValidation<string>(validateSpotifyLink, '');
//
//   const {
//     value: [soundcloudUsername],
//     setter: [setSoundcloudUsername],
//     validationText: [soundcloudUsernameValidationText],
//     isValid: [soundcloudUsernameIsValid],
//   } = useValidation<string>(validateSoundcloudUsername, '');
//
//   const {
//     value: [bandcampUsername],
//     setter: [setBandcampUsername],
//     validationText: [bandcampUsernameValidationText],
//     isValid: [bandcampUsernameIsValid],
//   } = useValidation<string>(validateBandcampUsername, '');
//
//   const newProfileFormsValid =
//     emailIsValid &&
//     passwordIsValid &&
//     confirmPasswordIsValid &&
//     nameIsValid &&
//     genderIsValid &&
//     bioIsValid &&
//     spotifyLinkIsValid &&
//     soundcloudUsernameIsValid &&
//     bandcampUsernameIsValid;
//
//   const handleUpload = (gridPos: number) => {
//     return (event: ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0];
//       if (file) {
//         convertToImageElement(file)
//           .then((img) => {
//             if (img) {
//               images[gridPos] = img;
//               setImages([...images]);
//               uploadBoxEnabled[gridPos + 1] = true;
//               setUploadBoxEnabled([...uploadBoxEnabled]);
//               imageFiles[gridPos] = file;
//               setImageFiles([...imageFiles]);
//             }
//           })
//           .catch((err: Error) => {
//             console.error(err);
//           });
//       }
//     };
//   };
//
//   const handleTrashButton = (gridPos: number) => {
//     return () => {
//       images.splice(gridPos, 1);
//       setImages([...images]);
//       uploadBoxEnabled.splice(gridPos, 1);
//       setUploadBoxEnabled([...uploadBoxEnabled]);
//       imageFiles.splice(gridPos, 1);
//       setImageFiles([...imageFiles]);
//     };
//   };
//   return (
//     <Container>
//       <div style={{ marginTop: '60px' }}>
//         <Link to="/viewProfile">
//           <Button className="mt-3" variant="outline-primary">
//             <ArrowLeft className="me-3" />
//             Profile
//           </Button>
//         </Link>
//
//         <h1 className="mb-3 mt-3">Edit Profile</h1>
//         <h2 className="mb-3">Media</h2>
//         <Form noValidate>
//           <div className="d-flex flex-column justify-content-center">
//             <div className="d-flex flex-row justify-content-center mt-0">
//               <UploadMediaBox
//                 enabled={uploadBoxEnabled[0]}
//                 image={images[0]}
//                 onClickTrash={handleTrashButton(0)}
//                 onUpload={handleUpload(0)}
//                 showTrashButton={!!images[0]}
//               />
//
//               <UploadMediaBox
//                 enabled={uploadBoxEnabled[1]}
//                 image={images[1]}
//                 onClickTrash={handleTrashButton(1)}
//                 onUpload={handleUpload(1)}
//                 showTrashButton={!!images[1]}
//               />
//
//               <UploadMediaBox
//                 enabled={uploadBoxEnabled[2]}
//                 image={images[2]}
//                 onClickTrash={handleTrashButton(2)}
//                 onUpload={handleUpload(2)}
//                 showTrashButton={!!images[2]}
//               />
//             </div>
//             <div className="d-flex flex-row justify-content-center mt-3 mb-3">
//               <UploadMediaBox
//                 enabled={uploadBoxEnabled[3]}
//                 image={images[3]}
//                 onClickTrash={handleTrashButton(3)}
//                 onUpload={handleUpload(3)}
//                 showTrashButton={!!images[3]}
//               />
//
//               <UploadMediaBox
//                 enabled={uploadBoxEnabled[4]}
//                 image={images[4]}
//                 onClickTrash={handleTrashButton(4)}
//                 onUpload={handleUpload(4)}
//                 showTrashButton={!!images[4]}
//               />
//
//               <UploadMediaBox
//                 enabled={uploadBoxEnabled[5]}
//                 image={images[5]}
//                 onClickTrash={handleTrashButton(5)}
//                 onUpload={handleUpload(5)}
//                 showTrashButton={!!images[5]}
//               />
//             </div>
//           </div>
//
//           <h2 className="mb-3">Personal Info</h2>
//           <FormInput
//             htmlFor="name"
//             label="Name"
//             required
//             validationResult={nameValidationText}
//           >
//             <Form.Control
//               isInvalid={!!nameValidationText}
//               name="name"
//               onChange={handleFormChange(setName)}
//               placeholder="Name"
//               type="text"
//               value={name}
//             />
//           </FormInput>
//           <FormInput htmlFor="location" label="Location" required>
//             <Form.Select
//               aria-label="Default select example"
//               name="location"
//               onChange={handleFormChange(setLocation)}
//               value={location}
//             >
//               <option value={Location.AustinTX}>{Location.AustinTX}</option>
//               <option value={Location.DenverCO}>{Location.DenverCO}</option>
//               <option value={Location.ChicagoIL}>{Location.ChicagoIL}</option>
//             </Form.Select>
//           </FormInput>
//           <FormInput
//             htmlFor="gender"
//             label="Gender"
//             validationResult={genderValidationText}
//           >
//             <Form.Select
//               aria-label="Default select example"
//               name="gender"
//               onChange={handleFormChange(setGender)}
//               value={gender}
//             >
//               <option value={Gender.Man}>{Gender.Man}</option>
//               <option value={Gender.Woman}>{Gender.Woman}</option>
//               <option value={Gender.TransMan}>{Gender.TransMan}</option>
//               <option value={Gender.TransWoman}>{Gender.TransWoman}</option>
//               <option value={Gender.NonBinary}>{Gender.NonBinary}</option>
//             </Form.Select>
//           </FormInput>
//           <FormInput htmlFor="genres" label="Genres">
//             <Select
//               isMulti
//               onChange={setGenres}
//               options={GenreTagOptions}
//               value={genres}
//             />
//           </FormInput>
//           <FormInput htmlFor="talents" label="Talents">
//             <Select
//               isMulti
//               onChange={setTalents}
//               options={TalentTagOptions}
//               value={talents}
//             />
//           </FormInput>
//           <FormInput
//             htmlFor="bio"
//             label="Bio"
//             validationResult={bioValidationText}
//           >
//             <Form.Control
//               as="textarea"
//               isInvalid={!!bioValidationText}
//               name="bio"
//               onChange={handleFormChange(setBio)}
//               placeholder="Enter bio"
//               rows={3}
//               value={bio}
//             />
//           </FormInput>
//
//           <h2 className="mb-3">Links</h2>
//           <FormInput
//             forceShowValidation
//             htmlFor="spotify-link"
//             label="Spotify"
//             validationResult={spotifyLinkValidationText}
//           >
//             <Form.Control
//               name="spotify-link"
//               onChange={handleFormChange(setSpotifyLink)}
//               placeholder="https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2?si=a464340973414399"
//               type="text"
//               value={spotifyLink}
//             />
//           </FormInput>
//           <FormInput
//             forceShowValidation
//             htmlFor="soundcloud-link"
//             label="Soundcloud"
//             validationResult={soundcloudUsernameValidationText}
//           >
//             <InputGroup>
//               <InputGroup.Text>https://soundcloud.com/</InputGroup.Text>
//               <Form.Control
//                 name="soundcloud-link"
//                 onChange={handleFormChange(setSoundcloudUsername)}
//                 placeholder="Soundcloud username"
//                 type="text"
//                 value={soundcloudUsername}
//               />
//             </InputGroup>
//           </FormInput>
//           <FormInput
//             forceShowValidation
//             htmlFor="bandcamp-link"
//             label="Bandcamp"
//             validationResult={bandcampUsernameValidationText}
//           >
//             <InputGroup>
//               <InputGroup.Text>https://</InputGroup.Text>
//               <Form.Control
//                 name="bandcamp-link"
//                 onChange={handleFormChange(setBandcampUsername)}
//                 placeholder="Bandcamp username"
//                 type="text"
//                 value={bandcampUsername}
//               />
//               <InputGroup.Text>.bandcamp.com/</InputGroup.Text>
//             </InputGroup>
//           </FormInput>
//         </Form>
//         <h2 className="mb-3">Login</h2>
//         <FormInput
//           htmlFor="email"
//           label="E-mail"
//           required
//           validationResult={emailValidationText}
//         >
//           <Form.Control
//             id="email"
//             isInvalid={!!emailValidationText}
//             name="email"
//             onChange={handleFormChange(setEmail)}
//             placeholder="name@example.com"
//             required
//             type="email"
//             value={email}
//           />
//         </FormInput>
//         <FormInput
//           htmlFor="password"
//           label="Password"
//           required
//           validationResult={passwordValidationText}
//         >
//           <Form.Control
//             id="password"
//             isInvalid={!!passwordValidationText}
//             name="password"
//             onChange={handleFormChange(setPassword)}
//             placeholder="Password"
//             type="password"
//             value={password}
//           />
//         </FormInput>
//         <FormInput
//           htmlFor="confirmPassword"
//           label="Confirm password"
//           required
//           validationResult={confirmPasswordValidationText}
//         >
//           <Form.Control
//             id="confirmPassword"
//             isInvalid={!!confirmPasswordValidationText}
//             name="confirmPassword"
//             onBlur={confirmPasswordInputBlur}
//             onChange={handleFormChange(setConfirmPassword)}
//             placeholder="Confirm Password"
//             type="password"
//             value={confirmPassword}
//           />
//         </FormInput>
//         <PrevNextButtons
//           // nextLoading={loading}
//           nextDisabled={newProfileFormsValid}
//           nextText="Done"
//           nextVariant="primary"
//           onNextClick={() => {
//             console.log('done clicked');
//           }}
//           onPrevClick={() => {
//             console.log('prev clicked clicked');
//           }}
//           prevDisabled
//           prevHidden
//         />
//       </div>
//     </Container>
//   );
// }
