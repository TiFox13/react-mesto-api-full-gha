import React from "react";

function Card({deletedCard, onCardDelete, onCardLike, onCardClick, card, user}) {

  const isOwn = (card.owner._id === user);
  const isLiked = card.likes.some(i => i._id === user);
  const cardLikeButtonClassName = ( 
    `like ${isLiked && 'like_active'}` 
  );
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
    deletedCard(card)
  }

  return (
    <article className="element">
      {isOwn && <button className="trash-button" aria-label="удалить."  onClick={handleDeleteClick} />}
      <div className="element__img-container" onClick={handleClick}>
        <img className="element__photo" src={card.link} alt={card.name} />
      </div>
      <div className="element__info">
        <h2 className="element__text">{card.name}</h2>
        <div className="like-area">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="нравится, лайк."></button>
          <p className="like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;