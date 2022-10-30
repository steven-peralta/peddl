import { ValidatorFunc } from '@peddl/common';

export default function validateForm<T extends Record<string, unknown>>(
  model: T,
  validators: Record<keyof T, ValidatorFunc<never>>
) {
  const results = Object.entries(model).map(([key, value]) => {
    const validator = validators[key] as ValidatorFunc<typeof value>;
    return validator(value);
  });
  return results.filter((result) => !result.isValid);
}
