import { getCards, getDecks, getStacks } from "./";
import { pick } from "ramda";
import { writeFileSync } from "fs";

function tomap(records: object[]): any {
  return records.reduce((a: any, v: any) => {
    a[v.uid] = v;
    return a;
  }, {});
}

const decks = tomap(getDecks());
const stacks = tomap(getStacks());

const cards = getCards().map((card) => {
  return {
    ...card,
    deck: pick(["uid", "name"], decks[card.deck]),
    stack: pick(["uid", "name", "icons"], stacks[card.stack]),
  };
});

const output = { cards };

writeFileSync("cards.json", JSON.stringify(output, null, 2));
