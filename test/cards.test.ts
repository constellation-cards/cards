import { getCards } from "..";

describe("getCards()", () => {
  getCards().forEach((card) => {
    const cardname =
      card.front.name == card.back.name
        ? card.front.name
        : `${card.front.name} / ${card.back.name}`;

    it(`card ${card.uid} has a name`, () => {
      expect(card.front.name).toBeDefined();
      expect(card.front.name).toBeTruthy();
      expect(card.back.name).toBeDefined();
      expect(card.back.name).toBeTruthy();
    });

    it(`card ${cardname} has a non-zero quantity`, () => {
      expect(card.quantity).toBeGreaterThanOrEqual(1);
    });
  });
});
