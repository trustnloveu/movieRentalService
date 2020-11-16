const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // author: {
    //   type: authorSchema,
    //   required: true,
    // },
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Yang Euijin",
      },
      // $unset: {
      //   author: "",
      // },
    }
  );
  // course.author.name = "Austin Yang";
  // course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function addAuthors(courseId, authors) {
  const course = await Course.findById(courseId);
  course.authors.push(...authors);
  // course.authors = [...course.authors, ...authors];
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Austin" }),
//   new Author({ name: "Euijin" }),
// ]);

// addAuthor("5fa76f3acb79d23bf0011f25", new Author({ name: "Programmer1" }));

// addAuthors("5fa76f3acb79d23bf0011f25", [
//   new Author({ name: "Programmer1" }),
//   new Author({ name: "Programmer2" }),
// ]);

// updateAuthor("5fa769dd61f4c304549a179f");

// removeAuthor("5fa76f3acb79d23bf0011f25", "5fa772aad41d461e14ea4be3");
