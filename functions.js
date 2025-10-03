Завдання 1

function sum(a, b) {
    let result = a + b
    console.log(`Результат: ${result}`)
    
    return result
}

sum(5, 10)

Завдання 2

function line(str) {
    if (typeof str === "string") {
        return str.toUpperCase();
    } else {
        return "Error, waiting for string";
    }
}

console.log(line("hello"))

Завдання 3

function squareArray(arr) {
    return arr.map(function(num){
        return num * num
    })
}

let num = [2, 4, 5, 7, 8]
let squared = squareArray(num)

console.log(squared)

Варіант 2

function square(array) {
    let result = []
    for(let i = 0; i < array.length; i++) {
        result.push(array[i] * array[i])
    }
    return result
}

let numbers = [2, 3, 5, 7, 12]
let squared = square(numbers)

console.log(squared)



