// SPDX-License-Identifier: MIT
import { compile } from "./compile.js";
import { TASK1 } from "./testing/fixture.js";

// compile() runs the L0170 compiler locally on { code, data } and answers the
// standard envelope: output in `data`, compile errors in `errors` (an array).
describe("compile", () => {
  it("compiles code and data to a { data, errors } envelope", async () => {
    await expect(compile({ code: TASK1.code, data: {} })).resolves.toEqual({
      data: { result: "hello, world!" },
      errors: [],
    });
  });

  it("requires both code and data", async () => {
    await expect(compile({ code: TASK1.code })).rejects.toThrow("Missing required parameters: code and data");
    await expect(compile({ data: {} })).rejects.toThrow("Missing required parameters: code and data");
  });
});
