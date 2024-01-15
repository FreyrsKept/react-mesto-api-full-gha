import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameUpdate(evt) {
        setName(evt.target.value);
    };

    function handleLinkUpdate(evt) {
        setLink(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onSubmit({
            name: name,
            link: link
        });
    };

    React.useEffect(() => {
        if (props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onCloseClick={props.onCloseClick}
            onClose={props.onClose}
            name={'add'}
            form={'placeData'}
            title={'Новое место'}
            buttonText={'Создать'}
            onSubmit={handleSubmit}
        >
            <input
                name="name"
                id="place-name-input"
                type="text"
                placeholder="Название изображения"
                className="popup__input popup__input_image-name"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameUpdate}
                required />
            <span
                className="place-name-input-error popup__input-error" />
            <input
                name="link"
                id="place-image-input"
                type="url"
                placeholder="Ссылка на изображение"
                className="popup__input popup__input_image-link"
                value={link}
                onChange={handleLinkUpdate}
                required />
            <span className="place-image-input-error popup__input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;