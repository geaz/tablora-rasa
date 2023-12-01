import { isCourt } from "./model/Arcana";
import { Card, CardOrientation } from "./model/CardDeck";

export enum QuestionResult {
    Yes = "Yes",
    YesBut = "Yes, but",
    YesAnd = "Yes, and",
    No = "No",
    NoBut = "No, but",
    NoAnd = "No, and"
}

export enum ResultFlavour {
    PositiveFlavour = "Positive Flavour",
    NegativeFlavour = "Negative Flavour"
}

export enum Event {
    NPC = "NPC",
    Encounter = "Encounter",
    Location = "Location",
    AdventureNote = "Adventure Note"
}

const countThreePositions = (cards: Array<Card>) : [number, number] => {
    const threeCards = [cards[0], cards[1], cards[2]];
    const upright = threeCards.filter(c => c.orientation === CardOrientation.Upright).length;
    const reversed = threeCards.filter(c => c.orientation === CardOrientation.Reversed).length;
    return [upright, reversed];
};

export const checkYesNo = (cards: Array<Card>) : QuestionResult => {
    const [posCount, negCount] = countThreePositions(cards);
    if(posCount === 2 && cards[3].orientation === CardOrientation.Upright) return QuestionResult.YesAnd;
    if(posCount === 2 && cards[3].orientation === CardOrientation.Reversed) return QuestionResult.YesBut;
    if(negCount === 2 && cards[3].orientation === CardOrientation.Upright) return QuestionResult.NoBut;
    if(negCount === 2 && cards[3].orientation === CardOrientation.Reversed) return QuestionResult.NoAnd;
    if(posCount === 3) return QuestionResult.Yes;
    if(negCount === 3) return QuestionResult.No;
    throw("Unexpected Yes/No Check!");
};

export const checkLikely = (cards: Array<Card>, likely: boolean) : QuestionResult => {
    const oneUpright = cards.filter(c => c.orientation === CardOrientation.Upright).length > 0;
    const oneReversed = cards.filter(c => c.orientation === CardOrientation.Reversed).length > 0;
    switch (cards[2]?.orientation){
        case undefined:
            if((likely && oneUpright) || (!likely && !oneReversed)) return QuestionResult.Yes;
            if((likely && !oneUpright) || (!likely && oneReversed)) return QuestionResult.No;
            break;
        case CardOrientation.Upright:
            if(likely && oneUpright) return QuestionResult.YesAnd;
            if(!likely && oneReversed) return QuestionResult.NoBut;
            break;
        case CardOrientation.Reversed:
            if(likely && oneUpright) return QuestionResult.YesBut;
            if(!likely && oneReversed) return QuestionResult.NoAnd;
            break;
    }
    throw("Unexpected Likely Check!");
};

export const checkFlavour = (cards: Array<Card>) : ResultFlavour => {
    const [posCount, negCount] = countThreePositions(cards);
    if(posCount > negCount) return ResultFlavour.PositiveFlavour;
    else return ResultFlavour.NegativeFlavour;
};

export const checkEvent = (cards: Array<Card>) : Event => {
    const uprightCourtCount = cards.filter(c => c.orientation === CardOrientation.Upright && isCourt(c.info)).length;
    const reversedCourtCount = cards.filter(c => c.orientation === CardOrientation.Reversed && isCourt(c.info)).length;
    if(uprightCourtCount > 0 && reversedCourtCount === 0) return Event.NPC;
    else if(uprightCourtCount === 0 && reversedCourtCount > 0) return Event.Encounter;
    else if(uprightCourtCount > 0 && reversedCourtCount > 0) return Event.Location
    else return Event.AdventureNote;
}