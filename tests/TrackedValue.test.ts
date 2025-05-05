import { TrackedValue } from "../TrackedValue";

describe("TrackedValue", () => {
  describe("constructor", () => {
    it("should initialize with the provided value", () => {
      const trackedValue = new TrackedValue<number>(42);
      trackedValue
      expect(trackedValue.value).toBe(42);
    });
  })
});