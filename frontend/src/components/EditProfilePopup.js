import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameUpdate(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionUpdate(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onSubmit({
            profile_name: name,
            profile_job: description
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onCloseClick={props.onCloseClick}
            onClose={props.onClose}
            name={'edit'}
            form={'profileSettings'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input name="name" id="username-input" type="text" placeholder="Ваше имя" className="popup__input" minLength="2" maxLength="40" value={name} onChange={handleNameUpdate} required />
            <span className="username-input-error popup__input-error"></span>
            <input name="about" id="description-input" type="text" placeholder="Ваша профессия" className="popup__input" minLength="2" maxLength="200" value={description} onChange={handleDescriptionUpdate} required />
            <span className="description-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;