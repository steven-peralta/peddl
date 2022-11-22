import React from 'react';
import { GearFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Gender, Location, Profile } from '@peddl/common';
import ProfileDetails from '../components/Profiles/ProfileDetails';

const testProfile: Profile = {
  lastUpdated: new Date(),
  createdAt: new Date(),
  createdBy: 'sdg',
  name: 'test',
  birthday: new Date(),
  location: Location.AustinTX,
  gender: Gender.Man,
};

export default function ViewProfilePage() {
  const navigate = useNavigate();
  const gearButton = (
    <Button
      className="btn-outline-secondary"
      onClick={() => {
        navigate('/userProfiles');
      }}
      style={{
        width: '48px',
        height: '48px',
        background: '#6c757d',
      }}
    >
      <GearFill style={{ color: 'white' }} />
    </Button>
  );

  return (
    <div>
      <ProfileDetails actionBtn={gearButton} profile={testProfile} />
    </div>
  );
}
