const books = [
  {
    id: 1,
    title: "The Hunger Games",
    slug: "the-hunger-games",
    category: "Fantasy",
    authorId: 1,
    url: "https://www.goodreads.com/book/show/2767052-the-hunger-games"
  },
  {
    id: 2,
    title: "Harry Potter and Order of the Phoenix",
    slug: "harry-potter-and-order-of-the-phoenix",
    category: "Fantasy",
    authorId: 2,
    url:
      "https://www.goodreads.com/book/show/2.Harry_Potter_and_the_Order_of_the_Phoenix"
  },
  {
    id: 3,
    title: "To Kill Mockingbird",
    slug: "to-kill-mockingbird",
    category: "Classics",
    authorId: 3,
    url: "https://www.goodreads.com/book/show/2657.To_Kill_a_Mockingbird"
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    slug: "pride-and-prejudice",
    category: "Classics",
    authorId: 4,
    url: "https://www.goodreads.com/book/show/1885.Pride_and_Prejudice"
  },
  {
    id: 5,
    title: "Twilight",
    slug: "twilight",
    category: "Fantasy",
    authorId: 5,
    url: "https://www.goodreads.com/book/show/41865.Twilight"
  },
  {
    id: 6,
    title: "The Book Thief",
    slug: "the-book-thief",
    category: "Historical Fiction",
    authorId: 6,
    url: "https://www.goodreads.com/book/show/19063.The_Book_Thief"
  },
  {
    id: 7,
    title: "The Chronicles of Narnia",
    slug: "the-chronicles-of-narnia",
    category: "Fantasy",
    authorId: 7,
    url:
      "https://www.goodreads.com/book/show/100915.The_Lion_the_Witch_and_the_Wardrobe"
  },
  {
    id: 8,
    title: "Animal Farm",
    slug: "animal-farm",
    category: "Classics",
    authorId: 8,
    url: "https://www.goodreads.com/book/show/170448.Animal_Farm"
  }
];

const authors = [
  { id: 1, name: "Suzanne Collins", slug: "suzanne-collins" },
  { id: 2, name: "J. K. Rowling", slug: "j-k-rowling" },
  { id: 3, name: "Harper Lee", slug: "harper-lee" },
  { id: 4, name: "Jane Austen", slug: "jane-austen" },
  { id: 5, name: "Stephenie Meyer", slug: "stephenie-meyer" },
  { id: 6, name: "Mark Zusak", slug: "mark-zusak" },
  { id: 7, name: "C. S. Lewis", slug: "c-s-lewis" },
  { id: 8, name: "George Orwell", slug: "george-orwell" }
];

const newBook = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

const newAuthor = {
  id: null,
  name: ""
};

module.exports = {
  newBook,
  newAuthor,
  books,
  authors
};
