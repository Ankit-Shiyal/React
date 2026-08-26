// filter()

// filter() creates a new array with elements that match a condition

const carPrices = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

console.log("car prices :", carPrices);

// Filter car prices greater than 50
const expensiveCars = carPrices.filter((price) => price > 50);

console.log("expensive car prices :", expensiveCars);

console.log(" ");


// Filter cars based on their price

const cars = [
  { name: "BMW", price: 80, country: "Germany" },
  { name: "Audi", price: 70, country: "Germany" },
  { name: "Tesla", price: 60, country: "USA" },
  { name: "Toyota", price: 40, country: "Japan" },
  { name: "Honda", price: 30, country: "Japan" }
];

console.log("cars :", cars);

// Filter cars with a price greater than or equal to 50
const expensiveCarList = cars.filter((car) => car.price >= 50);

console.log("expensive cars :", expensiveCarList);