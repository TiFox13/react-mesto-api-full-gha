import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function PreDeletePopup({deletedCard, onDeleteCard, isOpen, onClose}) {

  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard(deletedCard);
  } 

  return (
    <PopupWithForm buttonText="Да" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title={'Вы уверены?'} name={'pre-delete'} />
  )
}

export default PreDeletePopup;