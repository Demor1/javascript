Завдання 1, 2

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 200);
});

promise.then((value) => {
  console.log(value);
});

Завдання 3

// const secondPromise = new Promise((resolve, reject) => {
//   reject("Це помилка")
// })

// secondPromise.then((result) => console.log("Результат:", result))
// secondPromise.catch((error) => console.error("Помилка:", error))