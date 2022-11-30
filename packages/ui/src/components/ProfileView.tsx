import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import {
  Like,
  Media,
  PagedResponse,
  Profile,
  ServerboundCreateLikePayload,
  ServerboundDeleteLikePayload,
  ServerboundEvents,
} from '@peddl/common';
import { Button } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance, { baseURL, getAuthHeader } from '../axiosInstance';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import { useSocket } from '../providers/WebsocketProvider';

interface ViewProfileProps {
  userId: string;
}

interface LikeButtonProps {
  fill: boolean;
  onClick: () => void;
}

function LikeButton({ fill, onClick }: LikeButtonProps) {
  return (
    <Button
      onClick={onClick}
      style={{
        width: '48px',
        height: '48px',
      }}
      variant={fill ? 'danger' : 'outline-danger'}
    >
      {fill ? <HeartFill /> : <Heart />}
    </Button>
  );
}

export default function ProfileView({ userId }: ViewProfileProps) {
  const {
    token: [token],
    userId: [loggedInUserId],
  } = useAuth();
  const socket = useSocket();

  const [{ data: profile, loading: profileLoading }] = useAxios<Profile>({
    url: `/users/${userId}/profile`,
    headers: getAuthHeader(token),
  });

  const [{ data: like, loading: likeLoading, error: likeError }] =
    useAxios<Like>({
      url: `/users/${loggedInUserId}/likes/${userId}`,
      headers: getAuthHeader(token),
    });

  const [{ data: media, loading: mediaLoading }] = useAxios<
    PagedResponse<Media>
  >({
    url: `/users/${userId}/media`,
    headers: getAuthHeader(token),
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (like && !likeError) {
      setLiked(true);
    } else if (!like || likeError) {
      setLiked(false);
    }
    if (media) {
      const { items } = media;
      setImages(
        items.map((m) => {
          const image = new Image();
          image.src = `${baseURL}${m.filePath}`;
          return image;
        })
      );
    }
  }, [like, media, likeError]);

  const onLikeClick = async () => {
    if (liked) {
      await axiosInstance.delete(`/users/${loggedInUserId}/likes/${userId}`, {
        headers: getAuthHeader(token),
      });
      const socketData: ServerboundDeleteLikePayload = {
        userId: loggedInUserId ?? '',
        likedUserId: userId,
      };
      socket.emit(ServerboundEvents.DeleteLike, socketData);
      setLiked(false);
    } else {
      await axiosInstance.post(
        `/users/${loggedInUserId}/likes/${userId}`,
        null,
        {
          headers: getAuthHeader(token),
        }
      );
      const socketData: ServerboundCreateLikePayload = {
        userId: loggedInUserId ?? '',
        likedUserId: userId,
      };
      socket.emit(ServerboundEvents.CreateLike, socketData);
      setLiked(true);
    }
  };

  return profileLoading || likeLoading || mediaLoading ? (
    <p>loading</p>
  ) : profile ? (
    <ProfileDetails
      actionButton={<LikeButton fill={liked} onClick={onLikeClick} />}
      media={images}
      profile={profile}
    />
  ) : (
    <h1>Profile not found</h1>
  );
}
