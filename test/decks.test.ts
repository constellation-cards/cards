import { getDecks } from "..";

describe("getDecks()", () => {
  getDecks().forEach((deck) => {
    it(`deck ${deck.uid} has a name`, () => {
      expect(deck.name).toBeDefined();
      expect(deck.name).toBeTruthy();
    });

    it(`deck ${deck.name} has a description`, () => {
      expect(deck.description).toBeDefined();
      expect(deck.description).toBeTruthy();
    });

    it(`deck ${deck.name} has at least one card`, () => {
      expect(deck.cards).toBeDefined();
      expect(deck.cards.length).toBeDefined();
      expect(deck.cards.length).toBeGreaterThan(0);
    });
  });
});
