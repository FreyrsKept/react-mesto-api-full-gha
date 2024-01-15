import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const ref = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onSubmit({
            avatar_link: ref.current.value
        });
    }

    React.useEffect(() => {
        ref.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onCloseClick={props.onCloseClick}
            onClose={props.onClose}
            name={'avatar'}
            form={'avatarAdd'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input type="url" name="avatar" form="avatar-edit" required placeholder="Ссылка на картинку" className="popup__input popup__input_avatar-link" id="avatar-link-input" ref={ref} />
            <span className="avatar-link-input-error popup__input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup