import { combineReducers } from "redux";
import books from "./bookReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  books,
  authors,
  apiCallsInProgress
});

export default rootReducer;
