import React, { useEffect, useState } from 'react';

import { ArrowLeft, Send } from 'react-bootstrap-icons';
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { Media, Message, PagedResponse, Profile, Thread } from '@peddl/common';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance, { baseURL, getAuthHeader } from '../axiosInstance';

interface MessageInfo {
  sentBy: string;
  content: string;
}

interface MessagesProps {
  messages: MessageInfo[];
}

function Messages({ messages }: MessagesProps) {
  const {
    userId: [loggedInUserId],
  } = useAuth();

  return (
    <Container>
      <div className="d-flex flex-column align-items-start">
        {messages.map(({ content, sentBy }) => {
          const loggedInUserMessage = sentBy === loggedInUserId;

          if (loggedInUserMessage) {
            return (
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
                    {content}
                  </p>
                </div>
              </div>
            );
          }
          return (
            <div
              className="d-inline-flex flex-row p-2 mb-3"
              style={{
                backgroundColor: '#0D6EFD',
                borderRadius: '4px',
                maxWidth: '326px',
              }}
            >
              <p className="m-0" style={{ color: 'white' }}>
                {content}
              </p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

interface MessagesHeaderProps {
  avatarSrc: string;
  name: string;
}

function MessagesHeader({ avatarSrc, name }: MessagesHeaderProps) {
  return (
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
          <img
            alt="profilePic"
            className="avatar"
            src={`${baseURL}${avatarSrc}`}
          />
          <h1 className="ms-3 mb-0">{name}</h1>
        </div>
      </Container>
    </div>
  );
}

export default function MessagesPage() {
  const { threadId } = useParams();

  const {
    userId: [loggedInUserId],
    token: [token],
  } = useAuth();

  const [{ data: threadData, loading: threadDataLoading }] = useAxios<Thread>({
    url: `/threads/${threadId}`,
    headers: getAuthHeader(token),
  });

  const [{ data: messagesData, loading: messagesDataLoading }] = useAxios<
    PagedResponse<Message>
  >({
    url: `/threads/${threadId}/messages`,
    headers: getAuthHeader(token),
  });

  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const [threadName, setThreadName] = useState('');
  const [threadIconSrc, setThreadIconSrc] = useState('');
  const [messageInputContent, setMessageInputContent] = useState('');

  useEffect(() => {
    if (threadData) {
      const [userId] = threadData.users.filter((id) => id !== loggedInUserId);
      Promise.all([
        axiosInstance.get<Profile>(`/users/${userId}/profile`, {
          headers: getAuthHeader(token),
        }),
        axiosInstance.get<PagedResponse<Media>>(`/users/${userId}/media`, {
          headers: getAuthHeader(token),
        }),
      ]).then(
        ([
          {
            data: { name },
          },
          {
            data: {
              items: [{ filePath: avatarSrc }],
            },
          },
        ]) => {
          setThreadName(name);
          setThreadIconSrc(avatarSrc);
        }
      );
    }
  }, [loggedInUserId, threadData, token]);

  useEffect(() => {
    if (messagesData) {
      const { items } = messagesData;
      const messagesInfo: MessageInfo[] = items.map(
        ({ createdBy, content }) => {
          return {
            sentBy: createdBy,
            content,
          };
        }
      );

      setMessages(messagesInfo);
    }
  }, [messagesData]);

  return threadDataLoading || messagesDataLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <MessagesHeader avatarSrc={threadIconSrc} name={threadName} />
      <Messages messages={messages} />
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
                  onChange={(event) => {
                    setMessageInputContent(event.target.value);
                  }}
                  value={messageInputContent}
                />
                <Button
                  onClick={() => {
                    axiosInstance
                      .post(
                        `/threads/${threadId}/messages`,
                        { content: messageInputContent },
                        { headers: getAuthHeader(token) }
                      )
                      .then(() => {
                        setMessages([
                          ...messages,
                          {
                            sentBy: loggedInUserId ?? '',
                            content: messageInputContent,
                          },
                        ]);
                        setMessageInputContent('');
                      });
                  }}
                  variant="primary"
                >
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
