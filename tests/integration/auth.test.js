const request = require("supertest");
const { Genre } = require("../../models/gerne");
const { User } = require("../../models/user");

let server;

describe("auth middleware", () => {
  //before
  beforeEach(() => {
    token = new User().generateAuthToken();
    server = require("../../index");
  });

  //after
  afterEach(async () => {
    await Genre.deleteMany({});
    await server.close();
  });

  let token;

  const exec = async () => {
    return await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  //   beforeEach(() => {
  //     token = new User().generateAuthToken();
  //   });

  // No token ( = empty - because whatever you pass, it'll be stringified)
  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  // Invalid token
  it("should return 401 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  // Valid token
  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
