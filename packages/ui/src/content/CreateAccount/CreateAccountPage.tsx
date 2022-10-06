import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Content from '../../components/Content';
import NewProfileStep from './NewProfileStep';
import UploadMediaStep from './UploadMediaStep';
import SearchSettingsStep from './SearchSettingsStep';

const enum CreateAccountSteps {
  NewProfile,
  UploadMedia,
  SearchSettings,
}

const getPageTitle = (currentStep: CreateAccountSteps) => {
  switch (currentStep) {
    case CreateAccountSteps.NewProfile:
      return 'New Profile';
    case CreateAccountSteps.UploadMedia:
      return 'Upload Media';
    case CreateAccountSteps.SearchSettings:
      return 'Search Settings';
    default:
      return 'New Profile';
  }
};

export default function CreateAccountPage() {
  const [step, setStep] = useState<CreateAccountSteps>(
    CreateAccountSteps.NewProfile
  );

  const renderStep = () => {
    switch (step) {
      case CreateAccountSteps.NewProfile:
        return <NewProfileStep />;
      case CreateAccountSteps.UploadMedia:
        return <UploadMediaStep />;
      case CreateAccountSteps.SearchSettings:
        return <SearchSettingsStep />;
      default:
        return <NewProfileStep />;
    }
  };

  return (
    <Content title={getPageTitle(step)}>
      <>
        {renderStep()}
        <div className="d-flex justify-content-between mb-3">
          <Button
            variant="secondary"
            type="submit"
            onClick={() => setStep(step > 0 ? step - 1 : step)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => setStep(step < 3 ? step + 1 : step)}
          >
            Next
          </Button>
        </div>
      </>
    </Content>
  );
}
