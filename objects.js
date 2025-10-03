const book = {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960
}

book.genre = "Fiction";
delete book.year;

console.log(book);