import React, { createRef, useEffect, useState } from 'react';

import { ArrowLeft, Send } from 'react-bootstrap-icons';
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import {
  ClientboundDeleteThreadPayload,
  ClientboundEvents,
  ClientboundMessagePayload,
  IDResponse,
  Media,
  Message,
  PagedResponse,
  Profile,
  ServerboundDeleteLikePayload,
  ServerboundDeleteThreadPayload,
  ServerboundEvents,
  ServerboundMessagePayload,
  ServerboundUpdateThreadPayload,
  Thread,
} from '@peddl/common';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance, { baseURL, getAuthHeader } from '../axiosInstance';
import { useSocket } from '../providers/WebsocketProvider';

interface MessageInfo {
  id: string;
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
      <div
        className="d-flex flex-column align-items-start"
        style={{ marginBottom: '100px' }}
      >
        {messages.map(({ id, content, sentBy }) => {
          const loggedInUserMessage = sentBy === loggedInUserId;

          if (loggedInUserMessage) {
            return (
              <div
                key={id}
                className="d-inline-flex justify-content-end mb-3"
                style={{ width: '100%' }}
              >
                <div
                  className="p-2"
                  style={{
                    backgroundColor: '#0D6EFD',
                    borderRadius: '4px',
                    maxWidth: '326px',
                  }}
                >
                  <p
                    className="m-0"
                    style={{
                      overflowWrap: 'break-word',
                      maxInlineSize: '310px',
                      color: 'white',
                    }}
                  >
                    {content}
                  </p>
                </div>
              </div>
            );
          }
          return (
            <div key={id} className="d-inline-flex flex-row mb-3">
              <div
                className="p-2"
                style={{
                  backgroundColor: '#DEE2E6',

                  borderRadius: '4px',
                  maxWidth: '326px',
                }}
              >
                <p
                  className="m-0"
                  style={{
                    overflowWrap: 'break-word',
                    maxInlineSize: '310px',
                  }}
                >
                  {content}
                </p>
              </div>
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
  threadId: string;
  userId: string;
}

function MessagesHeader({
  avatarSrc,
  name,
  threadId,
  userId,
}: MessagesHeaderProps) {
  const {
    token: [token],
    userId: [loggedInUserId],
  } = useAuth();
  const navigate = useNavigate();
  const socket = useSocket();

  const unmatchUser = async () => {
    await axiosInstance.delete(`/threads/${threadId}`, {
      headers: getAuthHeader(token),
    });

    await axiosInstance.delete(`/users/${loggedInUserId}/likes/${userId}`, {
      headers: getAuthHeader(token),
    });

    const socketPayload: ServerboundDeleteThreadPayload = {
      threadId,
      users: [userId],
    };

    socket.emit(ServerboundEvents.DeleteThread, socketPayload);
    socket.emit(ServerboundEvents.DeleteLike, {
      userId: loggedInUserId,
      likedUserId: userId,
    } as ServerboundDeleteLikePayload);

    navigate('/matches');
  };

  return (
    <div
      className="mb-3"
      style={{
        position: 'sticky',
        top: '60px',
        backgroundColor: 'white',
        borderBottom: 'solid',
        borderBottomColor: 'lightgrey',
        borderWidth: '1px',
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
            <Dropdown.Item onClick={unmatchUser}>Unmatch</Dropdown.Item>
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
  const socket = useSocket();
  const navigate = useNavigate();

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
  const [toUserId, setToUserId] = useState('');

  const endMessagesDiv = createRef<HTMLDivElement>();

  useEffect(() => {
    socket.on(
      `/threads/${threadId}`,
      ({
        messageId,
        threadId: payloadThreadId,
        fromUserId,
        content,
      }: ClientboundMessagePayload) => {
        if (payloadThreadId === threadId && fromUserId !== loggedInUserId) {
          setMessages([
            ...messages,
            { id: messageId, sentBy: fromUserId, content },
          ]);
        }
      }
    );

    socket.on(
      ClientboundEvents.DeleteThread,
      ({ threadId: payloadThreadId }: ClientboundDeleteThreadPayload) => {
        if (payloadThreadId === threadId) {
          navigate('/matches');
        }
      }
    );

    return () => {
      socket.off(`/threads/${threadId}`);
      socket.off(ClientboundEvents.DeleteThread);
    };
  });

  useEffect(() => {
    if (threadData) {
      const [userId] = threadData.users.filter((id) => id !== loggedInUserId);
      setToUserId(userId);
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
        ({ createdBy, content, id }) => {
          return {
            id,
            sentBy: createdBy,
            content,
          };
        }
      );

      setMessages(messagesInfo);
    }
  }, [messagesData]);

  useEffect(() => {
    endMessagesDiv.current?.scrollIntoView();
  }, [endMessagesDiv, messages]);

  return threadDataLoading || messagesDataLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <MessagesHeader
        avatarSrc={threadIconSrc}
        name={threadName}
        threadId={threadId ?? ''}
        userId={toUserId}
      />
      <Messages messages={messages} />
      <div ref={endMessagesDiv} />
      <footer
        style={{
          position: 'fixed',
          width: '100%',
          bottom: '0px',
          backgroundColor: 'white',
          borderTop: 'solid',
          borderTopColor: 'lightgrey',
          borderWidth: '1px',
        }}
      >
        <Container>
          <div style={{ height: '71px' }}>
            <div className="mt-4">
              <Form
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();

                  axiosInstance
                    .post<IDResponse>(
                      `/threads/${threadId}/messages`,
                      { content: messageInputContent },
                      { headers: getAuthHeader(token) }
                    )
                    .then(({ data: { id } }) => {
                      setMessages([
                        ...messages,
                        {
                          id,
                          sentBy: loggedInUserId ?? '',
                          content: messageInputContent,
                        },
                      ]);
                      setMessageInputContent('');

                      const toUserIds =
                        threadData?.users.filter(
                          (userId) => userId !== loggedInUserId
                        ) ?? [];

                      const eventData: ServerboundMessagePayload = {
                        messageId: id,
                        userId: loggedInUserId ?? '',
                        threadId: threadId ?? '',
                        toUserIds,
                        content: messageInputContent,
                      };

                      socket.emit(ServerboundEvents.SendMessage, eventData);

                      axiosInstance.put(
                        `/threads/${threadId}/`,
                        {
                          latestMessage: messageInputContent,
                        },
                        { headers: getAuthHeader(token) }
                      );

                      const updateThreadData: ServerboundUpdateThreadPayload = {
                        threadId: threadId ?? '',
                        latestMessage: messageInputContent,
                        users: threadData?.users ?? [],
                      };

                      socket.emit(
                        ServerboundEvents.UpdateThread,
                        updateThreadData
                      );
                    });
                }}
              >
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={(event) => {
                      setMessageInputContent(event.target.value);
                    }}
                    value={messageInputContent}
                  />
                  <Button type="submit" variant="primary">
                    <Send />
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
