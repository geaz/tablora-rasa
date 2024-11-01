import { FC } from "react";
import styled from "styled-components";
import { Card, CardOrientation } from "../model/CardDeck";

interface CardProps  {
    card: Card | undefined
    imageUrlFn?: (image: string) => string | undefined
}

export const CardComponent : FC<CardProps> = (props: CardProps) => {
    return (
        <StyledCard>
            { props.card === undefined && 
                <img title="placeholder" 
                    src={ props.imageUrlFn ? props.imageUrlFn('placeholder.png') : `./images/placeholder.png`}/> }
            { props.card !== undefined  &&
                <img title={props.card.info.name} 
                    src={ props.imageUrlFn ? props.imageUrlFn(`cards/${props.card.info.id}.png`) : `./images/cards/${props.card.info.id}.png`} 
                    className={ props.card.orientation === CardOrientation.Reversed ? "reversed-card" : ""}/> }
        </StyledCard>
    );
}

const StyledCard = styled.div`
    width: 150px;

    img {
        width: 100%;
    }

    .reversed-card {
        transform: rotate(180deg);
    }
`;

export default CardComponent;
