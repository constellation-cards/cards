import { ConstellationCard, ConstellationCardImage, ConstellationCardStack, ConstellationCardUid } from "./types";

export enum CardActionNames {
    UPSERT_CARD = "upsert-card",
    CREATE_STACK = "create-stack",
    DELETE_STACK = "delete-stack",
    RENAME_STACK = "rename-stack",
    MOVE_CARD = "move-card",
    FLIP_CARD = "flip-card",
}

export interface UpsertCardAction {
    action: CardActionNames.UPSERT_CARD;
    card: ConstellationCard;
}

export interface CreateStackAction {
    action: CardActionNames.CREATE_STACK;
    name: string;
    icons: ConstellationCardImage[];
}

export interface DeleteStackAction {
    action: CardActionNames.DELETE_STACK;
    stackUid: ConstellationCardUid<ConstellationCardStack>;
}

export interface RenameStackAction {
    action: CardActionNames.RENAME_STACK;
    stackUid: ConstellationCardUid<ConstellationCardStack>;
    name: string;
}

export interface MoveCardAction {
    action: CardActionNames.MOVE_CARD;
    cardUid: ConstellationCardUid<ConstellationCard>;
    stackUid: ConstellationCardUid<ConstellationCardStack>;
}

export interface FlipCardAction {
    action: CardActionNames.FLIP_CARD;
    cardUid: ConstellationCardUid<ConstellationCard>;
}