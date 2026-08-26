

// reduce
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

console.log(number);

// loop

let sumUsingLoop = 0;

for (let i = 0; i < number.length; i++) {
    sumUsingLoop += number[i]
}

console.log("sum using loop", sumUsingLoop);


// reduce

let sum = number.reduce((a, b) => {
  return a + b
});

console.log("sum Of Numbers : " + sum);