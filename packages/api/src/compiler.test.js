// SPDX-License-Identifier: MIT
import { parser } from "@graffiticode/parser";
import {
  Compiler,
  Renderer,
  lexicon as basisLexicon
} from "@graffiticode/basis";
import { Checker, Transformer } from "./compiler.js";
import { lexicon as l0170Lexicon } from "./lexicon.js";

const lexicon = { ...basisLexicon, ...l0170Lexicon };

function compile(src, data = {}) {
  return new Promise(async (resolve, reject) => {
    const code = await parser.parse(170, src, lexicon);
    const compiler = new Compiler({
      langID: "0170",
      version: "v0.0.0",
      Checker,
      Transformer,
      Renderer,
    });
    compiler.compile(code, data, {}, (err, val) => {
      if (err && err.length > 0) {
        reject(err);
      } else {
        resolve(val);
      }
    });
  });
}

describe("flatten", () => {
  test("flatten by string field name extracts nested scalar arrays", async () => {
    const result = await compile(
      'flatten "tags" [{name: "A", tags: ["x" "y"]}, {name: "B", tags: ["z"]}]..'
    );
    expect(result.result).toEqual([
      { name: "A", tags: "x" },
      { name: "A", tags: "y" },
      { name: "B", tags: "z" },
    ]);
  });

  test("flatten by field merges nested records with parent", async () => {
    const result = await compile(
      'flatten "items" [{order: 1, items: [{sku: "A1", qty: 2}]}, {order: 2, items: [{sku: "B3", qty: 1}]}]..'
    );
    expect(result.result).toEqual([
      { order: 1, sku: "A1", qty: 2 },
      { order: 2, sku: "B3", qty: 1 },
    ]);
  });

  test("flatten by depth flattens nested arrays", async () => {
    const result = await compile(
      'flatten 1 [[1 2] [3 4] [5]]..'
    );
    expect(result.result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("filter with in/nin", () => {
  test("filter with in keeps matching rows", async () => {
    const result = await compile(
      'filter {status: {in: ["active" "pending"]}} [{name: "A", status: "active"}, {name: "B", status: "inactive"}, {name: "C", status: "pending"}]..'
    );
    expect(result.result).toEqual([
      { status: "active", name: "A" },
      { status: "pending", name: "C" },
    ]);
  });

  test("filter with nin excludes matching rows", async () => {
    const result = await compile(
      'filter {status: {nin: ["inactive" "banned"]}} [{name: "A", status: "active"}, {name: "B", status: "inactive"}, {name: "C", status: "pending"}]..'
    );
    expect(result.result).toEqual([
      { status: "active", name: "A" },
      { status: "pending", name: "C" },
    ]);
  });
});

describe("mutate with round", () => {
  test("round returns a number, not a string", async () => {
    const result = await compile(
      'mutate {total: {add: ["a" "b"], round: 2}} [{a: 1.005, b: 2.005}]..'
    );
    expect(result.result).toEqual([{ a: 1.005, b: 2.005, total: 3.01 }]);
    expect(typeof result.result[0].total).toBe("number");
  });

  test("round with mul returns a number", async () => {
    const result = await compile(
      'mutate {pct: {mul: ["rate" 100], round: 1}} [{rate: 0.125}]..'
    );
    expect(result.result).toEqual([{ rate: 0.125, pct: 12.5 }]);
    expect(typeof result.result[0].pct).toBe("number");
  });
});

describe("format", () => {
  test("formats number with thousands separator", async () => {
    const result = await compile(
      'format {val: "#,##0"} [{val: 1234}]..'
    );
    expect(result.result).toEqual([{ val: "1,234" }]);
  });

  test("formats number as currency", async () => {
    const result = await compile(
      'format {price: "$#,##0.00"} [{price: 1234.5}]..'
    );
    expect(result.result).toEqual([{ price: "$1,234.50" }]);
  });

  test("formats number as percentage", async () => {
    const result = await compile(
      'format {rate: "0.0%"} [{rate: 0.125}]..'
    );
    expect(result.result).toEqual([{ rate: "12.5%" }]);
  });

  test("formats number with zero padding", async () => {
    const result = await compile(
      'format {id: "000000"} [{id: 42}]..'
    );
    expect(result.result).toEqual([{ id: "000042" }]);
  });

  test("leaves non-numeric fields unchanged", async () => {
    const result = await compile(
      'format {name: "#,##0"} [{name: "Alice", val: 100}]..'
    );
    expect(result.result).toEqual([{ name: "Alice", val: 100 }]);
  });

  test("formats multiple fields", async () => {
    const result = await compile(
      'format {price: "$#,##0.00", qty: "#,##0"} [{price: 9.99, qty: 1500}]..'
    );
    expect(result.result).toEqual([{ price: "$9.99", qty: "1,500" }]);
  });

  test("formats negative with accounting parens", async () => {
    const result = await compile(
      'format {amount: "#,##0.00;(#,##0.00)"} [{amount: -1234}]..'
    );
    expect(result.result).toEqual([{ amount: "(1,234.00)" }]);
  });
});
