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

  if (!emailResults.isValid) {
    return emailResults;
  }

  if (!passwordResults.isValid) {
    return passwordResults;
  }

  return { isValid: true };
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

  if (!nameResults.isValid) {
    return nameResults;
  }

  if (!birthdayResults.isValid) {
    return birthdayResults;
  }

  if (!locationResults.isValid) {
    return locationResults;
  }

  if (!genderResults.isValid) {
    return genderResults;
  }

  if (!genreResults.isValid) {
    return genreResults;
  }

  if (!talentResults.isValid) {
    return talentResults;
  }

  if (!bioResults.isValid) {
    return bioResults;
  }

  if (!spotifyLinkResults.isValid) {
    return spotifyLinkResults;
  }

  if (!soundcloudLinkResults.isValid) {
    return soundcloudLinkResults;
  }

  if (!bandcampLinkResults.isValid) {
    return bandcampLinkResults;
  }

  return { isValid: true };
};
