import React, { ChangeEvent } from 'react';
import UploadMediaBox from './UploadMediaBox/UploadMediaBox';
import convertToImageElement from '../utils/convertToImageElement';
import { ReactState } from '../utils/types';

export type UploadMediaFormsProps = {
  imageState: ReactState<HTMLImageElement[]>;
  fileState: ReactState<File[]>;
  boxEnabledState: ReactState<boolean[]>;
  validationTextState: ReactState<string>;
};

export default function MediaUploadGrid({
  imageState: [images, setImages],
  fileState: [imageFiles, setImageFiles],
  boxEnabledState: [uploadBoxEnabled, setUploadBoxEnabled],
  validationTextState: [uploadValidationText, setUploadValidationText],
}: UploadMediaFormsProps) {
  const handleTrashButton = (gridPos: number) => {
    return () => {
      images.splice(gridPos, 1);
      setImages([...images]);
      uploadBoxEnabled.splice(gridPos, 1);
      setUploadBoxEnabled([...uploadBoxEnabled]);
      imageFiles.splice(gridPos, 1);
      setImageFiles([...imageFiles]);

      if (imageFiles.length === 0) {
        setUploadValidationText('You need at least one photo.');
      }
    };
  };

  const handleUpload = (gridPos: number) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        convertToImageElement(file)
          .then((img) => {
            if (img) {
              images[gridPos] = img;
              setImages([...images]);
              uploadBoxEnabled[gridPos + 1] = true;
              setUploadBoxEnabled([...uploadBoxEnabled]);
              imageFiles[gridPos] = file;
              setImageFiles([...imageFiles]);
              setUploadValidationText('');
            }
          })
          .catch((err: Error) => {
            console.error(err);
          });
      }
    };
  };

  return (
    <div className="mb-3">
      <h2 className="mb-3">Media</h2>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-row justify-content-center mt-0">
          <UploadMediaBox
            enabled={uploadBoxEnabled[0]}
            image={images[0]}
            onClickTrash={handleTrashButton(0)}
            onUpload={handleUpload(0)}
            showTrashButton={!!images[0]}
          />

          <UploadMediaBox
            enabled={uploadBoxEnabled[1]}
            image={images[1]}
            onClickTrash={handleTrashButton(1)}
            onUpload={handleUpload(1)}
            showTrashButton={!!images[1]}
          />

          <UploadMediaBox
            enabled={uploadBoxEnabled[2]}
            image={images[2]}
            onClickTrash={handleTrashButton(2)}
            onUpload={handleUpload(2)}
            showTrashButton={!!images[2]}
          />
        </div>
        <div className="d-flex flex-row justify-content-center mt-3">
          <UploadMediaBox
            enabled={uploadBoxEnabled[3]}
            image={images[3]}
            onClickTrash={handleTrashButton(3)}
            onUpload={handleUpload(3)}
            showTrashButton={!!images[3]}
          />

          <UploadMediaBox
            enabled={uploadBoxEnabled[4]}
            image={images[4]}
            onClickTrash={handleTrashButton(4)}
            onUpload={handleUpload(4)}
            showTrashButton={!!images[4]}
          />

          <UploadMediaBox
            enabled={uploadBoxEnabled[5]}
            image={images[5]}
            onClickTrash={handleTrashButton(5)}
            onUpload={handleUpload(5)}
            showTrashButton={!!images[5]}
          />
        </div>
      </div>
      {uploadValidationText && (
        <small className="text-danger">{uploadValidationText}</small>
      )}
    </div>
  );
}
