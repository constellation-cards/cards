/**
 * Many objects have a unique ID, often a database key.
 */
export type ConstellationCardUid<T> = string;

/**
 * An IMAGE is a reference to an icon or background image.
 * This can either be a hard-coded symbolic name, or a URL.
 */
export type ConstellationCardImage = string | null | undefined;

/**
 * A DECK is a collection of CARDS.
 */
export interface ConstellationCardDeck {
  /**
   * The unique ID of this deck
   */
  uid: ConstellationCardUid<ConstellationCardDeck>;

  /**
   * The human readable name of this deck, e.g. "CORE"
   */
  name: string;

  /**
   * All the cards in this deck, by ID
   */
  cards: ConstellationCardUid<ConstellationCard>[];
}

/**
 * Stacks have an owner, either a player or a predefined area
 */
export enum ConstellationCardFixedOwner {
  /**
   * Shard stacks are visible to all players, cards shown
   */
  SHARED = "SHARED",

  /**
   * Side stacks are visible to all players, cards hidden
   */
  SIDE = "SIDE"
}

export type ConstellationCardOwner = string | ConstellationCardFixedOwner;

/**
 * A STACK is a collection of CARDS that closely share a purpose,
 * e.g. "Character Focus" or "Condition".
 * Multiple DECKS can contribute cards to a single stack.
 */
export interface ConstellationCardStack {
  /**
   * The unique ID of this stack
   */
  uid: ConstellationCardUid<ConstellationCardStack>;

  /**
   * The human readable name of this stack, e.g. "Core Rules"
   */
  name: string;

  /**
   * The owner for this stack, either a player or a fixed position
   */
  owner: ConstellationCardOwner;

  /**
   * The list of icons associated with this stack
   */
  icons: ConstellationCardImage[];

  /**
   * All the cards in this stack, by ID
   */
  cards: ConstellationCardUid<ConstellationCard>[];
}

export interface ConstellationCardFace {
  /**
   * Every face has a unique name; sometimes a card front and back faces share it
   */
  name: string;

  /**
   * Cards can have a semi-transparent image as a background
   */
  backgroundImage: ConstellationCardImage;

  /**
   * Cards can have descriptions
   */
  description: string | undefined;

  /**
   * Cards can optionally have a list of prompts, shown as a bulleted list
   */
  prompts: string[] | undefined;

  /**
   * Cards can optionally have a rule at the bottom
   */
  rule: string | undefined;
}

export interface ConstellationCard {
  /**
   * The unique ID of this card
   */
  uid: ConstellationCardUid<ConstellationCard>;

  /**
   * All cards belong in a deck, e.g. "CORE"
   */
  deck: ConstellationCardUid<ConstellationCardDeck>;

  /**
   * All cards belong in a stack, e.g. "Character (Focus)"
   */
  stack: ConstellationCardUid<ConstellationCardStack>;

  /**
   * Cards have front and back faces
   */
  front: ConstellationCardFace;
  back: ConstellationCardFace;

  /**
   * The stack has a certain number of this card in it
   */
  quantity: number;
}

/**
 * When dealing a card into this preset, where should it be positioned?
 */
export enum ConstellationCardPresetFlipRule {
  FRONT = "front",
  BACK = "back",
  RANDOM = "random"
}

/**
 * When dealing a card into this preset, where does it come from?
 */
export interface ConstellationCardPresetSource {
  stack: ConstellationCardUid<ConstellationCardStack>;
  quantity: number;
  flipRule: ConstellationCardPresetFlipRule;
}

export interface ConstellationCardPreset {
  name: string;
  description: string;
  sources: ConstellationCardPresetSource[];
}