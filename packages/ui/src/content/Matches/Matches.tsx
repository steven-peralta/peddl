import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, ListGroup } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import Content from '../../components/Content';
import avatarImg from './avatar.png';
import './MatchesStyles.css';

export default function Matches() {
  return (
    <Content title="Matches">
      <div>
        <div className="matchesContainer">
          <table>
            <thead>
              <tr>
                <th>
                  <img className="avatar" src={avatarImg} alt="profilePic" />
                </th>
                <th>
                  <img className="avatar" src={avatarImg} alt="profilePic" />
                </th>
                <th>
                  <img className="avatar" src={avatarImg} alt="profilePic" />
                </th>
                <th>
                  <img className="avatar" src={avatarImg} alt="profilePic" />
                </th>
                <th>
                  <img className="avatar" src={avatarImg} alt="profilePic" />
                </th>
                <th>
                  <img className="avatar" src={avatarImg} alt="profilePic" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sid</td>
                <td>Jim</td>
                <td>Jimi</td>
                <td>Kurt</td>
                <td>Katy</td>
                <td>Usher</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 className="mt-3">Messages</h1>
        <ListGroup>
          <Link to="/messages" style={{ textDecoration: 'none' }}>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="pt-1">
                <img src={avatarImg} className="avatarMsg" alt="avatar" />
              </div>

              <div className="ms-3 me-auto">
                <div className="fw-bold">George</div>
                Hello! love your sound, lets collab!
              </div>

              <div className="msgBtn">
                <Badge bg="primary" pill className="me-1">
                  1
                </Badge>
                <ChevronRight />
              </div>
            </ListGroup.Item>
          </Link>

          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="pt-1">
              <img src={avatarImg} className="avatarMsg" alt="avatar" />
            </div>
            <div className="ms-3 me-auto">
              <div className="fw-bold">Thomas</div>
              yo! yo!
            </div>
            <div className="msgBtn">
              <ChevronRight />
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Content>
  );
}
