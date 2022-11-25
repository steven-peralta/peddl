import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../components/ProfileDetails/ProfileDetails.css';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { PagedResponse } from '@peddl/common';
import useAxios from 'axios-hooks';
import PrevNextButtons from '../components/PrevNextButtons';
import { useAuth } from '../providers/AuthProvider';
import { useSettings } from '../providers/SettingsProvider';
import { getAuthHeader } from '../axiosInstance';
import ProfileView from '../components/ProfileView';

export default function ProfilesPage() {
  const {
    token: [token],
  } = useAuth();
  const { searchParams } = useSettings();

  const [{ data: profileIdData, loading: profileIdsLoading }] = useAxios<
    PagedResponse<{ createdBy: string }>
  >({
    url: `/profiles`,
    params: searchParams,
    headers: getAuthHeader(token),
  });

  const [index, setIndex] = useState(0);

  const { items: profileIds = [] } = profileIdData ?? {};

  return (
    <div style={{ marginTop: '60px' }}>
      {!profileIdsLoading && profileIds.length > 0 && (
        <>
          <ProfileView userId={profileIds[index].createdBy} />
          <Container>
            <PrevNextButtons
              nextHidden={index === profileIds.length - 1}
              nextIcon={<ArrowRight className="ms-1" />}
              onNextClick={() => setIndex(index + 1)}
              onPrevClick={() => setIndex(index - 1)}
              prevHidden={index === 0}
              prevIcon={<ArrowLeft className="me-1" />}
            />
          </Container>
        </>
      )}
    </div>
  );
}
