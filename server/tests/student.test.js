const axios = require('axios');
const app = require('../router/student.router');
const mongoose = require('mongoose');
const request = require('supertest');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Student Router Endpoints', () => {
  it('POST /signup - responds with 404 if user does not exist', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ id: 'XA5305', password: 'password123' });

    expect(res.status).toBe(404);
  });

  it('POST /signin - responds with 404 if user does not exist', async () => {
    const res = await request(app)
      .post('/signin')
      .send({ id: 'XA5305', password: 'password123' });

    expect(res.status).toBe(404);
  });

  it('POST /uploadpayment - responds with 404 if student ID does not exist', async () => {
    const res = await request(app)
      .post('/uploadpayment')
      .attach('paymentReceipt', 'path/to/payment-receipt.pdf') // Attach a payment receipt file
      .field('id', 'XA5305'); // ID of non-existing student

    expect(res.status).toBe(404);
  });

  it('GET /grades - responds with 404 if student ID does not exist', async () => {
    const res = await request(app)
      .get('/grades')
      .send({ id: 'XA5305' });

    expect(res.status).toBe(404);
  });

  it('GET /courses - responds with 200 and an array of courses', async () => {
    const res = await request(app)
      .get('/courses');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
