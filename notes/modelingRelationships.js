//Using Refences (Normalization)
let author = {
  name: "Austin",
};

let course = {
  author: "id",
  //   authors: ["id1", "id2"],
};

//Using Embedded Documents (DeNormalization)
let course = {
  author: {
    name: "Austin",
  },
};

// Hybrid
let author = {
  name: "Austin",
  // 50 other properties
};

let course = {
  author: {
    id: "ref of author",
    name: "Austin",
  },
};
