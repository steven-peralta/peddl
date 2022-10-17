import {
  CreateProfileFormData,
  UserFormData,
  validateBandcampLink,
  validateBio,
  validateBirthday,
  validateEmail,
  validateGender,
  validateGenres,
  validateLocation,
  validateName,
  validatePassword,
  validateSpotifyLink,
  validateTalents,
  ValidationResult,
  validateSoundcloudLink,
} from '@peddl/common';

export const validateUserFormData = ({
  email,
  password,
}: UserFormData): ValidationResult => {
  const emailResults = validateEmail(email);
  const passwordResults = validatePassword(password);

  if (!emailResults.success) {
    return emailResults;
  }

  if (!passwordResults.success) {
    return passwordResults;
  }

  return { success: true };
};

export const validateProfileFormData = ({
  name,
  birthday,
  location,
  gender,
  genres,
  talents,
  bio,
  spotifyLink,
  soundcloudLink,
  bandcampLink,
}: CreateProfileFormData) => {
  const nameResults = validateName(name);
  const birthdayResults = validateBirthday(birthday);
  const locationResults = validateLocation(location);
  const genderResults = validateGender(gender);
  const genreResults = validateGenres(genres);
  const talentResults = validateTalents(talents);
  const bioResults = validateBio(bio);
  const spotifyLinkResults = validateSpotifyLink(spotifyLink);
  const soundcloudLinkResults = validateSoundcloudLink(soundcloudLink);
  const bandcampLinkResults = validateBandcampLink(bandcampLink);

  if (!nameResults.success) {
    return nameResults;
  }

  if (!birthdayResults.success) {
    return birthdayResults;
  }

  if (!locationResults.success) {
    return locationResults;
  }

  if (!genderResults.success) {
    return genderResults;
  }

  if (!genreResults.success) {
    return genreResults;
  }

  if (!talentResults.success) {
    return talentResults;
  }

  if (!bioResults.success) {
    return bioResults;
  }

  if (!spotifyLinkResults.success) {
    return spotifyLinkResults;
  }

  if (!soundcloudLinkResults.success) {
    return soundcloudLinkResults;
  }

  if (!bandcampLinkResults.success) {
    return bandcampLinkResults;
  }

  return { success: true };
};
