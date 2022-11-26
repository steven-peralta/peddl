import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import useAxios from 'axios-hooks';
import {
  ID,
  IDResponse,
  Like,
  Media,
  PagedResponse,
  Profile,
  Thread,
} from '@peddl/common';
import Content from '../../components/Content';
import './MatchesPage.css';
import { useAuth } from '../../providers/AuthProvider';
import axiosInstance, { baseURL, getAuthHeader } from '../../axiosInstance';

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
  matches: MatchInfo[];
}

function MatchesRow({ matches }: MatchesRowProps) {
  const navigate = useNavigate();

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
      {matches.length === 0 ? (
        <h3>No matches yet.</h3>
      ) : (
        <table>
          <thead>
            <tr>
              {matches.map(({ avatarSrc, userId }) => (
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
              {matches.map(({ name }) => (
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
  threads: ThreadInfo[];
}

function ThreadsList({ threads }: ThreadsListProps) {
  return threads.length === 0 ? (
    <h3>No messages yet.</h3>
  ) : (
    <ListGroup>
      {threads.map(({ name, avatarSrc, threadId, lastMessage }) => {
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

  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [threads, setThreads] = useState<ThreadInfo[]>([]);

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
            const newMatches = promises.map(
              ([
                {
                  data: { name, createdBy: userId },
                },
                {
                  data: {
                    items: [{ filePath: avatarSrc }],
                  },
                },
              ]) => {
                const match: MatchInfo = {
                  name,
                  userId,
                  avatarSrc,
                };
                return match;
              }
            );
            setMatches(newMatches);
          });
        }
      }

      Promise.all(
        threadItems.map(({ users, id: threadId }) => {
          const [userId] = users.filter((id) => id !== loggedInUserId);
          const getThreadId = async () => threadId; // this sucks lol
          return Promise.all([
            getThreadId(),
            axiosInstance.get<Profile>(`/users/${userId}/profile`, {
              headers: getAuthHeader(token),
            }),
            axiosInstance.get<PagedResponse<Media>>(`/users/${userId}/media`, {
              headers: getAuthHeader(token),
            }),
          ]);
        })
      ).then((promises) => {
        const allThreads = promises.map(
          ([
            threadId,
            {
              data: { name },
            },
            {
              data: {
                items: [{ filePath: avatarSrc }],
              },
            },
          ]) => {
            const thread: ThreadInfo = {
              name,
              avatarSrc,
              threadId,
              lastMessage: 'lorem ipsum',
            };
            return thread;
          }
        );
        setThreads(allThreads);
      });
    }
  }, [loggedInUserId, matchesData, threadsData, token]);

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
