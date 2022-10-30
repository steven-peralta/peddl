import { Profile, Settings, User } from '../models';
import { ValidationResult } from '../util';

type OmitModelProps<T> = Omit<T, 'id' | 'createdAt'>;

export type IDResponse = { id: string };

export type PostUserRequest = Omit<OmitModelProps<User>, 'salt'>;
export type PostUserResponse = IDResponse;

export type PostProfileRequest = Omit<
  OmitModelProps<Profile>,
  'createdBy' | 'birthday'
> & { birthday: string };
export type PostProfileResponse = IDResponse;

export type PostSettingsRequest = Omit<OmitModelProps<Settings>, 'createdBy'>;
export type PostSettingsResponse = IDResponse;

export type PostAuthRequest = PostUserRequest;
export type PostAuthResponse = { token: string };

export type ErrorResponse = { error: string };
export type FailedValidationResponse = { errors: ValidationResult[] };
