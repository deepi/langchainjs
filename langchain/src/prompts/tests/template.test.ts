import { expect, test, describe } from "@jest/globals";
import { interpolateFString, interpolateHbs } from "../template.js";

describe("template", () => {
  describe.each([
    ["{foo}", { foo: "bar" }, "bar"],
    ["pre{foo}post", { foo: "bar" }, "prebarpost"],
    ["{{pre{foo}post}}", { foo: "bar" }, "{prebarpost}"],
    ["text", {}, "text"],
    ["}}{{", {}, "}{"],
    ["{first}_{second}", { first: "foo", second: "bar" }, "foo_bar"],
  ])("Valid f-string", (template, variables, result) => {
    test(`Interpolation works: ${template}`, () => {
      expect(interpolateFString(template, variables)).toBe(result);
    });
  });

  describe.each([
    ["{", {}],
    ["}", {}],
    ["{foo", {}],
    ["foo}", {}],
  ])("Invalid f-string", (template, variables) => {
    test(`Interpolation throws: ${template}`, () => {
      expect(() => interpolateFString(template, variables)).toThrow();
    });
  });

  describe.each([
    ["{{foo}}", { foo: "bar" }, "bar"],
    ["pre{{foo}}post", { foo: "bar" }, "prebarpost"],
    ["{pre{{foo}}post}", { foo: "bar" }, "{prebarpost}"],
    ["text", {}, "text"],
    ["{{first}}_{{second}}", { first: "foo", second: "bar" }, "foo_bar"],
    ["foo}}", {}, "foo}}"],
    ["}}", {}, "}}"],
  ])("Valid hbs", (template, variables, result) => {
    test(`Interpolation works: ${template}`, () => {
      expect(interpolateHbs(template, variables)).toBe(result);
    });
  });

  describe.each([
    ["{{", {}],
    ["{{foo", {}],
    ["}}{{", {}],
  ])("Invalid hbs", (template, variables) => {
    test(`Interpolation throws: ${template}`, () => {
      expect(() => interpolateHbs(template, variables)).toThrow();
    });
  });
});
