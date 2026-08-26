
// index of

let fruits =["apple", "Pineapple", "banana", "strawberry", "Mango","kiwi", "papaya" ]

console.log("index of kiwi :", fruits.indexOf("kiwi"))

// includes

console.log("Mango :",fruits.includes("Mango"))

console.log("watermelon :",fruits.includes("watermelon"))

// sort

let alphabet = ["a", "b", "c", "f", "e", "d" ]

console.log("alphabet : ", alphabet.sort());

let num = [1, 5, 3, 7, 2, 4, 6, 9, 8]
console.log("number : ", num.sort());


console.log("ascending order : ", num.sort((a, b) => a - b));

console.log("descending order : ", num.sort((a, b) => b - a));
