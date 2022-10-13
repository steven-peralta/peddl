import React from 'react';
import {
  genderSelections,
  genreSelections,
  locationSelections,
  talentSelections,
} from './utils';
import FormInput from './FormInput';
import TagSelection from './TagSelection/TagSelection';
import Slider from '../Slider/Slider';

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
        {/* <Form.Range */}
        {/*  name="ageSetting" */}
        {/*  onChange={handleFormChange(onRangeSettingChange)} */}
        {/* /> */}
      </FormInput>

      <FormInput
        forceShowValidation
        label="Gender"
        htmlFor="gendersSetting"
        validationText={genderSettingValidationText}
        required={genderSettingRequired}
      >
        <TagSelection options={genderSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Locations"
        htmlFor="locationsSetting"
        validationText={locationSettingValidationText}
        required={locationSettingRequired}
      >
        <TagSelection options={locationSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Genres"
        htmlFor="genresSetting"
        validationText={genreSettingValidationText}
        required={genreSettingRequired}
      >
        <TagSelection options={genreSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        label="Talents"
        htmlFor="talentsSetting"
        validationText={talentSettingValidationText}
        required={talentSettingRequired}
      >
        <TagSelection options={talentSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>
    </div>
  );
}
