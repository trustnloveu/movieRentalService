const mongoose = require("mongoose");
const { Rental } = require("../../models/rental");

let server;
let customerId;
let movieId;
let rental;

describe("/api/returns", () => {
  // before
  beforeEach(async () => {
    server = require("../../index");

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "movie title",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  // after
  afterEach(async () => {
    server.close();
    await Rental.deleteMany({});
  });

  it("should work", async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });
});
