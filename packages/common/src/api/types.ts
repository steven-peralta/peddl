import { Profile, Settings, User } from '../models';
import { ValidationResult } from '../util';

type OmitModelProps<T> = Omit<T, 'id' | 'createdAt'>;
type OmitCreatedBy<T> = Omit<OmitModelProps<T>, 'createdBy'>;

export type IDResponse = { id: string };

export type PostUserRequest = Omit<OmitModelProps<User>, 'salt'>;
export type PostUserResponse = IDResponse;

export type PostProfileRequest = Omit<
  OmitModelProps<Profile>,
  'createdBy' | 'birthday'
> & { birthday: string };
export type PostProfileResponse = IDResponse;

export type PostSettingsRequest = OmitCreatedBy<Settings>;
export type PostSettingsResponse = IDResponse;

export type PostAuthRequest = PostUserRequest;
export type PostAuthResponse = { userId: string; token: string };

export type GetProfilesRequest = PostSettingsRequest;

export type GetSettingsRequest = OmitCreatedBy<Settings>;

export type ErrorResponse = { error: string };
export type FailedValidationResponse = { errors: ValidationResult[] };
export type PagedResponse<T> = {
  items: T[];
  count: number;
};
