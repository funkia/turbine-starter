import { go, combine } from "@funkia/jabz";
import { runComponent, elements, modelView } from "@funkia/turbine";
import { Behavior, Stream, sample, scan } from "@funkia/hareactive";
const { p, div, h1, button } = elements;

type ViewInput = {
  count: Behavior<number>;
};

function* counterModel({ increment, decrement }: ModelInput) {
  const count = yield sample(
    scan((n, m) => n + m, 0, combine(increment, decrement))
  );
  return { count };
}

function counterView({ count }: ViewInput) {
  return div([
    button(" + ").output({ incrementClick: "click" }),
    " ",
    count,
    " ",
    button(" - ").output({ decrementClick: "click" })
  ]).output(({ incrementClick, decrementClick }) => ({
    increment: incrementClick.mapTo(1),
    decrement: decrementClick.mapTo(-1)
  }));
}

type ModelInput = {
  increment: Stream<number>;
  decrement: Stream<number>;
};

const counter = modelView(counterModel, counterView);

const main = go(function*() {
  yield h1("Welcome to the Turbine starter kit!");
  yield p("Below is a counter.");
  yield counter();
});

runComponent("#mount", main);
