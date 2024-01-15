function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`} onClick={props.onCloseClick}>
            <div className="popup__container">
                <form name={props.form} className="popup__form" onSubmit={props.onSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" title="Сохранить" className="popup__submit">{props.buttonText}</button>
                </form>
                <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose} />
            </div>
        </div>
    )
}

export default PopupWithForm;