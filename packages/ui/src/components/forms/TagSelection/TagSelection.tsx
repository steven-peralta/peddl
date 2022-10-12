import React, { useState } from 'react';
import Select from 'react-select';
import { Genres } from '@peddl/common';

export type TagSelectionProps = {
  value: object;
  label: string;
};
const genres = Genres.map((genre) => {
  return { value: genre, label: genre };
});
const options: TagSelectionProps[] = [{ genres }];

export default function TagSelection() {
  const [values, setValues] = useState<TagSelectionProps[]>([]);

  return (
    <div>
      <Select
        isMulti
        options={options}
        onChange={(values) => setValues(values)}
      />
    </div>
  );
}
