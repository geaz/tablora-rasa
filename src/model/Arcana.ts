import { IconDefinition, faEarth, faFire, faWater, faWind } from "@fortawesome/free-solid-svg-icons";

export interface ArcanaCard {
    id: string;
    name: string;
    meanings: { upright: Array<string>, reversed: Array<string> };
    type: ArcanaType;
}

export interface ArcanaType {
    id: string;
    name: string;
    icon: IconDefinition;
    element: string;
    meanings: Array<string>;
}

export interface MinorArcanaTypeList {
    Cups: ArcanaType,
    Wands: ArcanaType,
    Swords: ArcanaType,
    Pentacles: ArcanaType
}

export const isCourt = (card: ArcanaCard): boolean => {
    const number = card.id.split("-")[1];
    return number === "page" || number === "knight" || number === "king" || number === "queen";
};

export const MinorArcanaTypes: MinorArcanaTypeList = {
    Cups: { 
        id: "cups", 
        name: "Cups", 
        element: "water",
        icon: faWater,
        meanings: ["emotions", "love", "intuition", "spiritual awareness", "relationships", "creativity", "self-reflection", "comfort and healing"]
    },
    Wands: { 
        id: "wands", 
        name: "Wands", 
        element: "fire", 
        icon: faFire,
        meanings: ["energy", "creativity", "enterprising spirit", "activity", "willpower", "assertiveness", "inspiration", "initiation"]
    },
    Swords: { 
        id: "swords", 
        name: "Swords", 
        element: "air", 
        icon: faWind,
        meanings: ["thinking", "intellect", "communication", "challenges", "clarity", "truthfulness", "assertiveness", "conflicts and separations"]
    },
    Pentacles: { 
        id: "pentacles", 
        name: "Pentacles", 
        element: "earth", 
        icon: faEarth,
        meanings: ["material success", "financial success", "security", "material world", "practical matters", "prosperity", "realism", "manifestation"]
    }
};