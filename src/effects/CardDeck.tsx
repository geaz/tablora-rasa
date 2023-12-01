import { useEffect, useState } from "react";
import { ArcanaCard } from "../model/Arcana";
import { Card, CardOrientation } from "../model/CardDeck";

export const useCardDeck = (cards: Array<ArcanaCard>) : [number, () => void, () => Card, (cards: Array<Card>) => void] => {
    let [remaining, setRemaining] = useState<number>(cards.length);
    let [pile, setPile] = useState<Array<Card>>(cards.map(c => { return {
            info: c,
            orientation: CardOrientation.Upright
        } as Card; }));
    let [discardPile, setDiscardPile] = useState<Array<Card>>([]);

    useEffect(() => {
        shuffle();
    }, []);

    const shuffle = () => {
        const newPile = [...pile, ...discardPile];
        for(const card of newPile){
            card.orientation = Math.random() < 0.5 ? CardOrientation.Upright : CardOrientation.Reversed;
        }

        let currentIndex = newPile.length,  randomIndex;        
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;                
            [newPile[currentIndex], newPile[randomIndex]] = [newPile[randomIndex], newPile[currentIndex]];
        }

        const groupedCards: { [number: string] : number } = {};
        for(let i = 0; i < newPile.length; i++) {
            const card = newPile[i];
            const number = card.info.id.split("-")[1];
            if(groupedCards[number] === undefined) groupedCards[number] = 1;
            else groupedCards[number]++;
        }

        setPile(newPile);
        setDiscardPile([]);
        setRemaining(newPile.length);
    };

    const drawCard = (): Card => {        
        const [card,...newPile] = pile;

        setPile(newPile);
        setRemaining(newPile.length);

        return card;
    };

    const discardCards = (cards: Array<Card>) => {
        setDiscardPile([...discardPile, ...cards]);
    }

    return [remaining, shuffle, drawCard, discardCards];
};