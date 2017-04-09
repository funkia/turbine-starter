import {map, go} from "jabz";
import {runMain, elements} from "@funkia/funnel";
const {span, input, div, h1} = elements;

const isValidEmail = (s: string) => s.match(/.+@.+\..+/i);

const main = go(function*() {
  yield h1("Hello, World!")
  yield span("Please enter an email address: ");
  const {inputValue: email} = yield input();
  const isValid = map(isValidEmail, email);
  yield div([
    "The address is ", map((b) => b ? "valid" : "invalid", isValid)
  ]);
});

// `runMain` should be the only impure function in application code
runMain("#mount", main);
