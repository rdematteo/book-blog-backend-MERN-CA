const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
    if (err) return console.log(`database not connected with ${err} 😩`);
    console.log("connected to mongodb ✅");
  });  
})

describe('testing reviews', () => {
  test("testing '/reviews' endpoint", async () => {
    const response = await request(app).get('/reviews')
    expect(response.status).toBe(200)
  })
})

afterAll(async () => {
  const db = mongoose.connection
  db.close()
})