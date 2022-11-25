import React, { useEffect, useState } from 'react';
import { GearFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { Media, PagedResponse, Profile } from '@peddl/common';
import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import { useAuth } from '../providers/AuthProvider';
import { baseURL, getAuthHeader } from '../axiosInstance';

export default function UserProfilePage() {
  const navigate = useNavigate();

  const {
    token: [token],
    userId: [loggedInUserId],
  } = useAuth();

  const [{ data: profile, loading: profileLoading }] = useAxios<Profile>({
    url: `/users/${loggedInUserId}/profile`,
    headers: getAuthHeader(token),
  });

  const [{ data: media, loading: mediaLoading }] = useAxios<
    PagedResponse<Media>
  >({
    url: `/users/${loggedInUserId}/media`,
    headers: getAuthHeader(token),
  });
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
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
  }, [media]);

  const gearButton = (
    <Button
      onClick={() => {
        navigate('/userProfiles');
      }}
      style={{
        width: '48px',
        height: '48px',
      }}
      variant="secondary"
    >
      <GearFill />
    </Button>
  );

  return profileLoading || mediaLoading ? (
    <h1>Loading</h1>
  ) : profile ? (
    <div style={{ marginTop: '60px' }}>
      <ProfileDetails
        actionButton={gearButton}
        media={images}
        profile={profile}
      />
    </div>
  ) : (
    <h1>Profile not found</h1>
  );
}
