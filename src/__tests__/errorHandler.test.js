const { AppError, errorHandler } = require('../middlewares/errorHandler');

describe('AppError', () => {
  it('should create an operational error with statusCode', () => {
    const err = new AppError('Not found', 404);
    expect(err.message).toBe('Not found');
    expect(err.statusCode).toBe(404);
    expect(err.isOperational).toBe(true);
  });
});

describe('errorHandler middleware', () => {
  const mockReq = { path: '/test', method: 'GET' };
  const mockNext = jest.fn();

  it('should return operational error message and statusCode', () => {
    const err = new AppError('Resource not found', 404);
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: 'Resource not found', statusCode: 404 },
    });
  });

  it('should mask non-operational errors with generic message', () => {
    const err = new Error('DB connection failed');
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: 'Internal server error', statusCode: 500 },
    });
  });
});
