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

describe('Login Test', () => {
  it("/login should return \'404 Not Found\' with get request", (done: any) => {
    request(app)
      .get("/login")
      .expect("Content-Type", 'text/html; charset=utf-8')
      .expect(404)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it("/login should return \'404 Not Found\' with put request", (done: any) => {
    request(app)
      .put("/login")
      .expect("Content-Type", 'text/html; charset=utf-8')
      .expect(404)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it("/login should return \'400 Bad Request\' with wrong body", (done: any) => {
    request(app)
      .post("/login")
      .send({
        email: 'ebubekir@mail.com',
      })
      .expect("Content-Type", 'application/json; charset=utf-8')
      .expect(400)
      .end((err:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it("/login should return \'200 Ok\' with correct \'email\' and \'password\'", (done: any) => {
    request(app)
      .post("/login")
      .send({
        email: 'ebubekir@mail.com',
        password: 'testPassword'
      })
      .expect("Content-Type", 'application/json; charset=utf-8')
      .expect(200)
      .end((err: any, res: any) => {
        const { statusCode, body } = res;
        const { user, message } = body;
        expect(statusCode).toEqual(200);
        expect(message).toEqual('ok.');
        expect(user.name).toEqual('Ebubekir');
        expect(user.email).toEqual('ebubekir@mail.com');
        expect(user.token).not.toBeNull();
        expect(user.token).not.toBeUndefined();
        expect(user.refreshToken).not.toBeNull();
        expect(user.refreshToken).not.toBeUndefined();
        if (err) return done(err);
        return done();
      });
  });

  it("/login should return error message with incorrect \'email\' or \'password\'", (done: any) => {
    request(app)
      .post("/login")
      .send({
        email: 'ebubekir@mail.com',
        password: 'testPasswordWrong'
      })
      .expect("Content-Type", 'application/json; charset=utf-8')
      .expect(200)
      .end((err: any, res: any) => {
        const { statusCode, body } = res;
        const { message } = body;
        expect(statusCode).toEqual(200);
        expect(message).toEqual('email or password is wrong.');
        if (err) return done(err);
        return done();
      });
  });
});
