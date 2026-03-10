import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AllExceptionsFilter } from './http-exception.filter';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let mockArgumentsHost: ArgumentsHost;
  let mockResponse: any;
  let mockRequest: any;

  beforeEach(() => {
    filter = new AllExceptionsFilter();

    // Mock de objeto Request
    mockRequest = { url: '/api/v1/test' };

    // Mock de objeto Response
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Mock de ArgumentsHost
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as unknown as ArgumentsHost;
  });

  it('should catch HttpException (400) and format it correctly', () => {
    // NestJS normalmente envuelve el mensaje en un objeto si se pasa un objeto
    const exception = new HttpException({
      message: ['Bad Request Message'],
      error: 'Bad Request'
    }, HttpStatus.BAD_REQUEST);

    filter.catch(exception, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: ['Bad Request Message'],
        error: 'Bad Request',
        path: '/api/v1/test',
        timestamp: expect.any(String),
      }),
    );
  });

  it('should catch generic Error (500) and format it correctly', () => {
    const exception = new Error('Unexpected crash');

    filter.catch(exception, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        message: ['Unexpected crash'], 
        error: 'Internal Server Error',
        path: '/api/v1/test',
      }),
    );
  });

  it('should catch 404 Exception', () => {
    const exception = new HttpException({
      message: 'Not Found',
      error: 'Not Found'
    }, HttpStatus.NOT_FOUND);

    filter.catch(exception, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        message: ['Not Found'],
        error: 'Not Found',
      }),
    );
  });
});
