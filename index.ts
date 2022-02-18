// Card icons, e.g. top or bottom, character cards
export enum ConstellationCardIcon {
    None = "None"
}

// Optional card backgrounds
export enum ConstellationCardImage {
    None = "None"
}

// In what order should a stack be ordered by default?
export enum ConstellationCardStackOrder {
    Alpha = "Alpha",
    Random = "Random"
}

export interface ConstellationCardDeck {
    name: string;
}

export interface ConstellationCardStack {
    // Stacks have a name, e.g. "Character (Focus)"
    name: string;

    // Stacks have symbols attached to them
    icons: ConstellationCardIcon[];

    // How should cards in this stack be ordered?
    stackOrder: ConstellationCardStackOrder;
}

export interface ConstellationCardFace {
    // Every face has a unique name; sometimes a card front and back faces share it
    name: string;

    // Cards can have a semi-transparent image as a background
    backgroundImage: ConstellationCardImage | undefined;

    // Cards can have descriptions
    description: string | undefined;

    // Cards can optionally have a list of prompts, shown as a bulleted list
    prompts: string[] | undefined;

    // Cards can optionally have a rule at the bottom
    rule: string | undefined;
}

export interface ConstellationCard {
    // All cards belong in a deck, e.g. "Base System"
    deck: ConstellationCardDeck;

    // All cards belong in a stack, e.g. "Character (Focus)"
    stack: ConstellationCardStack;

    // Cards have front and back faces
    front: ConstellationCardFace;
    back: ConstellationCardFace;

    // The stack has a certain number of this card in it
    quantity: number;
}