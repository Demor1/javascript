// async function greet() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Hello world");
//     }, 1000);
//   });
// }

// greet().then((msg) => console.log(msg));

async function badFunc() {
    throw new Error("Помилка")
}

async function run() {
    try {
        const result = await badFunc()
        console.log(result)
    } catch(error) {
        console.error("Знайдено помилку в catch", error.message)
    }

}

run()