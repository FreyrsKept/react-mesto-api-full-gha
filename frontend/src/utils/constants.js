// Список классов для валидации
export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_type_visible',
  };

  // переменные для карточек
export const popupAddCardSelector = '.popup_type_add-card';
export const profileButtonAdd = document.querySelector('.profile__add');
export const cardsContainerSelector = '.cards__list';
export const deleteCardPopupSelector = '.popup_type_card-delete';

// переменные для изменения профиля
export const editAvatarPopupSelector = '.popup_type_avatar-edit';
export const profileAvatarEdit = document.querySelector('.profile__avatar-edit');
export const editProfilePopupSelector = '.popup_type_profile';
export const profileButtonEdit = document.querySelector('.profile__name-edit');

// переменные для попапа с просмотром
export const viewPopup = '.popup_type_image-view';