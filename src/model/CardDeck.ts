import { ArcanaCard } from "./Arcana";

export enum CardOrientation {
    Upright,
    Reversed
}

export interface Card {
    info: ArcanaCard;
    orientation: CardOrientation;
}

export type CardDeck = Array<Card>;