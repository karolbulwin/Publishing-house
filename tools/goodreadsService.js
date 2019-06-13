const axios = require("axios");
const xml2js = require("xml2js");
const key = require("../.env");

const parser = xml2js.Parser({ explicitArray: false });

async function getUrl(title, author) {
  const yourKey = key; // get it from Goodreads
  const authorToArray = author.split(" ");
  const authorLast = authorToArray[authorToArray.length - 1];
  const newTitle = title.replace(/ /g, "+");
  const result = { url: "", error: null };
  try {
    await axios
      .get(
        `https://www.goodreads.com/book/title.xml?author=${authorLast}&key=${yourKey}&title=${newTitle}`
      )
      .then(response => {
        parser.parseString(response.data, (err, res) => {
          if (err) {
            console.error("Error", err);
            result.error = err;
          } else {
            console.error(
              "res.GoodreadsResponse.book.url",
              res.GoodreadsResponse.book.url
            );
            result.url = res.GoodreadsResponse.book.url;
          }
        });
      });
  } catch (error) {
    if (error.response) {
      result.error = error.response.statusText;
    } else if (error.request) {
      result.error = error.request.statusText;
    } else {
      result.error = error.message;
    }
  }

  return result;
}

module.exports = getUrl;
