import { HTTPStatus } from '@peddl/common';

export default class APIError extends Error {
  public readonly httpStatus: HTTPStatus;

  constructor(httpCode: HTTPStatus, description: string) {
    super(description);
    this.httpStatus = httpCode;
    Error.captureStackTrace(this);
  }
}
