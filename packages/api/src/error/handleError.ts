import { Response, Request, NextFunction } from 'express';
import { ErrorResponse, HTTPStatus } from '@peddl/common';
import APIError from './APIError';

const handleError = (
  error: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  if (error instanceof APIError) {
    res.status(error.httpStatus).json({ error: error.message });
  } else {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
  next(error);
};

export default handleError;
