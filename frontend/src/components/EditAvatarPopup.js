import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {

  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      link: avatarRef.current.value,
    });
  } 

  React.useEffect(() => {
    avatarRef.current.value=''
}, [isOpen]);

  return (
    <PopupWithForm buttonText="Сохранить" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title={'Обновить аватар'} name={'new-avatar'}>
      <label className = "form__input-field">
        <input ref={avatarRef} type="url" id="avatar-image-input" className="form__item form__item_content_avatar-image" name="link" placeholder="Ссылка на картинку" required />
        <span className = "form__item-error avatar-image-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;



