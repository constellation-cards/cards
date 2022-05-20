/**
 * Many objects have a unique ID, often a database key.
 */
export type ConstellationCardId<T> = string;

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
    id: ConstellationCardId<ConstellationCardDeck>;

    /**
     * The human readable name of this deck, e.g. "CORE"
     */
    name: string;

    /**
     * All the cards in this deck, by ID
     */
    cards: ConstellationCardId<ConstellationCard>[];
}

/**
 * A STACK is a collection of CARDS that closely share a purpose,
 * e.g. "Character Focus" or "Condition".
 * Multiple DECKS can contribute cards to a single stack.
 */
export interface ConstellationCardStack {
    /**
     * The unique ID of this stack
     */
    id: ConstellationCardId<ConstellationCardStack>;

    /**
     * The human readable name of this stack, e.g. "Core Rules"
     */
    name: string;

    /**
     * The list of icons associated with this stack
     */
    icons: ConstellationCardImage[];

    /**
     * All the cards in this stack, by ID
     */
    cards: ConstellationCardId<ConstellationCard>[];
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
    id: ConstellationCardId<ConstellationCard>;

    /**
     * All cards belong in a deck, e.g. "CORE"
     */
    deck: ConstellationCardId<ConstellationCardDeck>;

    /**
     * All cards belong in a stack, e.g. "Character (Focus)"
     */
    stack: ConstellationCardId<ConstellationCardStack>;

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