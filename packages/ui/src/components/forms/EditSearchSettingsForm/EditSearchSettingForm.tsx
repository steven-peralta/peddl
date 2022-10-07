import React from 'react';
import { Form } from 'react-bootstrap';
import { TagsInput } from 'react-tag-input-component';
import handleFormChange from '../utils';

export type EditSearchSettingFormProps = {
  onRangeSettingChange: (rangeSetting: string) => void;
  onGenderSettingChange: (gendersSetting: string[]) => void;
  onLocationSettingChange: (locationsSetting: string[]) => void;
  onGenreSettingInputChange: (genresSetting: string[]) => void;
  onTalentSettingInputChange: (talentsSetting: string[]) => void;
};

export default function EditSearchSettingForm({
  onRangeSettingChange,
  onGenderSettingChange,
  onLocationSettingChange,
  onGenreSettingInputChange,
  onTalentSettingInputChange,
}: EditSearchSettingFormProps) {
  return (
    <div>
      <Form.Group>
        <Form.Range onChange={handleFormChange(onRangeSettingChange)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <div>
          <TagsInput
            onChange={onGenderSettingChange}
            name="gendersSetting"
            placeHolder="Genders"
          />
          <em>Press enter to add new tag</em>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Locations</Form.Label>
        <div>
          <TagsInput
            onChange={onLocationSettingChange}
            name="locationsSetting"
            placeHolder="Locations"
          />
          <em>Press enter to add new tag</em>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genres</Form.Label>
        <div>
          <TagsInput
            onChange={onGenreSettingInputChange}
            name="genresSetting"
            placeHolder="Genres"
          />
          <em>Press enter to add new tag</em>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Talents</Form.Label>
        <div>
          <TagsInput
            onChange={onTalentSettingInputChange}
            name="talentsSetting"
            placeHolder="Talents"
          />
          <em>Press enter to add new tag</em>
        </div>
      </Form.Group>
    </div>
  );
}
