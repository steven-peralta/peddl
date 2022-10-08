import React from 'react';
import EditSearchSettingForm, {
  EditSearchSettingFormProps,
} from '../../components/forms/EditSearchSettingForm';

export default function SearchSettingsStep(props: EditSearchSettingFormProps) {
  return <EditSearchSettingForm {...props} />;
}
