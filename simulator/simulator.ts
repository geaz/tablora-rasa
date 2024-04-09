import { MinorArcana } from "../src/model/MinorArcana";
import { Card, CardOrientation } from "../src/model/CardDeck";
import { QuestionResult, Event, checkEvent, checkLikely, checkYesNo } from "../src/QuestionChecker";

let minorPile: Array<Card> = MinorArcana.map(c => { return {
        info: c,
        orientation: CardOrientation.Upright
    } as Card; })
let discardPile: Array<Card> = [];

export function simulateQuestion(likely: boolean) {
    shuffle();
    
    let yes = 0;
    let yesBut = 0;
    let yesAnd = 0;
    let noBut = 0;
    let noAnd = 0;
    let no = 0;

    const drawCards = likely ? 2 : 3;
    for(let i = 0; i < 1000000; i++){
        let drawnCards : Array<Card> = [];
        for(let i = 0; i < drawCards; i++){
            drawnCards.push(drawCard());
        }

        const upright = drawnCards.filter(c => c.orientation === CardOrientation.Upright).length;
        const reversed = drawnCards.filter(c => c.orientation === CardOrientation.Reversed).length;
        if(upright !== 0 && reversed !== 0) drawnCards.push(drawCard());

        discardPile = [...discardPile, ...drawnCards];

        const result = likely
            ? checkLikely(drawnCards, true)
            : checkYesNo(drawnCards);
        switch (result){
            case QuestionResult.Yes:
                yes++;
                break;
            case QuestionResult.YesBut:
                yesBut++;
                break;
            case QuestionResult.YesAnd:
                yesAnd++;
                break;
            case QuestionResult.NoBut:
                noBut++;
                break;
            case QuestionResult.NoAnd:
                noAnd++;
                break;
            default:
                no++;
                break;
        }
    }
    
    console.log(`Total Yes: ${yes} (${(yes/1000000).toFixed(2)})`);
    console.log(`Total Yes, but: ${yesBut} (${(yesBut/1000000).toFixed(2)})`);
    console.log(`Total Yes, and: ${yesAnd} (${(yesAnd/1000000).toFixed(2)})`);
    console.log(`Total No, but: ${noBut} (${(noBut/1000000).toFixed(2)})`);
    console.log(`Total No, and: ${noAnd} (${(noAnd/1000000).toFixed(2)})`);
    console.log(`Total No: ${no} (${(no/1000000).toFixed(2)})`);
    console.log(``);
    console.log(`All Yes Types: ${yes+yesBut+yesAnd} (${((yes+yesBut+yesAnd)/1000000).toFixed(2)})`);
    console.log(`All No Types: ${no+noBut+noAnd} (${((no+noBut+noAnd)/1000000).toFixed(2)})`);
}

export function simulateEvents() {
    shuffle();

    let triggeredNpcs = 0;
    let triggeredEncounters = 0;
    let triggeredLocations = 0;
    let triggeredNotes = 0;

    for(let i = 0; i < 1000000; i++){
        let drawnCards : Array<Card> = [];
        for(let i = 0; i < 3; i++){
            drawnCards.push(drawCard());
        }
        discardPile = [...discardPile, ...drawnCards];

        const result = checkEvent(drawnCards);
        switch (result){
            case Event.NPC:
                triggeredNpcs++;
                break;
            case Event.Encounter:
                triggeredEncounters++;
                break;
            case Event.Location:
                triggeredLocations++;
                break;
            default:
                triggeredNotes++;
                break;
        }
    }

    console.log(`Total triggered NPCs: ${triggeredNpcs} (${(triggeredNpcs/1000000).toFixed(2)})`);
    console.log(`Total triggered Encounters: ${triggeredEncounters} (${(triggeredEncounters/1000000).toFixed(2)})`);
    console.log(`Total triggered Locations: ${triggeredLocations} (${(triggeredLocations/1000000).toFixed(2)})`);
    console.log(`Total triggered Notes: ${triggeredNotes} (${(triggeredNotes/1000000).toFixed(2)})`);
}

export function simulateEventTrigger(cardDraws: number) {
    shuffle();
    
    let triggeredEvents = 0;
    for(let i = 0; i < 1000000; i++){
        let drawnCards : Array<Card> = [];
        for(let i = 0; i < cardDraws; i++){
            drawnCards.push(drawCard());
        }
        discardPile = [...discardPile, ...drawnCards];

        const groupedCards: { [number: string] : number } = {};
        for(let i = 0; i < cardDraws; i++) {
            const card = drawnCards[i];
            const number = card.info.id.split("-")[1];
            if(groupedCards[number] === undefined) groupedCards[number] = 1;
            else groupedCards[number]++;
        }
        for(const group in groupedCards) {
            if(groupedCards[group] >= 2) {
                triggeredEvents++;
                break;
            }
        }
    }
    
    const drawnPiles = 1000000/(56/cardDraws);
    console.log(`Total triggered events: ${triggeredEvents}`);
    console.log(`Chance for Event per Draw (Cards per Draw: ${cardDraws}): ${triggeredEvents/1000000}`);
    console.log(`Drawn piles in total: ${drawnPiles}`);
    console.log(`Events per Pile in average: ${triggeredEvents/drawnPiles}`);
    console.log(``);
}

const shuffle = () => {
    minorPile = [...discardPile, ...minorPile];
    discardPile = [];
    for(const card of minorPile){
        card.orientation = Math.random() < 0.5 ? CardOrientation.Upright : CardOrientation.Reversed;
    }

    let currentIndex = minorPile.length,  randomIndex;        
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;                
        [minorPile[currentIndex], minorPile[randomIndex]] = [minorPile[randomIndex], minorPile[currentIndex]];
    }
};

const drawCard = (): Card => {
    if(minorPile.length === 0) shuffle();
    return minorPile.pop()!;
}