// map() with cars

let cars = ["BMW", "Audi", "Tesla", "Toyota", "Honda"];

console.log("cars :", cars);

// map() creates a new array with each car name
let carArray = cars.map((car) => {
    return car;
});

console.log("car array :", carArray);



// map() creates a new array by applying a function to each element

let carPrices = [10, 20, 30, 40, 50];

console.log("car prices :", carPrices);

// Add 10 to each car price using map()
let updatedPrices = carPrices.map((price) => price + 10);

console.log("updated prices :", updatedPrices);

console.log(" ");