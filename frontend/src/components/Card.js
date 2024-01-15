import React from "react";
import { CurrentUserContext } from './CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardDeleteButtonClassName = (`cards__delete ${isOwn ? 'cards__delete_active' : ''}`);
    const cardLikeButtonClassName = (`cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleCardLike() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="cards__element">
            <button type="button" title="Удалить" className={cardDeleteButtonClassName} onClick={handleCardDelete} />
            <img className="cards__image" src={props.link} alt={props.name} title="Развернуть фото" onClick={handleClick} />
            <div className="cards__info">
                <h2 className="cards__title">{props.name}</h2>
                <div className="cards__like-wrp">
                    <button type="button" title="Нравится" className={cardLikeButtonClassName} onClick={handleCardLike} />
                    <p className="cards__like-counter">{props.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;