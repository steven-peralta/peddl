import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import {
  IDResponse,
  SearchPreferences,
  validateAgeRange,
  validateBio,
  validateBirthday,
  validateConfirmPassword,
  validateEmail,
  validateForm,
  validateGender,
  validateGenders,
  validateGenres,
  validateLocation,
  validateLocations,
  validateName,
  validatePassword,
  validateTalents,
  ValidationFailure,
} from '@peddl/common';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDetailsForm from '../components/forms/UserDetailsForm';
import Content from '../components/Content';
import ProfileDetailsForm from '../components/forms/ProfileDetailsForm';
import MediaUploadGrid from '../components/MediaUploadGrid';
import SearchPreferencesForm from '../components/forms/SearchPreferencesForm';
import axiosInstance, { getAuthHeader } from '../axiosInstance';
import { useAuth } from '../providers/AuthProvider';
import { useSettings } from '../providers/SettingsProvider';
import useFormState from '../components/forms/hooks';

export default function RegisterPage() {
  // provider stuff
  const navigate = useNavigate();
  const {
    login: [doLogin],
  } = useAuth();
  const { setSettings } = useSettings();

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
    searchPrefFormDataState: [
      [searchPrefFormData, setSearchPrefFormData],
      [searchPrefFormValidationResults, setSearchPrefFormValidationResults],
      [searchPrefFormInitialValidate, setSearchPrefFormInitialValidate],
    ],
    submitLoadingState: [submitLoading, setSubmitLoading],
    requestErrorState: [requestError, setRequestError],
  } = useFormState();

  const areFormsValid =
    Object.values({
      ...userFormValidationResults,
      ...profileFormValidationResults,
      ...searchPrefFormValidationResults,
    }).filter((result): result is ValidationFailure => !result?.isValid)
      .length === 0 && imageFiles.length > 0;

  const submitData = async () => {
    try {
      setSubmitLoading(true);

      const { email = '', password = '' } = userFormData;
      const profile = profileFormData;
      const searchPreferences = searchPrefFormData;

      const userData = {
        email,
        password,
        profile,
        searchPreferences,
      };

      const imageFormData = new FormData();
      imageFiles.forEach((file, i) => imageFormData.append(`image${i}`, file));

      // create our user
      const { data } = await axiosInstance.post<IDResponse>('/users', userData);
      const { id: userId } = data;

      // authenticate
      const { token } = await doLogin({ email, password });

      // upload our media
      await axiosInstance.post(`/users/${userId}/media`, imageFormData, {
        headers: {
          ...getAuthHeader(token),
          'Content-Type': 'multipart/form-data',
        },
      });

      // set our select settings locally
      setSettings(searchPreferences as SearchPreferences);

      // if all goes well, then take us to the profiles page
      setSubmitLoading(false);
      navigate('/profiles');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRequestError(error);
      }
      setSubmitLoading(false);
    }
  };

  const btnClick = () => {
    const userValidateResults = validateForm(userFormData, {
      email: validateEmail,
      password: validatePassword,
    });

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

    const profileValidateResults = validateForm(profileFormData, {
      name: validateName,
      birthday: validateBirthday,
      location: validateLocation,
      gender: validateGender,
      genres: validateGenres,
      talents: validateTalents,
      bio: validateBio,
    });

    const profileInitialValidate = Object.keys(profileValidateResults).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Partial<Record<string, true>>
    );

    const searchPrefValidateResults = validateForm(searchPrefFormData, {
      ageRange: validateAgeRange,
      genders: validateGenders,
      genres: validateGenres,
      talents: validateTalents,
      locations: validateLocations,
    });

    const searchPrefInitialValidate = Object.keys(
      searchPrefValidateResults
    ).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Partial<Record<string, true>>);

    setUserFormValidationResults(userValidateResults);
    setUserFormInitialValidate(userInitialValidate);

    setProfileFormValidationResults(profileValidateResults);
    setProfileFormInitialValidate(profileInitialValidate);

    setSearchPrefFormValidationResults(searchPrefValidateResults);
    setSearchPrefFormInitialValidate(searchPrefInitialValidate);

    if (imageFiles.length === 0) {
      setUploadValidationText('You need at least one photo.');
    }

    const isValid =
      Object.values({
        ...userValidateResults,
        ...profileValidateResults,
        ...searchPrefFormValidationResults,
      }).filter((result): result is ValidationFailure => !result?.isValid)
        .length === 0 && imageFiles.length > 0;

    if (isValid) {
      submitData().catch(console.error);
    }
  };

  return (
    <Content title="Create an account">
      <Form noValidate>
        <MediaUploadGrid
          boxEnabledState={[uploadBoxEnabled, setUploadBoxEnabled]}
          fileState={[imageFiles, setImageFiles]}
          imageState={[images, setImages]}
          validationTextState={[uploadValidationText, setUploadValidationText]}
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
        <SearchPreferencesForm
          dataState={[searchPrefFormData, setSearchPrefFormData]}
          initialValidateState={[
            searchPrefFormInitialValidate,
            setSearchPrefFormInitialValidate,
          ]}
          validationState={[
            searchPrefFormValidationResults,
            setSearchPrefFormValidationResults,
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
    </Content>
  );
}
