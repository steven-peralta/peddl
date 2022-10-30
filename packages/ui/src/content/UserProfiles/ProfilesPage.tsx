import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../../components/Profiles/UserProfilesStyles.css';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { Gender, Genre, Location, Profile, Talent } from '@peddl/common';
import Profiles from '../../components/Profiles/Profile';
import gHarrison1 from './George_Harrison_1974.jpeg';
import gHarrison2 from './George-Harrison-Credit-Michael-Ochs-Archives-Getty-Images@1400x1050.jpeg';
import jRoss from './ClUnIz6XEAAxtPp.jpeg';
import jHendrix1 from './Hendrix1372884431.webp';
import jHendrix2 from './hendrix.jpeg';
import jHendrix3 from './jimihendrix.jpeg';
import PrevNextButtons from '../../components/PrevNextButtons';

const imgGroup1 = [new Image()];
const imgGroup2 = [new Image(), new Image()];
const imgGroup3 = [new Image(), new Image(), new Image()];
imgGroup1[0].src = jRoss;
imgGroup2[0].src = gHarrison1;
imgGroup2[1].src = gHarrison2;
imgGroup3[0].src = jHendrix1;
imgGroup3[1].src = jHendrix2;
imgGroup3[2].src = jHendrix3;
const imageArray = [imgGroup1, imgGroup2, imgGroup3];

const profiles: Profile[] = [
  {
    _id: '78272',
    name: 'Julia Ross',
    genres: [
      Genre.Alternative,
      Genre.RnB,
      Genre.LoFi,
      Genre.Bubblegum,
      Genre.Electronic,
    ],
    talents: [Talent.DJ, Talent.Vocals],
    location: Location.AustinTX,
    bio: 'Where words fail, music speaks - Hans Anderson',
    birthday: new Date('1987-02-02'),
    gender: Gender.Woman,
    createdBy: '7832293',
    createdAt: new Date(),
  },
  {
    _id: '78272',
    name: 'George Harrison',
    genres: [Genre.LoFi, Genre.Bass, Genre.Bedroom],
    talents: [Talent.Guitar, Talent.Vocals],
    location: Location.AustinTX,
    bio: "I think music in itself is healing. It's an explosive expression of humanity. It's something we are all touched by. No matter what culture we are from, everyone loves music.",
    birthday: new Date('1943-02-23'),
    gender: Gender.Man,
    createdBy: '7832293',
    createdAt: new Date(),
    spotifyLink:
      'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2?si=2N06lAyqQPmIIY-Ze8GLXA',
    soundcloudLink: 'https://soundcloud.com/thebeatles',
  },
  {
    _id: '78272',
    name: 'Jimi Hendrix',
    genres: [Genre.Alternative, Genre.RnB, Genre.LoFi, Genre.Blues, Genre.Funk],
    talents: [Talent.Guitar, Talent.Drums, Talent.ElectricGuitar],
    location: Location.AustinTX,
    bio: 'Music does not lie. If there is something to be changed in this world, then it can only happen through music.',
    birthday: new Date('1942-11-27'),
    gender: Gender.Man,
    createdBy: '7832293',
    createdAt: new Date(),
    spotifyLink:
      'https://open.spotify.com/artist/776Uo845nYHJpNaStv1Ds4?si=PFeXcIw-T2muVj6bDvzAAg',
    soundcloudLink: 'https://soundcloud.com/jimihendrix',
  },
];

export default function ProfilesPage() {
  const [profileIndex, setProfileIndex] = useState(0);

  return (
    <div>
      <Profiles
        bandcampLink={profiles[profileIndex].bandcampLink}
        bio={profiles[profileIndex].bio}
        birthday={profiles[profileIndex].birthday}
        genres={profiles[profileIndex].genres}
        images={imageArray[profileIndex]}
        location={profiles[profileIndex].location}
        name={profiles[profileIndex].name}
        soundcloudLink={profiles[profileIndex].soundcloudLink}
        spotifyLink={profiles[profileIndex].spotifyLink}
        talents={profiles[profileIndex].talents}
      />
      <Container>
        <PrevNextButtons
          nextHidden={profileIndex === profiles.length - 1}
          nextIcon={<ArrowRight className="ms-1" />}
          onNextClick={() => setProfileIndex(profileIndex + 1)}
          onPrevClick={() => setProfileIndex(profileIndex - 1)}
          prevHidden={profiles[profileIndex] === profiles[0]}
          prevIcon={<ArrowLeft className="me-1" />}
        />
      </Container>
    </div>
  );
}
