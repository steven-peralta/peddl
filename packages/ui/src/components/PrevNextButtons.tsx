import { Button, Spinner } from 'react-bootstrap';
import React from 'react';

type PrevNextButtonsProps = {
  onNextClick: () => void;
  onPrevClick: () => void;
  nextHidden?: boolean;
  prevHidden?: boolean;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
  nextText?: string;
  prevText?: string;
  nextLoading?: boolean;
  nextVariant?: string;
  nextIcon?: JSX.Element;
  prevIcon?: JSX.Element;
};

export default function PrevNextButtons({
  onNextClick,
  onPrevClick,
  nextHidden,
  prevHidden,
  nextDisabled,
  prevDisabled,
  nextText,
  prevText,
  nextLoading,
  nextVariant,
  nextIcon,
  prevIcon,
}: PrevNextButtonsProps) {
  const justification = nextHidden
    ? 'justify-content-start'
    : prevHidden
    ? 'justify-content-end'
    : 'justify-content-between';
  return (
    <div className={`d-flex ${justification} mb-3`}>
      <Button
        disabled={prevDisabled}
        onClick={onPrevClick}
        style={{ display: prevHidden ? 'none' : undefined }}
        variant="secondary"
      >
        {prevIcon}
        {prevText || 'Back'}
      </Button>
      <Button
        disabled={nextDisabled}
        onClick={onNextClick}
        style={{ display: nextHidden ? 'none' : undefined }}
        variant={nextVariant || 'primary'}
      >
        {nextLoading && (
          <Spinner
            animation="border"
            aria-hidden="true"
            as="span"
            className="me-2"
            role="status"
            size="sm"
          />
        )}
        {nextIcon}
        {nextText || 'Next'}
      </Button>
    </div>
  );
}
