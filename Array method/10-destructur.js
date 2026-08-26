// Object Destructuring

const car = {
  name: "BMW",
  color: "Black",
  price: 5000000,
};

// Access object properties using dot notation
console.log(car.name);

// Access object properties using bracket notation
console.log(car["color"]);

// Object destructuring
const { name, color, price } = car;

// Print destructured values
console.log(name);
console.log(color);
console.log(price);