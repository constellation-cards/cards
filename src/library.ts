import cardData from "../cards.json";

import type { ConstellationCardDeck, ConstellationCardStack, ConstellationCardPreset, ConstellationCard } from "./types"

export function getDecks(): ConstellationCardDeck[] {
  return cardData.decks;
}

export function getStacks(): ConstellationCardStack[] {
  return cardData.stacks;
}

export function getPresets(): ConstellationCardPreset[] {
  return cardData.presets as ConstellationCardPreset[];
}

export function getCards(): ConstellationCard[] {
  return cardData.cards;
}

export default {
  getDecks,
  getStacks,
  getPresets,
  getCards
}