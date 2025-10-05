import { describe, expect, it } from "@jest/globals";
import { convertData, getDataFromDummy } from "../service";
import data from "../mock/data.json"
import { mockResult } from "../mock/result";

describe("sum module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  jest.spyOn(global, "fetch").mockResolvedValueOnce(
    new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );

  it("Convert data from Dummy into result object", async () => {
    const data = await getDataFromDummy().then((users) =>
      convertData(users.users)
    );
    expect(data).toMatchObject(mockResult)
  })

  
});
