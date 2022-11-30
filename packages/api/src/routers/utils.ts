import { Request } from 'express';

export type APIRequest<T> = Request<Record<string, string>, unknown, T>;
