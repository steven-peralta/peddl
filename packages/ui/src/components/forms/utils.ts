import React, { useEffect, useState } from 'react';
import {
  Genders,
  Genres,
  Locations,
  Talents,
  ValidationResult,
  ValidatorFunc,
} from '@peddl/common';
import { TagSelectionOption } from './TagSelection/TagSelection';

export const handleFormChange = <T, Element extends { value: T }>(
  onChangeHandler: (value: T) => void
) => {
  return (event: React.ChangeEvent<Element>) => {
    onChangeHandler(event.target.value);
  };
};

export const handleValidation = <T = string>(
  validator: ValidatorFunc<T>,
  validationTextSetter: React.Dispatch<string | undefined>
) => {
  return (value?: T) => {
    const result = validator(value);
    if (!result.success) {
      validationTextSetter(result.reason);
    } else {
      validationTextSetter(undefined);
    }
  };
};

export const locationSelections = Locations.map<TagSelectionOption>(
  (location) => {
    return { value: location as string, label: location as string };
  }
);

export const genderSelections = Genders.map<TagSelectionOption>((gender) => {
  return { value: gender as string, label: gender as string };
});

export const genreSelections = Genres.map<TagSelectionOption>((genre) => {
  return { value: genre as string, label: genre as string };
});

export const talentSelections = Talents.map<TagSelectionOption>((talent) => {
  return { value: talent as string, label: talent as string };
});

export function useValidation<T = string>(
  validator: (value: T | undefined) => ValidationResult,
  defaultValue?: T
) {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [validationText, setValidationText] = useState<string | undefined>();

  useEffect(() => {
    const result = validator(value);
    if (!result.success) {
      setValidationText(result.reason);
    } else {
      setValidationText(undefined);
    }
  }, [validator, value]);

  return {
    value: [value],
    setter: [setValue],
    validationText: [validationText],
  };
}
