import React, { ChangeEvent, useRef } from 'react';
import './UploadMediaBox.scss';
import { PlusLg, Trash3 } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

export type UploadMediaBoxProps = {
  enabled?: boolean;
  image?: HTMLImageElement;
  onUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
  showTrashButton?: boolean;
  onClickTrash?: () => void;
};

export default function UploadMediaBox({
  image,
  onUpload,
  enabled,
  showTrashButton,
  onClickTrash,
}: UploadMediaBoxProps) {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (enabled) {
      inputFile?.current?.click();
    }
  };

  return (
    <div>
      {showTrashButton && (
        <Button
          onClick={onClickTrash}
          style={{ position: 'absolute' }}
          type="button"
          variant="link"
        >
          <Trash3 style={{ color: 'gray' }} />
        </Button>
      )}
      <button className="upload-box" onClick={onClick} type="button">
        <input
          ref={inputFile}
          id="file"
          onChange={onUpload}
          style={{ display: 'none' }}
          type="file"
        />

        {image && <img alt="Uploaded" className="image" src={image.src} />}
        {enabled && !image && <PlusLg />}
      </button>
    </div>
  );
}
