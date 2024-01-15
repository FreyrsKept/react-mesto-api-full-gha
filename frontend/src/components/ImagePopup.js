function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image-view " ${props.card ? 'popup_opened' : ''}`}>
        <figure className="popup__figure">
            <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}/>
            <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
            <button type="button" id="popup__close-button_view_card" className="popup__close" aria-label="Закрыть" onClick={props.onClose}/>
        </figure>
        </div>
    )
}

export default ImagePopup;