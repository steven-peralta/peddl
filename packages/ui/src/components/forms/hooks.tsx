import React, { useState } from 'react';
import { AxiosError } from 'axios';
import {
  CreateProfileBody,
  CreateUserBody,
  SearchPreferencesFormData,
  ValidationResult,
  ValidationResults,
} from '@peddl/common';
import { UserDetailsFormData } from './UserDetailsForm';
import { ProfileDetailsFormData } from './ProfileDetailsForm';

type FormState = {
  imagesState: [
    [
      HTMLImageElement[],
      React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
    ],
    [File[], React.Dispatch<React.SetStateAction<File[]>>],
    [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>],
    [string, React.Dispatch<React.SetStateAction<string>>]
  ];
  userFormDataState: [
    [
      Partial<
        Omit<CreateUserBody, 'searchPreferences' | 'profile'> & {
          confirmPassword: string;
        }
      >,
      React.Dispatch<
        React.SetStateAction<
          Partial<
            Omit<CreateUserBody, 'searchPreferences' | 'profile'> & {
              confirmPassword: string;
            }
          >
        >
      >
    ],
    [
      Partial<
        Record<'email' | 'password' | 'confirmPassword', ValidationResult>
      >,
      React.Dispatch<
        React.SetStateAction<
          Partial<
            Record<'email' | 'password' | 'confirmPassword', ValidationResult>
          >
        >
      >
    ],
    [
      Partial<Record<'email' | 'password' | 'confirmPassword', true>>,
      React.Dispatch<
        React.SetStateAction<
          Partial<Record<'email' | 'password' | 'confirmPassword', true>>
        >
      >
    ]
  ];
  profileFormDataState: [
    [
      Partial<CreateProfileBody>,
      React.Dispatch<React.SetStateAction<Partial<CreateProfileBody>>>
    ],
    [
      Partial<Record<keyof CreateProfileBody, ValidationResult>>,
      React.Dispatch<
        React.SetStateAction<
          Partial<Record<keyof CreateProfileBody, ValidationResult>>
        >
      >
    ],
    [
      Partial<Record<keyof CreateProfileBody, true>>,
      React.Dispatch<
        React.SetStateAction<Partial<Record<keyof CreateProfileBody, true>>>
      >
    ]
  ];
  searchPrefFormDataState: [
    [
      SearchPreferencesFormData,
      React.Dispatch<React.SetStateAction<SearchPreferencesFormData>>
    ],
    [
      Partial<Record<keyof SearchPreferencesFormData, ValidationResult>>,
      React.Dispatch<
        React.SetStateAction<
          Partial<Record<keyof SearchPreferencesFormData, ValidationResult>>
        >
      >
    ],
    [
      Partial<Record<keyof SearchPreferencesFormData, true>>,
      React.Dispatch<
        React.SetStateAction<
          Partial<Record<keyof SearchPreferencesFormData, true>>
        >
      >
    ]
  ];
  submitLoadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  requestErrorState: [
    AxiosError | undefined,
    React.Dispatch<React.SetStateAction<AxiosError | undefined>>
  ];
};

export default function useFormState(): FormState {
  // media upload state
  const imagesState = useState<HTMLImageElement[]>([]);
  const imageFilesState = useState<File[]>([]);
  const uploadBoxEnabledState = useState<boolean[]>([true]);
  const uploadValidationTextState = useState<string>('');

  // user form state
  const userFormDataState = useState<UserDetailsFormData>({});
  const userFormValidationResultsState = useState<
    ValidationResults<UserDetailsFormData>
  >({});
  const userFormInitialValidateState = useState<
    Partial<Record<keyof UserDetailsFormData, true>>
  >({});

  // profile form state
  const profileFormDataState = useState<ProfileDetailsFormData>({});
  const profileFormValidationResultsState = useState<
    ValidationResults<ProfileDetailsFormData>
  >({});
  const profileFormInitialValidateState = useState<
    Partial<Record<keyof ProfileDetailsFormData, true>>
  >({});

  // search preferences state
  const searchPrefFormDataState = useState<SearchPreferencesFormData>({});
  const searchPrefFormValidationResultsState = useState<
    ValidationResults<SearchPreferencesFormData>
  >({});
  const searchPrefFormInitialValidateState = useState<
    Partial<Record<keyof SearchPreferencesFormData, true>>
  >({});

  // submit button state
  const submitLoadingState = useState(false);
  const requestErrorState = useState<AxiosError | undefined>();

  return {
    imagesState: [
      imagesState,
      imageFilesState,
      uploadBoxEnabledState,
      uploadValidationTextState,
    ],
    userFormDataState: [
      userFormDataState,
      userFormValidationResultsState,
      userFormInitialValidateState,
    ],
    profileFormDataState: [
      profileFormDataState,
      profileFormValidationResultsState,
      profileFormInitialValidateState,
    ],
    searchPrefFormDataState: [
      searchPrefFormDataState,
      searchPrefFormValidationResultsState,
      searchPrefFormInitialValidateState,
    ],
    submitLoadingState,
    requestErrorState,
  };
}
