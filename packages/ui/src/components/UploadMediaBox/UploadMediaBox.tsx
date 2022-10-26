import React, { ChangeEvent, useRef } from 'react';
import './UploadMediaBox.scss';
import { PlusLg } from 'react-bootstrap-icons';

export type UploadMediaBoxProps = {
  disabled?: boolean;
  image?: HTMLImageElement;
  onUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadMediaBox({
  image,
  onUpload,
  disabled,
}: UploadMediaBoxProps) {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (!disabled) {
      inputFile?.current?.click();
    }
  };

  return (
    <button className="upload-box" onClick={onClick} type="button">
      <input
        ref={inputFile}
        id="file"
        onChange={onUpload}
        style={{ display: 'none' }}
        type="file"
      />
      {image && <img alt="Uploaded" className="image" src={image.src} />}
      {!disabled && !image && <PlusLg />}
    </button>
  );
}
