// SPDX-License-Identifier: MIT
import request from "supertest";
import { createApp } from "../app.js";
import { TASK1 } from "../testing/fixture.js";

// POST /compile takes { code, data } and compiles locally; it does not call
// out to other language servers or require auth (see routes/compile.js).
describe("routes/compile", () => {
  let app;
  beforeEach(() => {
    app = createApp();
  });

  it("compiles code and data", async () => {
    const res = await request(app)
      .post("/compile")
      .send({ code: TASK1.code, data: {} })
      .expect(200);

    expect(res.body).toEqual({ data: { result: "hello, world!" }, errors: [] });
    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });

  it("answers 400 when code or data is missing", async () => {
    const missing = { error: "Missing required parameters: code and data" };
    await request(app).post("/compile").send({ code: TASK1.code }).expect(400, missing);
    await request(app).post("/compile").send({ data: {} }).expect(400, missing);
  });

  it("answers 400 to the old { item } request shape", async () => {
    await request(app)
      .post("/compile")
      .send({ item: { ...TASK1, data: {} } })
      .expect(400, { error: "Missing required parameters: code and data" });
  });
});
