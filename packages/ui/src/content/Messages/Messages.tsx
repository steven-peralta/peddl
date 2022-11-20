import React from 'react';

import { ArrowLeft, Send } from 'react-bootstrap-icons';
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatarImg from '../Matches/avatar.png';

export default function Messages() {
  return (
    <div>
      <div
        className="mb-3"
        style={{
          position: 'sticky',
          top: '60px',
          backgroundColor: 'white',
          borderBottom: 'solid',
          borderBottomColor: 'lightgrey',
        }}
      >
        <Container>
          <div
            className="mt-8 d-flex flex-row justify-content-between"
            style={{ marginTop: '60px' }}
          >
            <Link to="/matches">
              <Button className="mt-4" variant="outline-primary">
                <ArrowLeft className="me-3" />
                Matches
              </Button>
            </Link>

            <DropdownButton
              className="float-end mt-4"
              id="dropdown-basic-button"
              title="Menu"
              variant="secondary"
            >
              <Dropdown.Item href="#/action-1">Unmatch</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="mt-4 mb-4 d-inline-flex align-items-center">
            <img alt="profilePic" className="avatar" src={avatarImg} />
            <h1 className="ms-3 mb-0">George</h1>
          </div>
        </Container>
      </div>

      <Container>
        <div className="d-flex flex-column align-items-start">
          {/* match message */}
          <div
            className="d-inline-flex flex-row p-2 mb-3"
            style={{
              backgroundColor: '#0D6EFD',
              borderRadius: '4px',
              maxWidth: '326px',
            }}
          >
            <p className="m-0" style={{ color: 'white' }}>
              Hey! Lets collaborate!
            </p>
          </div>
          {/* user message */}
          <div
            className="d-inline-flex justify-content-end mb-3"
            style={{ width: '100%' }}
          >
            <div>
              <p
                className="m-0 p-2"
                style={{
                  color: 'black',
                  backgroundColor: '#DEE2E6',
                  borderRadius: '4px',
                  maxWidth: '326px',
                }}
              >
                Sure thing. Just listened to what you have posted. You rock,
                dude.
              </p>
            </div>
          </div>

          {/* match message */}
          <div
            className="d-inline-flex flex-row p-2 mb-3"
            style={{
              backgroundColor: '#0D6EFD',
              borderRadius: '4px',
              maxWidth: '326px',
            }}
          >
            <p className="m-0" style={{ color: 'white' }}>
              Thanks! I am a RoBoT!
            </p>
          </div>

          {/* match message */}
          <div
            className="d-inline-flex flex-row p-2 mb-3"
            style={{
              backgroundColor: '#0D6EFD',
              borderRadius: '4px',
              maxWidth: '326px',
            }}
          >
            <p
              className="m-0"
              style={{
                color: 'white',
                overflowWrap: 'break-word',
                inlineSize: '300px',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in
              consequat velit. In turpis est, consectetur a venenatis vitae,
              mattis vitae odio. Curabitur iaculis diam eu hendrerit vehicula.
              Vivamus vehicula tincidunt blandit. Morbi quis felis sed nisl
              lobortis placerat in vel urna. In et tellus a nibh convallis
              posuere. In tincidunt ante sed ligula venenatis, a commodo velit
              vehicula. Vivamus lacinia dui sapien, sit amet fermentum neque
              malesuada id. Fusce ex elit, imperdiet quis augue quis, venenatis
              bibendum lorem. Nulla tincidunt elit non dui dapibus, eu eleifend
              justo semper. Proin cursus, purus vitae scelerisque rhoncus, arcu
              lectus sodales justo, sed.
            </p>
          </div>
        </div>
      </Container>

      <div
        style={{
          position: 'sticky',
          bottom: '0px',
          backgroundColor: 'white',
          borderTop: 'solid',
          borderTopColor: 'lightgrey',
        }}
      >
        <Container>
          <div style={{ height: '71px' }}>
            <div className="mt-4">
              <InputGroup className="mb-3">
                <Form.Control
                  aria-describedby="basic-addon1"
                  aria-label="Example text with button addon"
                />
                <Button id="button-addon1" variant="primary">
                  <Send />
                </Button>
              </InputGroup>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
