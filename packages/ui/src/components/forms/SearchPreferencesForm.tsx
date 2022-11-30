import React from 'react';
import Select from 'react-select';
import { SearchPreferencesFormData } from '@peddl/common/src/api/types';
import {
  Gender,
  GenderTagOptions,
  Genre,
  GenreTagOptions,
  getTagOptionsFromValues,
  Location,
  LocationTagOptions,
  TagOption,
  Talent,
  TalentTagOptions,
  validateAgeRange,
  validateGenders,
  validateGenres,
  validateLocations,
  validateTalents,
} from '@peddl/common';
import { ValidationFormProps } from './types';
import Slider from '../Slider';
import FormInput from './FormInput';
import { validateOnBlur, validateOnChange } from './utils';
import extractTagOptions from '../../utils/extractTagOptions';

export default function SearchPreferencesForm({
  dataState,
  validationState,
  initialValidateState,
}: ValidationFormProps<SearchPreferencesFormData>) {
  const [data] = dataState;
  const [validationResults] = validationState;

  return (
    <div>
      <FormInput htmlFor="ageSetting" label="Age">
        <div className="mt-4 pt-2 mb-2">
          <Slider
            max={100}
            min={18}
            onChange={([age1, age2]) => {
              const change = validateOnChange(
                'ageRange',
                validateAgeRange,
                dataState,
                validationState,
                initialValidateState
              );
              change([age1, age2]);
            }}
            step={1}
            values={data.ageRange ?? [18, 25]}
          />
        </div>
      </FormInput>
      <FormInput
        htmlFor="gendersSetting"
        label="Gender"
        validationResult={validationResults.genders}
      >
        <Select
          isMulti
          name="gendersSetting"
          onBlur={validateOnBlur(
            'genders',
            validateGenders,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(tags: readonly TagOption[]) => {
            const change = validateOnChange(
              'genders',
              validateGenders,
              dataState,
              validationState,
              initialValidateState
            );
            change(extractTagOptions<string>(tags));
          }}
          options={GenderTagOptions}
          value={getTagOptionsFromValues(data.genders ?? [], Gender)}
        />
      </FormInput>
      <FormInput htmlFor="locationsSetting" label="Locations">
        <Select
          isMulti
          name="locationsSetting"
          onBlur={validateOnBlur(
            'locations',
            validateLocations,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(tags: readonly TagOption[]) => {
            const change = validateOnChange(
              'locations',
              validateLocations,
              dataState,
              validationState,
              initialValidateState
            );
            change(extractTagOptions<string>(tags));
          }}
          options={LocationTagOptions}
          value={getTagOptionsFromValues(data.locations ?? [], Location)}
        />
      </FormInput>
      <FormInput htmlFor="genresSetting" label="Genres">
        <Select
          isMulti
          name="genresSetting"
          onBlur={validateOnBlur(
            'genres',
            validateGenres,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(tags: readonly TagOption[]) => {
            const change = validateOnChange(
              'genres',
              validateGenres,
              dataState,
              validationState,
              initialValidateState
            );
            change(extractTagOptions<string>(tags));
          }}
          options={GenreTagOptions}
          value={getTagOptionsFromValues(data.genres ?? [], Genre)}
        />
      </FormInput>
      <FormInput htmlFor="talentsSetting" label="Talents">
        <Select
          isMulti
          name="talentsSetting"
          onBlur={validateOnBlur(
            'talents',
            validateTalents,
            dataState,
            validationState,
            initialValidateState
          )}
          onChange={(tags: readonly TagOption[]) => {
            const change = validateOnChange(
              'talents',
              validateTalents,
              dataState,
              validationState,
              initialValidateState
            );
            change(extractTagOptions<string>(tags));
          }}
          options={TalentTagOptions}
          value={getTagOptionsFromValues(data.talents ?? [], Talent)}
        />
      </FormInput>
    </div>
  );
}
