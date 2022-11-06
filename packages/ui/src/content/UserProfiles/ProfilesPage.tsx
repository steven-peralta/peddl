import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import '../../components/Profiles/UserProfilesStyles.css';
import { ArrowLeft, ArrowRight, HeartFill } from 'react-bootstrap-icons';
import { PagedResponse, Profile } from '@peddl/common';
import useAxios from 'axios-hooks';
import ProfileDetails from '../../components/Profiles/ProfileDetails';
import PrevNextButtons from '../../components/PrevNextButtons';
import { useSettings } from '../../components/SettingsProvider';

export default function ProfilesPage() {
  const { settings } = useSettings();
  const params = new URLSearchParams();
  params.set('genders', settings?.genders?.join(',') ?? '');
  params.set('genres', settings?.genres?.join(',') ?? '');
  params.set('locations', settings?.locations?.join(',') ?? '');
  params.set('talents', settings?.talents?.join(',') ?? '');
  const [{ data: profileData, loading: profilesLoading }] = useAxios<
    PagedResponse<Profile>
  >({
    url: '/profiles',
    params,
  });
  const { items: profiles } = profileData ?? {};
  const [profileIndex, setProfileIndex] = useState(0);
  const handleLike = () => console.log('logging');
  const likeBtn = (
    <Button
      className="btn-outline-danger"
      onClick={handleLike}
      style={{
        width: '48px',
        height: '48px',
      }}
    >
      <HeartFill />
    </Button>
  );

  return (
    <div>
      {!profilesLoading && profiles && (
        <>
          <ProfileDetails
            profile={profiles[profileIndex]}
            actionBtn={likeBtn}
          />
          <Container>
            <PrevNextButtons
              nextHidden={profileIndex === profiles.length - 1}
              nextIcon={<ArrowRight className="ms-1" />}
              onNextClick={() => setProfileIndex(profileIndex + 1)}
              onPrevClick={() => setProfileIndex(profileIndex - 1)}
              prevHidden={profiles[profileIndex] === profiles[0]}
              prevIcon={<ArrowLeft className="me-1" />}
            />
          </Container>
        </>
      )}
    </div>
  );
}
