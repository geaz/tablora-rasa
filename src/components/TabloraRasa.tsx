import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faBook, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useCardDeck } from "../effects/CardDeck";
import { MinorArcana } from "../model/MinorArcana";
import { Card, CardOrientation } from "../model/CardDeck";
import { styled } from "styled-components";
import { MajorArcana } from "../model/MajorArcana";
import { checkCharacter, checkEvent, checkLikely, checkYesNo } from "../QuestionChecker";
import CardComponent from "./CardComponent";

enum QuestionType {
    YesNo,
    LikelyYes,
    UnlikelyYes,
    Open,
    Event
}

interface TabloraRasaProps  {
    imageUrlFn?: (image: string) => string | undefined
}

export const TabloraRasa: FC<TabloraRasaProps> = (props: TabloraRasaProps) => {
    const [remaining, shuffleMinor, drawMinor, discardMinors] = useCardDeck(MinorArcana);
    const [ _, shuffleMajor, drawMajor] = useCardDeck(MajorArcana);
    const [drawnCards, setDrawnCards] = useState<Array<Card>>([]);

    const [questionRequest, setQuestionRequest] = useState<QuestionType | null>(null);
    const [lastRequestType, setLastRequestType] = useState<QuestionType | null>(null);
    const [shouldDrawMinor, setShouldDrawMinor] = useState<boolean>(false);
    const [shouldDrawMajor, setShouldDrawMajor] = useState<boolean>(false);
    
    const [result, setResult] = useState<string>();
    const [triggeredEvent, setTriggeredEvent] = useState<string>();
    const [triggeredRandomEvent, setTriggeredRandomEvent] = useState<boolean>(false);
    
    useEffect(() => {
        if(remaining > 0) return;
        shuffleMinor();
    }, [remaining]);

    useEffect(() => {
        if(!shouldDrawMinor && ! shouldDrawMajor) return;
        if(shouldDrawMinor) {
            setDrawnCards(d => [...d, drawMinor()]);
            setShouldDrawMinor(false);
        }
        if(shouldDrawMajor) {
            const major = drawMajor();
            setDrawnCards(d => [...d, major]);
            setShouldDrawMajor(false);
            shuffleMajor();
            if(major.info.id === "trump-zero") shuffleMinor();
        }
    }, [shouldDrawMinor, shouldDrawMajor]);

    useEffect(() => {
        if(questionRequest === null) return;

        let requestDone = false;
        switch(questionRequest) {
            case QuestionType.YesNo:
                if(drawnCards.length < 3 && !shouldDrawMinor) setShouldDrawMinor(true);
                else if(drawnCards.length === 3 && !drawnCards.every(c => c.orientation === drawnCards[0].orientation)) setShouldDrawMinor(true);
                else {
                    setResult(checkYesNo(drawnCards));
                    requestDone = true;
                }
                break;
            case QuestionType.LikelyYes:
            case QuestionType.UnlikelyYes:
                if(drawnCards.length < 2 && !shouldDrawMinor) setShouldDrawMinor(true);
                else if(drawnCards.length === 2 && !drawnCards.every(c => c.orientation === drawnCards[0].orientation)) setShouldDrawMinor(true);
                else {                     
                    setResult(checkLikely(drawnCards, questionRequest === QuestionType.LikelyYes));
                    requestDone = true;
                }
                break;
            case QuestionType.Open:
            case QuestionType.Event:
                if(drawnCards.length < 3 && !shouldDrawMinor) setShouldDrawMinor(true);
                else if(drawnCards.length === 3) setShouldDrawMajor(true);
                else {
                    setResult(checkCharacter(drawnCards));
                    if(questionRequest === QuestionType.Event) setTriggeredEvent(checkEvent(drawnCards));
                    requestDone = true;
                }
                break;
        }

        if(!requestDone) return;
        setTriggeredRandomEvent(questionRequest !== QuestionType.Event && drawnCards[0].info.id.split("-")[1] === drawnCards[1].info.id.split("-")[1]);
        setQuestionRequest(null);
        setLastRequestType(questionRequest);
        // Majors get shuffled directly after the draw
        discardMinors(drawnCards.filter(c => c.info.type.id !== "trump"));  
    }, [drawnCards, questionRequest]);

    useEffect(() => {
        if(questionRequest !== null || lastRequestType === null) return;
        if(lastRequestType === QuestionType.YesNo) {
        }
    }, [lastRequestType, questionRequest])

    const triggerQuestionRequest = (type: QuestionType) => {
        setDrawnCards([]);
        setTriggeredEvent("");
        setTriggeredRandomEvent(false);
        setQuestionRequest(type);
    };

    return (
        <StyledTabloraRasa>
            <div className="button-row">
                <button disabled={ questionRequest != null } onClick={() => triggerQuestionRequest(QuestionType.YesNo)}><FontAwesomeIcon icon={faQuestion}/>Yes/No (50%) Question</button>
                <button disabled={ questionRequest != null } onClick={() => triggerQuestionRequest(QuestionType.LikelyYes)}><FontAwesomeIcon icon={faQuestion}/>Likely Yes (75%) Question</button>
                <button disabled={ questionRequest != null } onClick={() => triggerQuestionRequest(QuestionType.UnlikelyYes)}><FontAwesomeIcon icon={faQuestion}/>Unlikely Yes (25%) Question</button>
                <button disabled={ questionRequest != null } onClick={() => triggerQuestionRequest(QuestionType.Open)}><FontAwesomeIcon icon={faBook} />Open Question</button>
                <button disabled={ questionRequest != null } onClick={() => triggerQuestionRequest(QuestionType.Event)}><FontAwesomeIcon icon={faShuffle} />Random Event</button>
            </div>
            <div id="card-table">
                <div className="card-place">
                    <div className="main-cards">
                        <CardComponent card={drawnCards[0]} imageUrlFn={props.imageUrlFn}/>
                        <CardComponent card={drawnCards[1]} imageUrlFn={props.imageUrlFn}/>
                        <CardComponent card={ lastRequestType === QuestionType.LikelyYes || lastRequestType === QuestionType.UnlikelyYes 
                            ? undefined
                            : drawnCards[2] }
                            imageUrlFn={props.imageUrlFn}/>
                    </div>
                    <CardComponent card={ lastRequestType === QuestionType.LikelyYes || lastRequestType === QuestionType.UnlikelyYes 
                        ? drawnCards[2]
                        : drawnCards[3] }
                        imageUrlFn={props.imageUrlFn}/>
                </div>
                <div className="deck-infos">
                    <span className="primary-info">Minor Arcanas remaining: {remaining}</span>
                    <span className="secondary-info">(shuffeling occurs on drawing The Fool or, if empty)</span>
                </div>
                <div className="card-interpretation">
                    <div className="result">  
                        <p className="question-result">{ result }</p>
                        <p className="event-triggered">
                            { triggeredRandomEvent ? "Triggering Random Event" : "" }
                            { triggeredEvent }
                        </p>
                    </div>
                    { lastRequestType !== null && 
                        <div>
                            { drawnCards.map(d => 
                                <div key={d.info.id} className="card-info">
                                    <p className="primary-card-info"><FontAwesomeIcon icon={d.info.type.icon}/> { d.info.name } { d.orientation === CardOrientation.Upright ? "(Upright)" : "(Reversed)" }</p>
                                    <p>{ d.orientation === CardOrientation.Upright ? d.info.meanings.upright.join(", ") : d.info.meanings.reversed.join(", ") }</p>
                                </div>) }
                        </div> }
                </div>
            </div>
        </StyledTabloraRasa>
    );
}

