const request = require("supertest");
const app = require("../index");


describe("Test Routes", () => {
  test("GET /", () => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
  });

});

describe('Signup Test', () => {
  it("/signup should return \'404 Not Found\' with get request", (done: any) => {
    request(app)
      .get("/signup")
      .expect("Content-Type", 'text/html; charset=utf-8')
      .expect(404)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it("/signup should return \'404 Not Found\' with post request", (done: any) => {
    request(app)
      .post("/signup")
      .expect("Content-Type", 'text/html; charset=utf-8')
      .expect(404)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it("/signup should return \'400 Bad Request\' with wrong payload", (done: any) => {
    request(app)
      .put("/signup")
      .send({
        "name": "Ebubekir",
        "email": "ebubekir@mail.com",
      })
      .expect("Content-Type", 'application/json; charset=utf-8')
      .expect(400)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it("/signup should return \'400 Bad Request\' with wrong payload", (done: any) => {
    request(app)
      .put("/signup")
      .send({
        name: 'Ebubekir',
        email: 'ebubekir@mail.com',
      })
      .expect("Content-Type", 'application/json; charset=utf-8')
      .expect(400)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it("/signup should return \'400 Bad Request\' with wrong payload", (done: any) => {
    request(app)
      .put("/signup")
      .send({
        name: 'Ebubekir',
        email: 'ebubekir@mail.com',
        password: 'testPassword'
      })
      .expect("Content-Type", 'application/json; charset=utf-8')
      .expect(400)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });
});
