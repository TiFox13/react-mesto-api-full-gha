import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function EditProfilePopup({onUpdateUser, isOpen, onClose}) {

  const currentUser = React.useContext(CurrentUserContext); //ПОдписка на юзера)

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

   return(
    <PopupWithForm buttonText="Сохранить" isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose}  title ={'Редактировать профиль'} name={'edit-profile'}>
      <label className = "form__input-field">
        <input value={name || ''} onChange={handleChangeName} type="text" id ="account-name-input" className="form__item form__item_content_name" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
        <span className = "form__item-error account-name-input-error"></span>
      </label>
      <label className = "form__input-field">
        <input value={description || ''} onChange={handleChangeDescription} type="text" id ="account-about-input" className="form__item form__item_content_about" name="about" placeholder="О себе" required minLength="2" maxLength="200" />
        <span className = "form__item-error account-about-input-error"></span>
      </label>
    </PopupWithForm> 
   )
}

export default EditProfilePopup;