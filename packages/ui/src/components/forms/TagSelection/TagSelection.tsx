import React from 'react';
import Select from 'react-select';

export type TagSelectionOption = {
  value: string;
  label: string;
};

export type TagSelectionProps = {
  options: TagSelectionOption[];
  onBlur?: () => void;
  onChange: (values: readonly TagSelectionOption[]) => void;
  values: TagSelectionOption[];
};

export default function TagSelection({
  options,
  onBlur,
  onChange,
  values,
}: TagSelectionProps) {
  return (
    <div>
      <Select
        isMulti
        onBlur={onBlur}
        onChange={onChange}
        options={options}
        value={values}
      />
    </div>
  );
}
