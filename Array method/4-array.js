// join
let cars = ["BMW", "Audi", "Tesla", "Toyota", "Honda", "Mercedes"];

console.log("cars :", cars);

// join() combines all array elements into a string
console.log("join :", cars.join(" - "));

console.log(" ");


// slice
// slice() returns selected elements from an array
console.log("slicing :", cars.slice(1, 4));

console.log(" ");

// flat

// flat() converts a nested array into a single array

let numbers = [
    [10, 20],
    [30, 40],
    [50, 60]
];

console.log(numbers);

console.log("flat :", numbers.flat());

numbers = [
    [10, 20, [30, 40, [50, 60]]],
    [70, 80, [90, 100, [110, 120]]]
];

// flat(Infinity) flattens all nested levels
console.log("flat :", numbers.flat(Infinity));

console.log(" ");

// some
// some() checks if at least one element matches the condition

let carPrices = [10, 20, 30, 40, 70, 60, 80];

let somePrice = carPrices.some((price) => {
    return price > 50;
});

console.log("some :", somePrice);

console.log(" ");


// reverse
// reverse() reverses the order of array elements

console.log("reverse :", cars.reverse());

console.log(" ");


// values
// values() returns an iterator containing all array values

const carValues = cars.values();

for (let value of carValues) {
    console.log("value :", value);
}