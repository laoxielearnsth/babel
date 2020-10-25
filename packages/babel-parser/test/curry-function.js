import { parse } from "../lib";

function getParse(code) {
  return () => parse(code, { sourceType: "module" });
}

describe("curry function syntax", function () {
  it("should parse", function () {
    expect(getParse(`function @@ foo() {}`)()).toMatchSnapshot();
  });
});
