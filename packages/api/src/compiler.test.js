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
