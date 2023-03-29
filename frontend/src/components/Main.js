import React from 'react';

import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import {CurrentCardContext} from '../contexts/CurrentCardContext.js'

function Main({card, onCardDelete, onCardLike, onCardClick, onAddPlace, onEditAvatar, onEditProfile }) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentCard = React.useContext(CurrentCardContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button type="button" onClick={onEditAvatar} className="avatar-button" aria-label="добавить."><img className="profile__avatar" src={currentUser.avatar} alt='аватар пользователя.' /></button>

          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" onClick={onEditProfile} className="edit-button" aria-label="редактировать профиль."></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="add-button" onClick={onAddPlace} aria-label="добавить."></button>
      </section>

      <section className="elements">
        {currentCard.map((item) => (
          <Card  deletedCard={card} onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} card={item} key={item._id} user={currentUser._id} />
        )
        )}

      </section>
    </main>
  )
}

export default Main;