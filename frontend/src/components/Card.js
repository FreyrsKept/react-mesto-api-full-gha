import React from "react";
import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card?.owner?._id === currentUser?._id;
    const isLiked = card?.likes?.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__card">
            <article className="element" id={card._id}>
                <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
                {isOwn && (
                    <button onClick={handleDeleteClick} className="element__trash-button element__trash-button_active" type="button" aria-label="Кнопка для удаления карточки места"></button>
                )}
                <div className="element__description">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like-container">
                        <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Кнопка лайка карточке места"></button>
                        <p className="element__like-caption">{card.likes.length}</p>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default Card;