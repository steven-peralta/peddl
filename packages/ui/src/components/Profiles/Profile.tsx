import React, { useState } from 'react';
import { Badge, Button, Carousel, Container } from 'react-bootstrap';
import './UserProfilesStyles.css';
import {
  CloudyFill,
  GeoAlt,
  HeartFill,
  Spotify,
  XDiamondFill,
} from 'react-bootstrap-icons';
import { Genre, Talent } from '@peddl/common';

type ProfileProps = {
  name: string;
  birthday: Date;
  bio?: string;
  genres?: Genre[];
  talents?: Talent[];
  spotifyLink?: string;
  bandcampLink?: string;
  soundcloudLink?: string;
  location: string;
  images: HTMLImageElement[];
};

export default function ProfilesPage({
  name,
  location,
  birthday,
  bio,
  talents,
  genres,
  spotifyLink,
  bandcampLink,
  soundcloudLink,
  images,
}: ProfileProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((current) => !current);
  };

  function getAge() {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  }

  return (
    <div>
      <Carousel>
        {images.map((img) => {
          return (
            <Carousel.Item>
              <img alt="First slide" className="userImg" src={img.src} />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Container className="userInfo d-grid gap-1">
        <div className="mt-3">
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-end mb-2">
                <h2 className="m-0 p-0 me-1">{name}</h2>
                <p className="m-0 p-0">{getAge()}</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <GeoAlt className="me-1" style={{ color: 'grey' }} />
                <p className="m-0 p-0" style={{ color: 'grey' }}>
                  {location}
                </p>
              </div>
            </div>
            <Button
              className="btn-outline-danger"
              onClick={handleLike}
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: isLiked ? 'red' : 'white',
              }}
            >
              <HeartFill style={{ color: isLiked ? 'white' : 'red' }} />
            </Button>
          </div>

          {bio && (
            <div className="d-flex">
              <p>{bio}</p>
            </div>
          )}

          <div className="d-flex flex-column mb-2">
            {genres && (
              <div className="mb-3">
                <b>Genres</b>
                <div className="d-flex flex-row mt-2">
                  {genres.map((genre) => {
                    return (
                      <div key={genre} className="me-2">
                        <Badge bg="secondary">{genre}</Badge>{' '}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {talents && (
              <div className="mb-3">
                <b>Talents</b>
                <div className="d-flex flex-row mt-2">
                  {talents.map((talent) => {
                    return (
                      <div className="me-2">
                        <Badge key={talent} bg="secondary">
                          {talent}
                        </Badge>{' '}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {(bandcampLink || soundcloudLink || spotifyLink) && (
              <div className="d-flex flex-column mb-3">
                <b className="mb-2">Links</b>
                {bandcampLink && (
                  <div className="d-flex flex-row align-items-center mb-2">
                    <XDiamondFill
                      className="me-2"
                      style={{ color: '#007AFF' }}
                    />
                    <a className="m-0 p-0" href={bandcampLink}>
                      {bandcampLink}
                    </a>
                  </div>
                )}
                {soundcloudLink && (
                  <div className="d-flex flex-row align-items-center mb-2">
                    <CloudyFill className="me-2" style={{ color: '#007AFF' }} />
                    <a className="m-0 p-0" href={soundcloudLink}>
                      {soundcloudLink}
                    </a>
                  </div>
                )}
                {spotifyLink && (
                  <div className="d-flex flex-row align-items-center mb-2">
                    <Spotify className="me-2" style={{ color: '#007AFF' }} />
                    <a className="m-0 p-0" href={spotifyLink}>
                      {spotifyLink}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
