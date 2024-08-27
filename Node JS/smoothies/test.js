let image = {
  name: "banana",
  path: "uploads/1702297439555.jpg",
};
console.log(image);

// cutting dirname from image.path
image.path = image.path.split("/")[1];

console.log(image);

const products = [
  { _id: 1123, image: "111" },
  { _id: 321, image: "222" },
];
console.log(products.filter((product) => product._id == "321"));
