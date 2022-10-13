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
        <div className="mt-4 pt-2 mb-2">
          <Slider />
        </div>
        {/* <Form.Range */}
        {/*  name="ageSetting" */}
        {/*  onChange={handleFormChange(onRangeSettingChange)} */}
        {/* /> */}
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="gendersSetting"
        label="Gender"
        required={genderSettingRequired}
        validationText={genderSettingValidationText}
      >
        <TagSelection options={genderSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="locationsSetting"
        label="Locations"
        required={locationSettingRequired}
        validationText={locationSettingValidationText}
      >
        <TagSelection options={locationSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="genresSetting"
        label="Genres"
        required={genreSettingRequired}
        validationText={genreSettingValidationText}
      >
        <TagSelection options={genreSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="talentsSetting"
        label="Talents"
        required={talentSettingRequired}
        validationText={talentSettingValidationText}
      >
        <TagSelection options={talentSelections} />
        <em>Press enter to add new tag</em>
      </FormInput>
    </div>
  );
}
