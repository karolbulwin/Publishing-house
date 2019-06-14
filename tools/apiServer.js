/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const pause = require("connect-pause");
const getUrl = require("./goodreadsService");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(pause(500));

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/books/", async function(req, res, next) {
  const error = validateBook(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.title.concat(new Date().valueOf())); // Generate a slug for new books.
    const result = await getUrl(req.body.title, req.body.authorName);
    if (result.error === null && result.url !== "") {
      req.body.url = result.url;
      delete req.body.authorName;
      next();
    } else {
      res.status(400).send(result.error);
    }
  }
});

server.post("/authors/", function(req, res, next) {
  const error = validateAuthor(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.name.concat(new Date().valueOf())); // Generate a slug for new author.
    next();
  }
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateBook(book) {
  if (!book.title) return "Title is required.";
  if (!book.authorId) return "Author is required.";
  if (!book.category) return "Category is required.";
  return "";
}

function validateAuthor(author) {
  if (!author.name) return "Name is required.";
  return "";
}
