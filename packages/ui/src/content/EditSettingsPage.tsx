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
    <Content title="Search Settings">
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

// import Select from 'react-select';
// import { Form } from 'react-bootstrap';
// import React, { useState } from 'react';
// import {
//   GenderTagOptions,
//   GenreTagOptions,
//   LocationTagOptions,
//   SearchPreferences,
//   TagOption,
//   TalentTagOptions,
// } from '@peddl/common';
// import { AxiosError } from 'axios';
// import Slider from '../components/Slider';
// import FormInput from '../components/forms/FormInput';
// import Content from '../components/Content';
// import { useSettings } from '../providers/SettingsProvider';
// import extractTagOptions from '../utils/extractTagOptions';
// import PrevNextButtons from '../components/PrevNextButtons';
//
// export default function EditSettingsPage() {
//   const [rangeSetting, setRangeSetting] = React.useState<[number, number]>([
//     20, 40,
//   ]);
//   const [gendersSetting, setGenderSetting] = useState<readonly TagOption[]>([]);
//   const [locationsSetting, setLocationSetting] = useState<readonly TagOption[]>(
//     []
//   );
//   const [genresSetting, setGenreSetting] = useState<readonly TagOption[]>([]);
//   const [talentsSetting, setTalentSetting] = useState<readonly TagOption[]>([]);
//
//   const [requestError] = useState<AxiosError | undefined>();
//
//   const { setSettings: _ } = useSettings();
//   const _settingsData: SearchPreferences = {
//     genders: extractTagOptions(gendersSetting),
//     genres: extractTagOptions(genresSetting),
//     talents: extractTagOptions(talentsSetting),
//     locations: extractTagOptions(locationsSetting),
//     ageRange: rangeSetting,
//   };
//
//   return (
//     <Content title="Search Settings">
//       <Form noValidate>
//         <FormInput htmlFor="ageSetting" label="Age">
//           <div className="mt-4 pt-2 mb-2">
//             <Slider
//               max={100}
//               min={18}
//               onChange={([num1, num2]) => setRangeSetting([num1, num2])}
//               step={1}
//               values={rangeSetting}
//             />
//           </div>
//         </FormInput>
//         <FormInput htmlFor="gendersSetting" label="Gender">
//           <Select
//             isMulti
//             name="gendersSetting"
//             onChange={setGenderSetting}
//             options={GenderTagOptions}
//             value={gendersSetting}
//           />
//         </FormInput>
//         <FormInput htmlFor="locationsSetting" label="Locations">
//           <Select
//             isMulti
//             name="locationsSetting"
//             onChange={setLocationSetting}
//             options={LocationTagOptions}
//             value={locationsSetting}
//           />
//         </FormInput>
//         <FormInput htmlFor="genresSetting" label="Genres">
//           <Select
//             isMulti
//             name="genresSetting"
//             onChange={setGenreSetting}
//             options={GenreTagOptions}
//             value={genresSetting}
//           />
//         </FormInput>
//         <FormInput htmlFor="talentsSetting" label="Talents">
//           <Select
//             isMulti
//             name="talentsSetting"
//             onChange={setTalentSetting}
//             options={TalentTagOptions}
//             value={talentsSetting}
//           />
//         </FormInput>
//         {requestError && (
//           <p className="small text-danger">
//             {`An error occurred when trying to create a new user: ${requestError.message}`}
//           </p>
//         )}
//       </Form>
//       <PrevNextButtons
//         nextText="Done"
//         nextVariant="primary"
//         onNextClick={() => {
//           console.log('done clicked');
//         }}
//         onPrevClick={() => {
//           console.log('done clicked');
//         }}
//         prevHidden
//       />
//     </Content>
//   );
// }
