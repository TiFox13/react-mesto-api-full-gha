
import React from 'react';

function PopupWithForm({onSubmit, buttonText, isOpen, onClose, title, name, children }) {

  return (
    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <div className='popup__container'>
        <button type="button" onClick={onClose} className="close-button" aria-label="закрыть."></button>
        <form className='form' name={name || ''} method='post' onSubmit={onSubmit}>
          <h2 className="form__heading">{title}</h2>
          {children}
          <input type="submit"  className="save-button" value={buttonText || ''} aria-label="создать." />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
