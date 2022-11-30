export type TagOption = { value: string; label: string };
export const getTagOptions = ([key, value]: [string, string]) => {
  return { value: key, label: value };
};

export enum Location {
  NewYorkNY = 'New York, NY',
  LosAngelesCA = 'Los Angeles, CA',
  ChicagoIL = 'Chicago, IL',
  HoustonTX = 'Houston, TX',
  PhiladelphiaPA = 'Philadelphia, PA',
  PhoenixAZ = 'Phoenix, AZ',
  SanAntonioTX = 'San Antonio, TX',
  SanDiegoCA = 'San Diego, CA',
  DallasTX = 'Dallas, TX',
  SanJoseCA = 'San Jose, CA',
  AustinTX = 'Austin, TX',
  IndianapolisIN = 'Indianapolis, IN',
  JacksonvilleFL = 'Jacksonville, FL',
  SanFranciscoCA = 'San Francisco, CA',
  ColumbusOH = 'Columbus, OH',
  CharlotteNC = 'Charlotte, NC',
  FortWorthTX = 'Fort Worth, TX',
  DetroitMI = 'Detroit, MI',
  ElPasoTX = 'El Paso, TX',
  MemphisTN = 'Memphis, TN',
  SeattleWA = 'Seattle, WA',
  DenverCO = 'Denver, CO',
  WashingtonDC = 'Washington D.C.',
  BostonMA = 'Boston, MA',
  NashvilleTN = 'Nashville, TN',
  BaltimoreMD = 'Baltimore, MD',
  OklahomaCityOK = 'Oklahoma City, OK',
  LouisvilleKY = 'Louisville, KY',
  PortlandOR = 'Portland, OR',
  LasVegasNV = 'Las Vegas, NV',
  MilwaukeeWI = 'Milwaukee, WI',
  AlbuquerqueNM = 'Albuquerque, NM',
  TucsonAZ = 'Tucson, AZ',
  FresnoCA = 'Fresno, CA',
  SacramentoCA = 'Sacramento, CA',
  LongBeachCA = 'Long Beach, CA',
  KansasCityMO = 'Kansas City, MO',
  MesaAZ = 'Mesa, AZ',
  VirginiaBeachVA = 'Virginia Beach, VA',
  AtlantaGA = 'Atlanta, GA',
  ColoradoSpringsCO = 'Colorado Springs, CO',
  OmahaNE = 'Omaha, NE',
  RaleighNC = 'Raleigh, NC',
  MiamiFL = 'Miami, FL',
  OaklandCA = 'Oakland, CA',
  MinneapolisMN = 'Minneapolis, MN',
  TulsaOK = 'Tulsa, OK',
  ClevelandOH = 'Cleveland, OH',
  WichitaKA = 'Wichita, KA',
  ArlingtonTX = 'Arlington, TX',
  NewOrleansLA = 'New Orleans, LA',
  TampaFL = 'Tampa, FL',
  HonoluluHI = 'Honolulu, HI',
  PittsburghPA = 'Pittsburgh, PA',
  LondonUK = 'London, UK',
  BirminghamUK = 'Birmingham, UK',
  LiverpoolUK = 'Liverpool, UK',
  GlasgowUK = 'Glasgow, UK',
  LeedsUK = 'Leeds, UK',
  ManchesterUK = 'Manchester, UK',
  TorontoON = 'Toronto, ON',
  MontrealQC = 'Montreal, QC',
  VancouverBC = 'Vancouver, BC',
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
