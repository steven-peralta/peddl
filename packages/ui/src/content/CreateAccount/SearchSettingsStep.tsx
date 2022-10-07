import React, { useState } from 'react';
import EditSearchSettingForm from '../../components/forms/EditSearchSettingsForm/EditSearchSettingForm';

export default function SearchSettingsStep() {
  const [rangeSetting, setRangeSetting] = useState('');
  const [gendersSetting, setGenderSetting] = useState<string[]>([]);
  const [locationsSetting, setLocationSetting] = useState<string[]>([]);
  const [genresSetting, setGenreSetting] = useState<string[]>([]);
  const [talentsSetting, setTalentSetting] = useState<string[]>([]);
  return (
    <EditSearchSettingForm
      onRangeSettingChange={setRangeSetting}
      onGenderSettingChange={setGenderSetting}
      onLocationSettingChange={setLocationSetting}
      onGenreSettingInputChange={setGenreSetting}
      onTalentSettingInputChange={setTalentSetting}
    />
  );
}
