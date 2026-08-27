const request = require('supertest');
const app = require('../app');

describe('requestLogger middleware', () => {
  it('should return 200 on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('should include service and environment in logger defaultMeta', () => {
    const { logger } = require('../middlewares/logger');
    expect(logger.defaultMeta).toHaveProperty('service');
    expect(logger.defaultMeta).toHaveProperty('environment');
  });
});
