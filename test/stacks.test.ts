import { getStacks } from "..";

describe("getStacks()", () => {
  getStacks().forEach((stack) => {
    it(`stack ${stack.uid} has a name`, () => {
      expect(stack.name).toBeDefined();
      expect(stack.name).toBeTruthy();
    });

    it(`stack ${stack.name} has a description`, () => {
      expect(stack.description).toBeDefined();
      expect(stack.description).toBeTruthy();
    });

    it(`stack ${stack.name} has at least one card`, () => {
      expect(stack.cards).toBeDefined();
      expect(stack.cards.length).toBeDefined();
      expect(stack.cards.length).toBeGreaterThan(0);
    });
  });
});
