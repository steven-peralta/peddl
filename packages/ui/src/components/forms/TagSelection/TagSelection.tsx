import React, { useState } from 'react';
import Select from 'react-select';

export type TagSelectionOption = {
  value: string;
  label: string;
};

export type TagSelectionProps = {
  options: TagSelectionOption[];
};

export default function TagSelection({ options }: TagSelectionProps) {
  const [values, setValues] = useState<TagSelectionProps[]>([]);

  return (
    <div>
      <Select
        isMulti
        options={options}
        onChange={(value) => setValues(values)}
      />
    </div>
  );
}
