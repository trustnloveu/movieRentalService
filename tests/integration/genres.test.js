// Each time you make a change on your code, Jest is going to re-run your tests
// becasue it's going to load your server again > exception (port is running on 3000)
// So, you should load the server before, and close it after each test
const request = require("supertest");
const { Genre } = require("../../models/gerne");
const { User } = require("../../models/user");

let server;

describe("/api/genres", () => {
  // before > call the server
  beforeEach(() => {
    server = require("../../index");
  });

  // after > clean the server
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  // Get
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      //   expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  // Get with id
  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      // expect(res.body).toMatchObject(genre); // error because of ID
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });
  });

  // Post
  describe("POST /", () => {
    // initialize
    let token;
    let name;

    // response
    const exec = () => {
      return request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });
    };

    // before
    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is invalid - less then 3 characters", async () => {
      name = "12";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is invalid - more then 50 characters", async () => {
      name = new Array(52).join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      await exec();

      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });

    it("should return the genre if genre is valid", async () => {
      res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
