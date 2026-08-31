// Cars Array - Using push(), unshift(), pop(), and shift()

let cars = ["BMW", "Audi", "Tesla", "Toyota"];

console.log("before array:", cars);

// Add a new car at the end of the array using push()
cars.push("Honda");

// Add a new car at the beginning of the array using unshift()
cars.unshift("Mercedes");

console.log("after adding:", cars);

console.log("before removing:", cars);

// Remove the last car using pop()
cars.pop();

// Remove the first car using shift()
cars.shift();

console.log("after removing:", cars);





// splice() is used to add, remove, and replace elements in an array

let fruits =["apple", "Pineapple", "banana", "strawberry", "Mango","kiwi", "papaya" ]

console.log("before splice",fruits.length)

fruits.splice(2, 0,"grapes");

console.log("added ", fruits)

fruits.splice(4,1,"guvava")
console.log("replace ", fruits)

fruits.splice(4,2)
console.log("remove ", fruits)

console.log("after splice",fruits.length)