const StyledTabloraRasa = styled.div`
    .button-row {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 50px;
        
        button {
            padding: 5px;
            background-color: #fafafa;
            border: 1px solid ${ p => p.theme.borderColor };
            border-radius: 3px;
            cursor: pointer;
            color: black;

            svg { margin-right: 5px; }

            &:hover { background-color: #e0e0e0; }
            &:active { background-color: white; transform: scale(0.9);  }
        }
    }

    .card-place {
        display: flex;
        justify-content: center;
        gap: 25px;
    }

    .main-cards {
        display: flex;
        gap: 10px;
        margin-right: 50px;
    }

    .primary-info {
        font-size: 0.8rem;
        font-weight: bold;
    }

    .secondary-info {
        margin-left: 10px;
        font-size: 0.75rem;
        color: ${ p => p.theme.textColorFaded };
    }

    .card-interpretation {
        margin-top: 35px;

        p { margin: 0; }
    }

    .result {
        border-bottom: 1px solid #eee;        
        padding-bottom: 35px;

        p { text-align: center; }
    }

    .question-result{
        font-size: 1.75rem;
        font-weight: bold;
    }

    .event-triggered {
        font-weight: bold;
        color: ${ p => p.theme.colorBlue };
    }

    .card-info {
        margin: 15px 0;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }

    .primary-card-info {
        font-size: 0.9rem;
        font-weight: bold;
    }
`;