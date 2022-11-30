import React, { useEffect } from 'react';
import {
  Gender,
  Genre,
  validateAgeRange,
  validateForm,
  validateGenders,
  validateGenres,
  validateLocations,
  validateTalents,
  ValidationFailure,
  Location,
  Talent,
} from '@peddl/common';
import axios from 'axios';
import { Button, Form, Spinner } from 'react-bootstrap';
import useFormState from '../components/forms/hooks';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance, { getAuthHeader } from '../axiosInstance';
import Content from '../components/Content';
import SearchPreferencesForm from '../components/forms/SearchPreferencesForm';
import { useSettings } from '../providers/SettingsProvider';

export default function EditSettingsPage() {
  const {
    userId: [loggedInUserId],
    token: [token],
  } = useAuth();

  const { settings, setSettings } = useSettings();

  const {
    searchPrefFormDataState: [
      [searchPrefFormData, setSearchPrefFormData],
      [searchPrefFormValidationResults, setSearchPrefFormValidationResults],
      [searchPrefFormInitialValidate, setSearchPrefFormInitialValidate],
    ],
    submitLoadingState: [submitLoading, setSubmitLoading],
    requestErrorState: [requestError, setRequestError],
  } = useFormState();

  useEffect(() => {
    setSearchPrefFormData(settings);
  }, [settings, setSearchPrefFormData]);

  const submitData = async () => {
    try {
      setSubmitLoading(true);
      await axiosInstance.put(
        `/users/${loggedInUserId}`,
        { searchPreferences: searchPrefFormData },
        { headers: getAuthHeader(token) }
      );
      setSettings({
        ageRange: searchPrefFormData.ageRange,
        genders: searchPrefFormData.genders as
          | (keyof typeof Gender)[]
          | undefined,
        genres: searchPrefFormData.genres as (keyof typeof Genre)[] | undefined,
        locations: searchPrefFormData.locations as
          | (keyof typeof Location)[]
          | undefined,
        talents: searchPrefFormData.talents as
          | (keyof typeof Talent)[]
          | undefined,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRequestError(error);
      }
    }
    setSubmitLoading(false);
  };

  const btnClick = () => {
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

    setSearchPrefFormValidationResults(searchPrefValidateResults);
    setSearchPrefFormInitialValidate(searchPrefInitialValidate);

    const isValid =
      Object.values(searchPrefFormValidationResults).filter(
        (result): result is ValidationFailure => !result?.isValid
      ).length === 0;

    if (isValid) submitData().catch(console.error);
  };

  const isFormValid =
    Object.values(searchPrefFormValidationResults).filter(
      (result): result is ValidationFailure => !result?.isValid
    ).length === 0;

  return (
    <Content>
      <Form noValidate>
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
        {requestError && (
          <p className="small text-danger">
            {`An error occurred when trying to create a new user: ${requestError.message}`}
          </p>
        )}
        <Button disabled={!isFormValid} onClick={btnClick}>
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
