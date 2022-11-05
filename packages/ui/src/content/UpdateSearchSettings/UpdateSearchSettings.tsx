import Select from 'react-select';
import { Container, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import {
  GenderTagOptions,
  GenreTagOptions,
  LocationTagOptions,
  PostSettingsRequest,
  TagOption,
  TalentTagOptions,
} from '@peddl/common';
import { AxiosError } from 'axios';
import Slider from '../../components/Slider/Slider';
import FormInput from '../../components/FormInput';
import { useSettings } from '../../components/SettingsProvider';
import extractTagOptions from '../../utils/extractTagOptions';

export default function UpdateSearchSettings() {
  const [rangeSetting, setRangeSetting] = React.useState<[number, number]>([
    20, 40,
  ]);
  const [gendersSetting, setGenderSetting] = useState<readonly TagOption[]>([]);
  const [locationsSetting, setLocationSetting] = useState<readonly TagOption[]>(
    []
  );
  const [genresSetting, setGenreSetting] = useState<readonly TagOption[]>([]);
  const [talentsSetting, setTalentSetting] = useState<readonly TagOption[]>([]);

  const [requestError, setRequestError] = useState<AxiosError | undefined>();

  const { setSettings } = useSettings();
  const settingsData: PostSettingsRequest = {
    genders: extractTagOptions(gendersSetting),
    genres: extractTagOptions(genresSetting),
    talents: extractTagOptions(talentsSetting),
    locations: extractTagOptions(locationsSetting),
    ageRange: rangeSetting,
  };
  setSettings(settingsData);

  return (
    <Container>
      <h1 className="mb-3 mt-3">Search Settings</h1>
      <Form noValidate>
        <FormInput htmlFor="ageSetting" label="Age">
          <div className="mt-4 pt-2 mb-2">
            <Slider
              max={100}
              min={18}
              onChange={([num1, num2]) => setRangeSetting([num1, num2])}
              step={1}
              values={rangeSetting}
            />
          </div>
        </FormInput>
        <FormInput htmlFor="gendersSetting" label="Gender">
          <Select
            isMulti
            name="gendersSetting"
            onChange={setGenderSetting}
            options={GenderTagOptions}
            value={gendersSetting}
          />
        </FormInput>
        <FormInput htmlFor="locationsSetting" label="Locations">
          <Select
            isMulti
            name="locationsSetting"
            onChange={setLocationSetting}
            options={LocationTagOptions}
            value={locationsSetting}
          />
        </FormInput>
        <FormInput htmlFor="genresSetting" label="Genres">
          <Select
            isMulti
            name="genresSetting"
            onChange={setGenreSetting}
            options={GenreTagOptions}
            value={genresSetting}
          />
        </FormInput>
        <FormInput htmlFor="talentsSetting" label="Talents">
          <Select
            isMulti
            name="talentsSetting"
            onChange={setTalentSetting}
            options={TalentTagOptions}
            value={talentsSetting}
          />
        </FormInput>
        {requestError && (
          <p className="small text-danger">
            {`An error occurred when trying to create a new user: ${requestError.message}`}
          </p>
        )}
      </Form>
    </Container>
  );
}
