import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useAxios from 'axios-hooks';
import {
  ClientboundCreateThreadPayload,
  ClientboundDeleteThreadPayload,
  ClientboundEvents,
  ClientboundMatchesPageMatchedPayload,
  ClientboundMatchesPageUnmatchedPayload,
  ClientboundUpdateThreadPayload,
  ID,
  IDResponse,
  Like,
  Media,
  PagedResponse,
  Profile,
  ServerboundCreateThreadPayload,
  ServerboundEvents,
  Thread,
} from '@peddl/common';
import Content from '../../components/Content';
import './MatchesPage.css';
import { useAuth } from '../../providers/AuthProvider';
import axiosInstance, { baseURL, getAuthHeader } from '../../axiosInstance';
import { useSocket } from '../../providers/WebsocketProvider';

interface MatchInfo {
  name: string;
  avatarSrc: string;
  userId: string;
}

interface ThreadInfo {
  name: string;
  avatarSrc: string;
  threadId: string;
  lastMessage: string;
}

interface MatchesRowProps {
  matches: Record<string, MatchInfo>;
}

function MatchesRow({ matches }: MatchesRowProps) {
  const navigate = useNavigate();
  const socket = useSocket();
  const matchValues = Object.values(matches);

  const {
    userId: [loggedInUserId],
    token: [token],
  } = useAuth();

  const createThread = async (userId: string): Promise<string> => {
    const { data } = await axiosInstance.post<IDResponse>(
      `/threads`,
      {
        users: [userId, loggedInUserId],
      },
      { headers: getAuthHeader(token) }
    );

    const socketPayload: ServerboundCreateThreadPayload = {
      threadId: data.id,
      users: [userId, loggedInUserId ?? ''],
    };

    socket.emit(ServerboundEvents.CreateThread, socketPayload);

    if (data) {
      return data.id;
    }

    return '';
  };

  const avatarOnClick = (userId: string) => {
    return () => {
      createThread(userId).then((id) => {
        navigate(`/matches/${id}`);
      });
    };
  };

  return (
    <div className="matchesContainer">
      {matchValues.length === 0 ? (
        <h3>No matches yet.</h3>
      ) : (
        <table>
          <thead>
            <tr>
              {matchValues.map(({ avatarSrc, userId }) => (
                <th onClick={avatarOnClick(userId)}>
                  <img
                    alt="profilePic"
                    className="avatar"
                    src={`${baseURL}${avatarSrc}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {matchValues.map(({ name }) => (
                <td>{name}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

interface ThreadsListProps {
  threads: Record<string, ThreadInfo>;
}

function ThreadsList({ threads }: ThreadsListProps) {
  const threadValues = Object.values(threads);

  return threadValues.length === 0 ? (
    <h3>No messages yet.</h3>
  ) : (
    <ListGroup>
      {threadValues.map(({ name, avatarSrc, threadId, lastMessage }) => {
        return (
          <Link style={{ textDecoration: 'none' }} to={`/matches/${threadId}`}>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="pt-1">
                <img
                  alt="avatar"
                  className="avatarMsg"
                  src={`${baseURL}${avatarSrc}`}
                />
              </div>

              <div className="ms-3 me-auto">
                <div className="fw-bold">{name}</div>
                {lastMessage}
              </div>
              <div className="msgBtn">
                <ChevronRight />
              </div>
            </ListGroup.Item>
          </Link>
        );
      })}
    </ListGroup>
  );
}

export default function MatchesPage() {
  const {
    userId: [loggedInUserId],
    token: [token],
  } = useAuth();
  const socket = useSocket();

  const [{ data: matchesData, loading: matchesDataLoading }] = useAxios<
    PagedResponse<Like>
  >({
    url: `/users/${loggedInUserId}/likes?mutual=true`,
    headers: getAuthHeader(token),
  });

  const [{ data: threadsData, loading: threadsDataLoading }] = useAxios<
    PagedResponse<Thread>
  >({
    url: `/users/${loggedInUserId}/threads`,
    headers: getAuthHeader(token),
  });

  const [matches, setMatches] = useState<Record<string, MatchInfo>>({});
  const [threads, setThreads] = useState<Record<string, ThreadInfo>>({});

  useEffect(() => {
    if (threadsData) {
      const { items: threadItems } = threadsData;

      if (matchesData) {
        const allThreadUsers = threadItems.reduce((acc, { users }) => {
          acc.push(...users);
          return acc;
        }, [] as ID[]);
        const matchItems = matchesData.items.filter(
          ({ userId }) => !allThreadUsers.includes(userId)
        );

        if (matchItems.length > 0) {
          Promise.all(
            matchItems.map(({ userId }) => {
              return Promise.all([
                axiosInstance.get<Profile>(`/users/${userId}/profile`, {
                  headers: getAuthHeader(token),
                }),
                axiosInstance.get<PagedResponse<Media>>(
                  `/users/${userId}/media`,
                  {
                    headers: getAuthHeader(token),
                  }
                ),
              ]);
            })
          ).then((promises) => {
            const newMatches = promises.reduce(
              (
                acc,
                [
                  {
                    data: { name, createdBy: userId },
                  },
                  {
                    data: {
                      items: [{ filePath: avatarSrc }],
                    },
                  },
                ]
              ) => {
                acc[userId] = {
                  name,
                  userId,
                  avatarSrc,
                };
                return acc;
              },
              {} as Record<string, MatchInfo>
            );
            setMatches(newMatches);
          });
        }
      }

      Promise.all(
        threadItems.map(({ users, id: threadId, latestMessage }) => {
          const [userId] = users.filter((id) => id !== loggedInUserId);
          const getThreadId = async () => threadId; // this sucks lol
          const getLatestMessage = async () => latestMessage; // this also sucks lol
          return Promise.all([
            getThreadId(),
            getLatestMessage(),
            axiosInstance.get<Profile>(`/users/${userId}/profile`, {
              headers: getAuthHeader(token),
            }),
            axiosInstance.get<PagedResponse<Media>>(`/users/${userId}/media`, {
              headers: getAuthHeader(token),
            }),
          ]);
        })
      ).then((promises) => {
        const allThreads = promises.reduce(
          (
            acc,
            [
              threadId,
              latestMessage,
              {
                data: { name },
              },
              {
                data: {
                  items: [{ filePath: avatarSrc }],
                },
              },
            ]
          ) => {
            acc[threadId] = {
              name,
              avatarSrc,
              threadId,
              lastMessage: latestMessage,
            };
            return acc;
          },
          {} as Record<string, ThreadInfo>
        );
        setThreads(allThreads);
      });
    }
  }, [loggedInUserId, matchesData, threadsData, token]);

  useEffect(() => {
    socket.on(
      ClientboundEvents.MatchesPageMatched,
      ({ userId, name, avatarSrc }: ClientboundMatchesPageMatchedPayload) => {
        const newMatchesInfo = {
          ...matches,
          [userId]: { userId, name, avatarSrc },
        };
        setMatches(newMatchesInfo);
      }
    );
    socket.on(
      ClientboundEvents.MatchesPageUnmatched,
      ({ userId }: ClientboundMatchesPageUnmatchedPayload) => {
        const newMatchesInfo = { ...matches };
        delete newMatchesInfo[userId];
        setMatches(newMatchesInfo);
      }
    );
    socket.on(
      ClientboundEvents.CreateThread,
      async ({ threadId, users }: ClientboundCreateThreadPayload) => {
        const [userId] = users.filter((id) => id !== loggedInUserId);

        const {
          data: { latestMessage },
        } = await axiosInstance.get<Thread>(`/threads/${threadId}`, {
          headers: getAuthHeader(token),
        });

        const {
          data: { name },
        } = await axiosInstance.get<Profile>(`/users/${userId}/profile`, {
          headers: getAuthHeader(token),
        });

        const {
          data: {
            items: [{ filePath: avatarSrc }],
          },
        } = await axiosInstance.get<PagedResponse<Media>>(
          `/users/${userId}/media`,
          {
            headers: getAuthHeader(token),
          }
        );

        const newThreadInfo = {
          ...threads,
          [threadId]: {
            threadId,
            avatarSrc,
            lastMessage: latestMessage,
            name,
          },
        };

        setThreads(newThreadInfo);

        // remove our users from our matches
        const newMatches = { ...matches };
        delete newMatches[userId];
        setMatches(newMatches);
      }
    );

    socket.on(
      ClientboundEvents.UpdateThread,
      ({ threadId, latestMessage }: ClientboundUpdateThreadPayload) => {
        const newThreadInfo = { ...threads };
        newThreadInfo[threadId].lastMessage = latestMessage;
        setThreads(newThreadInfo);
      }
    );

    socket.on(
      ClientboundEvents.DeleteThread,
      ({ threadId }: ClientboundDeleteThreadPayload) => {
        const newThreadInfo = { ...threads };
        delete newThreadInfo[threadId];
        setThreads(newThreadInfo);
      }
    );

    return () => {
      socket.off(ClientboundEvents.CreateThread);
      socket.off(ClientboundEvents.UpdateThread);
      socket.off(ClientboundEvents.DeleteThread);
      socket.off(ClientboundEvents.MatchesPageMatched);
    };
  });

  return (
    <Content title="Matches">
      {matchesDataLoading ? (
        <p>Loading...</p>
      ) : (
        <MatchesRow matches={matches} />
      )}
      <h1 className="mt-3">Messages</h1>
      {threadsDataLoading ? (
        <p>Loading...</p>
      ) : (
        <ThreadsList threads={threads} />
      )}
    </Content>
  );
}
