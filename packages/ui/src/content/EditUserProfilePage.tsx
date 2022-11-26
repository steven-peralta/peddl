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
        <Link to="/user">
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
