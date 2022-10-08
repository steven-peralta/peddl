import React from 'react';
import { Form } from 'react-bootstrap';
import { TagsInput } from 'react-tag-input-component';
import handleFormChange from './utils';
import FormInput from './FormInput';

export type EditSearchSettingFormProps = {
  onRangeSettingChange: (rangeSetting: string) => void;
  rangeSettingRequired?: boolean;
  rangeSettingValidationText?: string;
  onGenderSettingChange: (gendersSetting: string[]) => void;
  genderSettingRequired?: boolean;
  genderSettingValidationText?: string;
  onLocationSettingChange: (locationsSetting: string[]) => void;
  locationSettingRequired?: boolean;
  locationSettingValidationText?: string;
  onGenreSettingInputChange: (genresSetting: string[]) => void;
  genreSettingRequired?: boolean;
  genreSettingValidationText?: string;
  onTalentSettingInputChange: (talentsSetting: string[]) => void;
  talentSettingRequired?: boolean;
  talentSettingValidationText?: string;
};

export default function EditSearchSettingForm({
  onRangeSettingChange,
  rangeSettingRequired = false,
  rangeSettingValidationText,
  onGenderSettingChange,
  genderSettingValidationText,
  genderSettingRequired = false,
  onLocationSettingChange,
  locationSettingRequired = false,
  locationSettingValidationText,
  onGenreSettingInputChange,
  genreSettingRequired = false,
  genreSettingValidationText,
  onTalentSettingInputChange,
  talentSettingRequired = false,
  talentSettingValidationText,
}: EditSearchSettingFormProps) {
  return (
    <div>
      <FormInput
        forceShowValidation
        htmlFor="ageSetting"
        label="Age"
        required={rangeSettingRequired}
        validationText={rangeSettingValidationText}
      >
        <Form.Range
          name="ageSetting"
          onChange={handleFormChange(onRangeSettingChange)}
        />
      </FormInput>

      <FormInput
        forceShowValidation
        label="Gender"
        htmlFor="gendersSetting"
        validationText={genderSettingValidationText}
        required={genderSettingRequired}
      >
        <TagsInput
          onChange={onGenderSettingChange}
          name="gendersSetting"
          placeHolder="Genders"
        />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Locations"
        htmlFor="locationsSetting"
        validationText={locationSettingValidationText}
        required={locationSettingRequired}
      >
        <TagsInput
          onChange={onLocationSettingChange}
          name="locationsSetting"
          placeHolder="Locations"
        />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Genres"
        htmlFor="genresSetting"
        validationText={genreSettingValidationText}
        required={genreSettingRequired}
      >
        <TagsInput
          onChange={onGenreSettingInputChange}
          name="genresSetting"
          placeHolder="Genres"
        />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Talents"
        htmlFor="talentsSetting"
        validationText={talentSettingValidationText}
        required={talentSettingRequired}
      >
        <TagsInput
          onChange={onTalentSettingInputChange}
          name="talentsSetting"
          placeHolder="Talents"
        />
        <em>Press enter to add new tag</em>
      </FormInput>
    </div>
  );
}
