// вебпак добавит в переменные правильные пути
import logoImage from '../../images/header-logo.svg';
import avatar from '../../images/avatar.jpg';
import trash from '../../images/Trash.svg';
import plus from '../../images/+.svg';
import closeIcon from '../../images/Close-Icon.svg';
import editIcon from '../../images/Edit-Button.svg';
import likeIcon from '../../images/like.svg';
import likeActiveIcon from '../../images/like-active.svg';
import avatarEditIcon from '../../images/avatar-edit-icon.svg';

export const validationConfig = {
  formSelector: '.form',    //form
  inputSelector: '.form__item',   //form__item
  submitButtonSelector: '.save-button',   //у меня ткого вообще нема
  inactiveButtonClass: 'save-button_inactive',
  inputErrorClass: 'form__item_type_error',  //form__item_type_error
  errorClass: 'form__item-error_visible'   //form__item-error-visible?
};

export const images = [
  // меняем исходные пути на переменные
  { name: 'logoImage', image: logoImage },
  { name: 'avatar', link: avatar },
  { name: 'trash', link: trash },
  { name: 'plus', link: plus },
  { name: 'closeIcon', link: closeIcon },
  { name: 'editIcon', link: editIcon },
  { name: 'likeIcon', link: likeIcon },
  { name: 'likeActiveIcon', link: likeActiveIcon },
  { name: 'avatarEditIcon', link: avatarEditIcon },
]; 

export const buttonEdit = document.querySelector('.edit-button'); //кнопка "редактировать"
export const popupEditProfile = document.querySelector('.popup_edit-profile');  //попап редактирования профиля

export const newPlacePopup = document.querySelector('.popup_new-place'); //попап создания карточек
export const newAvatarPopup =  document.querySelector('.popup_new-avatar'); //попап аватарка

export const profileEditForm = popupEditProfile.querySelector('.form');  //вот переменная с формой
export const newPlaceCreateForm = newPlacePopup.querySelector('.form');
export const newAvatarForm = newAvatarPopup.querySelector('.form');
export const nameInput = profileEditForm.querySelector('.form__item_content_name'); //поле формы с именем
export const jobInput = profileEditForm.querySelector('.form__item_content_about'); //поле формы с доп инфой

export const newPlaceAddButton = document.querySelector('.add-button');  // Это кнопка добавления нового места

export const avatarEditbutton = document.querySelector('.avatar-button');   // кнопочка с аватаром

export const avatarImage = avatarEditbutton.querySelector('.profile__avatar')

