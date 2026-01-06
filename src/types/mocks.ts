import { Request, Response } from "express";

export const mockRequest = <T = unknown>(
  overrides: Partial<Request> = {},
): Request =>
  ({
    body: {} as T,
    params: {},
    query: {},
    user: undefined,
    ...overrides,
  }) as Request;

export const mockNext = jest.fn();

export const mockResponse = (): jest.Mocked<Response> =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as jest.Mocked<Response>;
