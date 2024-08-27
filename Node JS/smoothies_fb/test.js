let image = {
    name: "banana",
    path: "uploads/1702297439555.jpg",
};
console.log(image);

// cutting dirname from image.path
image.path = image.path.split("/")[1];

console.log(image);
