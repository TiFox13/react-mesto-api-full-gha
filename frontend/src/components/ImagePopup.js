
import React from 'react';

function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup-image popup_big-image ${card.link ? "popup_opened" : ""}`}>
      <div className=" popup-image__container">
        <button type="button" className="close-button close-button_big-image-popup" onClick={onClose} aria-label="закрыть."></button>
        <div className="popup-image__content">
          <img className="popup-image__image" src={card.link} alt={card.name} />
          <p className="popup-image__place-info">{card.name}</p>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup;