import React from 'react';
import {
  genderSelections,
  genreSelections,
  locationSelections,
  talentSelections,
} from './utils';
import FormInput from './FormInput';
import TagSelection, { TagSelectionOption } from './TagSelection/TagSelection';
import Slider from '../Slider/Slider';

export type EditSearchSettingFormProps = {
  onRangeSettingChange: (rangeSetting: number[]) => void;
  rangeSettingRequired?: boolean;
  rangeSettingValidationText?: string;

  genders: TagSelectionOption[];
  onGenderSettingChange: (gendersSetting: TagSelectionOption[]) => void;
  genderSettingRequired?: boolean;
  genderSettingValidationText?: string;

  locations: TagSelectionOption[];
  onLocationSettingChange: (locationsSetting: TagSelectionOption[]) => void;
  locationSettingRequired?: boolean;
  locationSettingValidationText?: string;

  genres: TagSelectionOption[];
  onGenreSettingInputChange: (genresSetting: TagSelectionOption[]) => void;
  genreSettingRequired?: boolean;
  genreSettingValidationText?: string;

  talents: TagSelectionOption[];
  onTalentSettingInputChange: (talentsSetting: TagSelectionOption[]) => void;
  talentSettingRequired?: boolean;
  talentSettingValidationText?: string;
};

export default function EditSearchSettingForm({
  genders,
  locations,
  genres,
  talents,
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
          <Slider max={100} min={18} onChange={onRangeSettingChange} step={1} />
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
        <TagSelection
          onChange={onGenderSettingChange}
          options={genderSelections}
          values={genders}
        />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="locationsSetting"
        label="Locations"
        required={locationSettingRequired}
        validationText={locationSettingValidationText}
      >
        <TagSelection
          onChange={onLocationSettingChange}
          options={locationSelections}
          values={locations}
        />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="genresSetting"
        label="Genres"
        required={genreSettingRequired}
        validationText={genreSettingValidationText}
      >
        <TagSelection
          onChange={onGenreSettingInputChange}
          options={genreSelections}
          values={genres}
        />
        <em>Press enter to add new tag</em>
      </FormInput>

      <FormInput
        forceShowValidation
        htmlFor="talentsSetting"
        label="Talents"
        required={talentSettingRequired}
        validationText={talentSettingValidationText}
      >
        <TagSelection
          onChange={onTalentSettingInputChange}
          options={talentSelections}
          values={talents}
        />
        <em>Press enter to add new tag</em>
      </FormInput>
    </div>
  );
}
