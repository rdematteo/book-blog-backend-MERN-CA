const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
    if (err) return console.log(`database not connected with ${err} 😩`);
    console.log("connected to mongodb ✅");
  });  
})


  test("testing '/reviews' endpoint", async () => {
    const response = await request(app).get('/reviews')
    expect(response.status).toBe(200)
  })
  test("testing '/review/title/harry potter' endpoint for book which exists", async () => {
    const resp = await request(app).get('/review/title/harry potter');
    expect(resp.body.length).toBe(1);
    expect(resp.body[0].title).toBe("harry potter");
  })
  test("testing endpoint for book which doesn't exist", async () => {
    const resp = await request(app).get('/review/title/non existent harry potter');
    expect(resp.body.length).toBe(0);
  })
  test("testing database has atleast one book", async () => {
    const resp = await request(app).get('/reviews');
    expect(resp.body.reviews.length).toBe;
  })
test("testing register user", async () => {
  const body = {email: "myemail@gamil.com", password: "1234"}
  const resp = await request(app).post('/auth/register').send(body);

  expect(resp.status).toBe(200);
  expect(resp.body.token).not.toBe(null);
})

test("testing register user with user who exist already", async () => {
  const body = {email: "myemail@gamil.com", password: "1234"}
  const resp = await request(app).post('/auth/register').send(body);

  expect(resp.status).toBe(403);
})


afterAll(async () => {
  const db = mongoose.connection
  db.close()
})