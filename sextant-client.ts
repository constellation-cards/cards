import { concat, filter, pick, reduce, repeat } from "ramda";
import axios from "axios";
import { readFileSync, writeFileSync } from "fs";
import { ConstellationCard } from "./src/types";

function tomap(records: object[]): any {
  return records.reduce((a: any, v: any) => {
    a[v.uid] = v;
    return a;
  }, {});
}

const data = JSON.parse(readFileSync("cards.json").toString());

const decks = tomap(data.decks);
const stacks = tomap(data.stacks);

// Bake deck and stack data into the structure
const cards = reduce(
  (cards, card: any) => {
    // Uncomment to duplicate cards based on quantity
    // We want this if we're printing cards, but not for TTS
    const quantity = 1; // newCard.quantity
    const newCard: ConstellationCard = {
      ...card,
      deck: pick(["uid", "name"], decks[card.deck]),
      stack: pick(["uid", "name", "icons"], stacks[card.stack]),
    };
    return concat(cards, repeat(newCard, quantity));
  },
  [] as ConstellationCard[],
  data.cards
);

const isDeck = (name: string) => (card: any) => card.deck.name == name;
const isStack = (name: string) => (card: any) => card.stack.name == name;

const body = {
  cards: filter(isStack("City (Neighborhood)"), cards),
};

axios
  .post("http://127.0.0.1:8000/latex/tarot", body)
  .then((response: any) => writeFileSync("cards.tex", response.data));

// E:\SteamLibrary\steamapps\common\Tabletop Simulator\Modding\Deck Builder

// mkdir card-images; mkdir card-images-front; mkdir card-images-back
// magick convert -density 300 cards.pdf -background white -alpha remove -alpha off card-images\cards-%03d.png
// move-item -Path .\card-images\cards-*[24680].png -Destination card-images-back\
// move-item -Path .\card-images\cards-*[13579].png -Destination card-images-front\
// magick montage -geometry +0+0 -tile 10x .\card-images-back\*.png montage-back-o.png
// magick montage -geometry +0+0 -tile 10x .\card-images-front\*.png montage-front-o.png
// magick convert -geometry 90% montage-back-o.png montage-back.png
// magick convert -geometry 90% montage-front-o.png montage-front.png
