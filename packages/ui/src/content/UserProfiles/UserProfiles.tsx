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
import sampleImg from './George_Harrison_1974.jpeg';
import sampleImg2 from './George-Harrison-Credit-Michael-Ochs-Archives-Getty-Images@1400x1050.jpeg';

export default function UserProfiles() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((current) => !current);
  };

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img alt="First slide" className="userImg" src={sampleImg} />
        </Carousel.Item>

        <Carousel.Item>
          <img alt="Second slide" className="userImg" src={sampleImg2} />
        </Carousel.Item>
      </Carousel>
      <Container className="userInfo d-grid gap-1">
        <div className="mt-3">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-end mb-2">
                <h2 className="m-0 p-0 me-1">George</h2>
                <p className="m-0 p-0">58</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <GeoAlt className="me-1" />
                <p className="m-0 p-0">Liverpool, UK</p>
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
          <div className="d-flex mt-2">
            <p>
              I am really quite simple. I plant flowers and watch them grow... I
              stay at home and watch the river flow.
            </p>
          </div>
          <div className="d-flex flex-column mb-3">
            <b>Genres</b>
            <div className="d-flex flex-row mt-1">
              <div className="me-2">
                <Badge bg="light" text="dark">
                  Psychedelia
                </Badge>{' '}
              </div>
              <div className="me-2">
                <Badge bg="light" text="dark">
                  Boyband
                </Badge>{' '}
              </div>
              <div className="me-2">
                <Badge bg="light" text="dark">
                  Blues
                </Badge>{' '}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mb-3">
            <b>Talents</b>
            <div className="d-flex flex-row mt-1">
              <div className="me-2">
                <Badge bg="light" text="dark">
                  Guitar
                </Badge>{' '}
              </div>
              <div className="me-2">
                <Badge bg="light" text="dark">
                  Vocals
                </Badge>{' '}
              </div>
              <div className="me-2">
                <Badge bg="light" text="dark">
                  Composition
                </Badge>{' '}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mb-3">
            <b>Links</b>
            <div className="d-flex flex-row align-items-center mt-1">
              <XDiamondFill className="me-1" />
              <a className="m-0 p-0" href=" ">
                thebeatles.bandcamp.com
              </a>
            </div>
            <div className="d-flex flex-row align-items-center">
              <CloudyFill className="me-1" />
              <a className="m-0 p-0" href=" ">
                soundcloud.com/thebeatles
              </a>
            </div>
            <div className="d-flex flex-row align-items-center">
              <Spotify className="me-1" />
              <a className="m-0 p-0" href=" ">
                spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
