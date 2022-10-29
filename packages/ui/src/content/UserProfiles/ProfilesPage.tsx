import React from 'react';
import { Button, Container } from 'react-bootstrap';
import '../../components/Profiles/UserProfilesStyles.css';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { Genre, Talent } from '@peddl/common';
import Profiles from '../../components/Profiles/Profile';
import sampleImg from './George_Harrison_1974.jpeg';
import sampleImg2 from './George-Harrison-Credit-Michael-Ochs-Archives-Getty-Images@1400x1050.jpeg';

const images = [new Image(), new Image()];
images[0].src = sampleImg;
images[1].src = sampleImg2;

export default function ProfilesPage() {
  return (
    <div>
      <Profiles
        bandcampLink="bandcampLink.com"
        bio="I love music"
        birthday={new Date()}
        genres={[Genre.Ambient, Genre.Acid]}
        images={images}
        location="Austin, tx"
        name="Bob"
        soundcloudLink="soundcloudLink.com"
        spotifyLink="spotifyLink.com"
        talents={[Talent.DJ, Talent.Composition]}
      />

      <Container className="d-flex flex-row justify-content-between mb-4">
        <Button className="btn-secondary">
          <ArrowLeft className="me-2" />
          Prev
        </Button>
        <Button>
          Next
          <ArrowRight className="ms-2" />
        </Button>
      </Container>
    </div>
  );
}
