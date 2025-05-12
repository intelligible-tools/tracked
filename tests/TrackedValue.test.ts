import { OBJECT_VALUE_ERROR, TrackedValue } from "../TrackedValue";
import { TrackableValueDiff } from "../types";

interface TestCase<T> {
  initial: {
    value: T;
    pristine: boolean;
    dirty: boolean;
    diff: undefined
  }
  updated: {
    value: T;
    pristine: boolean;
    dirty: boolean;
    diff: TrackableValueDiff<T> | undefined;
  }
}

const testCases: TestCase<string | number | boolean>[] = [
  {
    initial: {
      value: 42,
      pristine: true,
      dirty: false,
      diff: undefined,
    },
    updated: {
      value: 52,
      pristine: false,
      dirty: true,
      diff: {
        previous: 42,
        current: 52
      },
    },
  } as TestCase<number>,
  {
    initial: {
      value: "test",
      pristine: true,
      dirty: false,
      diff: undefined,
    },
    updated: {
      value: "hello",
      pristine: false,
      dirty: true,
      diff: {
        previous: "test",
        current: "hello"
      },
    },
  } as TestCase<string>,
  {
    initial: {
      value: true,
      pristine: true,
      dirty: false,
      diff: undefined,
    },
    updated: {
      value: false,
      pristine: false,
      dirty: true,
      diff: {
        previous: true,
        current: false 
      },
    },
  } as TestCase<boolean>,
];

describe.each(testCases)("TrackedValue", ({ initial, updated}): void => {

  let trackedValue;

  beforeEach(() => {
    trackedValue = new TrackedValue(initial.value);
  });

  describe("Constructor", () => {
    it("Should initialize with the provided value", () => {
      expect(trackedValue.value).toBe(initial.value);
    });

    it("Should be pristine", () => {
      expect(trackedValue.pristine).toBe(initial.pristine);
    });

    it("Should not be dirty", () => {
      expect(trackedValue.dirty).toBe(initial.dirty);
    });

    it("Should not have a diff", () => {
      expect(trackedValue.diff()).toBe(undefined)
    });
  });

  describe("Value Setter", () => {
    beforeEach(() => {
      trackedValue.value = updated.value;
    });

    it("should set the current value", () => {
      expect(trackedValue.value).toBe(updated.value);
    });

    it("should no longer be pristine", () => {
      expect(trackedValue.pristine).toBe(updated.pristine);
      expect(trackedValue.dirty).toBe(updated.dirty);
    });

    it("should be dirty", () => {
      expect(trackedValue.pristine).toBe(updated.pristine);
      expect(trackedValue.dirty).toBe(updated.dirty);
    });

    it("should have a diff", () => {
      expect(trackedValue.diff()).toEqual(updated.diff);
    });
  });

  describe("Value Getter", () => {
    it("should return the current value", () => {
      expect(trackedValue.value).toBe(initial.value);
    });

    it("should return the updated value", () => {
      trackedValue.value = updated.value;
      expect(trackedValue.value).toBe(updated.value);
    });

    it("Should error if the value is an object", () => {
      expect(() => {
        trackedValue.value = { a: 1 };
      }).toThrow(OBJECT_VALUE_ERROR);
    });
  });

  describe("Commit", () => {
    beforeEach(() => {
      trackedValue.value = updated.value;
    });

    it("should set the previous value to the current value", () => {
      expect(trackedValue.value).toBe(updated.value);
      trackedValue.commit();
      expect(trackedValue.value).toBe(updated.value);
    });

    it("should be pristine after commit", () => {
      trackedValue.commit();
      expect(trackedValue.pristine).toBe(true);
      expect(trackedValue.dirty).toBe(false);
    });

    it("should not have a diff after commit", () => {
      trackedValue.commit();
      expect(trackedValue.diff()).toBe(undefined);
    });
  });

  describe("Revert", () => {
    beforeEach(() => {
      trackedValue.value = updated.value;
    });

    it("should revert to the previous value", () => {
      expect(trackedValue.value).toBe(updated.value);
      trackedValue.revert();
      expect(trackedValue.value).toBe(initial.value);
    });

    it("should be pristine after revert", () => {
      trackedValue.revert();
      expect(trackedValue.pristine).toBe(true);
      expect(trackedValue.dirty).toBe(false);
    });

    it("should not have a diff after revert", () => {
      trackedValue.revert();
      expect(trackedValue.diff()).toBe(undefined);
    });
  });

  describe("Diff", () => {
    it("should return the diff if there is a difference between the previous and the current values", () => {
      trackedValue.value = updated.value;
      expect(trackedValue.diff()).toEqual(updated.diff);
    });

    it("should return undefined if there is no diff between the previous calue and the current value ", () => {
      expect(trackedValue.diff()).toEqual(undefined);
    });
  });
});