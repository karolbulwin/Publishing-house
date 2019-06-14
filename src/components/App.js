import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import BooksPage from "./books/BooksPage";
import ManageBookPage from "./books/ManageBookPage"; // eslint-disable-line import/no-named-as-default
import AuthorsPage from "./authors/AuthorsPage";
import ManageAuthorPage from "./authors/ManageAuthorPage"; // eslint-disable-line import/no-named-as-default
import BooksCounter from "./books/BooksCounter";
import AuthorCounter from "./authors/AuthorCounter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App-styles";

function App() {
  return (
    <div style={styles}>
      <Header />
      <BooksCounter />
      <br />
      <AuthorCounter />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/books" component={BooksPage} />
        <Route path="/book/:slug" component={ManageBookPage} />
        <Route path="/book" component={ManageBookPage} />
        <Route path="/authors" component={AuthorsPage} />
        <Route path="/author/:slug" component={ManageAuthorPage} />
        <Route path="/author" component={ManageAuthorPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
