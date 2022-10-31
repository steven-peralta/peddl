import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../../components/Profiles/UserProfilesStyles.css';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { PagedResponse, Profile } from '@peddl/common';
import useAxios from 'axios-hooks';
import ProfileDetails from '../../components/Profiles/ProfileDetails';
import PrevNextButtons from '../../components/PrevNextButtons';

export default function ProfilesPage() {
  const [{ data: profileData, loading: profilesLoading }] =
    useAxios<PagedResponse<Profile>>('/profiles');
  const { items: profiles } = profileData ?? {};
  const [profileIndex, setProfileIndex] = useState(0);

  return (
    <div>
      {!profilesLoading && profiles && (
        <>
          <ProfileDetails profile={profiles[profileIndex]} />
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
