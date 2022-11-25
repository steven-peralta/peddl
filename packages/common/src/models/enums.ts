export type TagOption = { value: string; label: string };
export const getTagOptions = ([key, value]: [string, string]) => {
  return { value: key, label: value };
};

export enum Location {
  AustinTX = 'Austin, TX',
  DenverCO = 'Denver, CO',
  ChicagoIL = 'Chicago, IL',
}
export const Locations = Object.values(Location);
export const LocationTagOptions =
  Object.entries(Location).map<TagOption>(getTagOptions);

export enum Gender {
  Man = 'Man',
  Woman = 'Woman',
  TransMan = 'Trans man',
  TransWoman = 'Trans woman',
  NonBinary = 'Non binary',
}
export const Genders = Object.values(Gender);
export const GenderTagOptions =
  Object.entries(Gender).map<TagOption>(getTagOptions);

export enum Genre {
  Acid = 'Acid',
  Alternative = 'Alternative',
  Ambient = 'Ambient',
  Art = 'Art',
  AvantGarde = 'Avant-garde',
  Baroque = 'Baroque',
  Bass = 'Bass',
  Bedroom = 'Bedroom',
  Blackgaze = 'Blackgaze',
  Blues = 'Blues',
  Boyband = 'Boyband',
  Breakbeat = 'Breakbeat',
  Bubblegum = 'Bubblegum',
  Chamber = 'Chamber',
  Chiptune = 'Chiptune',
  ChoppedAndScrewed = 'Chopped and screwed',
  Christian = 'Christian',
  CityPop = 'City pop',
  Classical = 'Classical',
  Cloud = 'Cloud',
  Comedy = 'Comedy',
  Country = 'Country',
  Crunk = 'Crunk',
  Dance = 'Dance',
  Dark = 'Dark',
  DeathMetal = 'Death Metal',
  Disco = 'Disco',
  DnB = 'DnB',
  Dream = 'Dream',
  Drill = 'Drill',
  Drone = 'Drone',
  Dub = 'Dub',
  EDM = 'EDM',
  Electronic = 'Electronic',
  Emo = 'Emo',
  Experimental = 'Experimental',
  Foley = 'Foley',
  Folk = 'Folk',
  Funk = 'Funk',
  FutureBass = 'Future bass',
  Garage = 'Garage',
  Glam = 'Glam',
  Glitch = 'Glitch',
  Goth = 'Goth',
  Grime = 'Grime',
  Grindcore = 'Grindcore',
  Grunge = 'Grunge',
  Hardcore = 'Hardcore',
  HeavyMetal = 'Heavy Metal',
  HipHop = 'Hip Hop',
  Horrorcore = 'Horrorcore',
  House = 'House',
  IDM = 'IDM',
  Indie = 'Indie',
  Industrial = 'Industrial',
  JPop = 'J-pop',
  JRock = 'J-rock',
  Jazz = 'Jazz',
  Jungle = 'Jungle',
  KPop = 'K-pop',
  KRock = 'K-rock',
  Krautrock = 'Krautrock',
  Latin = 'Latin',
  LoFi = 'Lo-fi',
  Madrigal = 'Madrigal',
  MathRock = 'Math rock',
  Metal = 'Meta',
  Mod = 'Mod',
  NewWave = 'New Wave',
  Noise = 'Noise',
  Opera = 'Opera',
  Pop = 'Pop',
  Post = 'Post-',
  Progressive = 'Progressive',
  Psychedelia = 'Psychedelia',
  Punk = 'Punk',
  Rap = 'Rap',
  Reggae = 'Reggae',
  Reggaeton = 'Reggaeton',
  Renaissance = 'Renaissance',
  RiotGrrrl = 'Riot girrrl',
  RnB = 'R&B',
  Rock = 'Rock',
  Samba = 'Samba',
  Screamo = 'Screamo',
  Seapunk = 'Seapunk',
  ShibuyaKei = 'Shibuya kei',
  Shoegaze = 'Shoegaze',
  Ska = 'Ska',
  Slowcore = 'Slowcore',
  Southern = 'Southern',
  Space = 'Space',
  SpokenWord = 'Spoken word',
  Surf = 'Surf',
  Swing = 'Swing',
  Synth = 'Synth',
  Techno = 'Techno',
  Teen = 'Teen',
  Theatre = 'Theatre',
  Traditional = 'Traditional',
  Trap = 'Trap',
  TripHop = 'TripHop',
  Twee = 'Twee',
  Vaporwave = 'Vaporwave',
  World = 'World',
}
export const Genres = Object.values(Genre);
export const GenreTagOptions =
  Object.entries(Genre).map<TagOption>(getTagOptions);

export enum Talent {
  Editing = 'Editing',
  DAW = 'DAW',
  Guitar = 'Guitar',
  Composition = 'Composition',
  Vocals = 'Vocals',
  DJ = 'DJ',
  Keyboard = 'Keyboard',
  Drums = 'Drums',
  Cowbell = 'Cowbell',
  Mandolin = 'Mandolin',
  Banjo = 'Banjo',
  Saxophone = 'Saxophone',
  Mixing = 'Mixing',
  Clarinet = 'Clarinet',
  Violin = 'Violin',
  Kazoo = 'Kazoo',
  ElectricGuitar = 'Electric guitar',
  Flute = 'Flute',
  Bass = 'Bass',
  Piano = 'Piano',
  Trumpet = 'Trumpet',
  Recording = 'Recording',
}
export const Talents = Object.values(Talent);
export const TalentTagOptions =
  Object.entries(Talent).map<TagOption>(getTagOptions);

export const getTagOptionFromValue = (
  value: string,
  constants: Record<string, string>
) => {
  return {
    value,
    label: constants[value],
  };
};

export const getTagOptionsFromValues = (
  values: string[],
  constants: Record<string, string>
): TagOption[] => {
  return values.map((value) => {
    return getTagOptionFromValue(value, constants);
  });
};
