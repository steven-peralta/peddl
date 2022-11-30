import { ValidationResults } from '@peddl/common';
import { ReactState } from '../../utils/types';

export interface ValidationFormProps<T> {
  dataState: ReactState<T>;
  validationState: ReactState<ValidationResults<T>>;
  initialValidateState: ReactState<Partial<Record<keyof T, true>>>;
}
