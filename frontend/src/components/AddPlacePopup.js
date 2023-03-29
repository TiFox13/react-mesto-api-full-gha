import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup ({onAddCard, isOpen, onClose}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
      setName(e.target.value);
    }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name,
      link
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);

  return (
    <PopupWithForm  buttonText="Создать" isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title={'Новое место'} name={'new-place'}>
      <label className = "form__input-field">
        <input type="text" value={name} onChange={handleChangeName} id="place-name-input" className="form__item form__item_content_place-name" name="name" placeholder="Название" required minLength="2" maxLength="30" />
        <span className = "form__item-error place-name-input-error"></span>
      </label>
      <label className = "form__input-field">
        <input type="url" value={link} onChange={handleChangeLink} id="place-image-input" className="form__item form__item_content_place-image" name="link" placeholder="Ссылка на картинку" required />
        <span className = "form__item-error place-image-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;