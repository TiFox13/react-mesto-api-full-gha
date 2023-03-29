import React from 'react';
import {Route, Routes, useNavigate, Link } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js'
import * as Auth from '../utils/Auth.js'

import logo from '../logo.svg';

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import {CurrentCardContext} from '../contexts/CurrentCardContext.js'
import { api } from '../utils/Api.js'

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PreDeletePopup from './PreDeletePopup.js';



function App() {
  //переменные состояния (пользователь и массив карточек)
  const [currentUser, setCurrentUser] = React.useState([]);
  const [currentCard, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState({})
  const  [infoTooltipOpen, setInfoTooltipOpened] = React.useState(false);
  const [statusForInfoTooltip, setStatusForInfoTooltip] =React.useState('')

  //Забираем с сервера данные о пользователе
  React.useEffect(() => {
    if (loggedIn) {      //если loggedIn изменяется, то надо запустить этот useEffect, но исполнить запрос ТОЛЬКО если  loggedIn будет true
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
    }
  }, [loggedIn])

  // забираем с сервера карточки
  React.useEffect(() => {
    if (loggedIn) {      //если loggedIn изменяется, то надо запустить этот useEffect, но исполнить запрос ТОЛЬКО если  loggedIn будет true
    api.getInitialCards()
      .then((res) => {
        setCards(res)
        
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
    }
  }, [loggedIn] )

  // переменные состояния попапов ( открыты или нет?)
  const [editProfileOpen, setEditProfileOpened] = React.useState(false);
  const [addPlaceOpen, setAddPlaceOpened] = React.useState(false);
  const [editAvatarOpen, setEditAvatarOpened] = React.useState(false);
  const [preDeleteOpen, setPreDeleteOpened] = React.useState(false);
  // переменная состояния для попапа с картинкой (тут хранится картиночка с карточки, которую мы открываем)
  const [selectedCard, setSelectedCard] = React.useState({});

  //это обработчики событий. конкретно, открытия попапов с формами
  function handleEditAvatarClick() {
    setEditAvatarOpened(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpened(true);
  }

  function handlePreDeleteClick() {
    setPreDeleteOpened(true);
  }

  function handleCardClick(selectedCard)  {
    setSelectedCard(selectedCard);
  }

  // обработчик, закрывающий все попапы
  function closeAllPopups() {
    setEditProfileOpened(false);
    setEditAvatarOpened(false);
    setAddPlaceOpened(false);
    setPreDeleteOpened(false)
    setSelectedCard({});
    setInfoTooltipOpened(false)
  }

  //отправляет на сервер новые данные по юзеру
  function handleUpdateUser (item) {
    api.patchUserInfo(item)
      .then((res) =>{
        setCurrentUser(res)
      })
      .then ((res) => {
        closeAllPopups();  //закроем попап
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }

  //отправляет на сервер данные по новому аватару пользователя
  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
      })
      .then ((res) => {
        closeAllPopups();  //закроем попап
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }

  //отправляет на сервер новую карточку
  function handleAddPlaceSubmit(item) {
    api.addNewCard(item)
      .then ((res) => {
        setCards([res, ...currentCard])
      })
      .then ((res) => {
        closeAllPopups();  //закроем попап
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }



  //ЛАЙКИ
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {    // если не лайкали, то надо лайкнуть!
      api.putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
          console.log(error); // выведем ошибку в консоль
        });
    } else {   //если лайк уже стоит, то надо его снять
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
        .catch((error) => {
          console.log(error); // выведем ошибку в консоль
        })
    }
  }

  //удаление карточки
    //переменная состояния для УДАЛЕНИЯ карточки. ( сюда должна упасть карточка которую мы удаляем)
    const [deletedCard, setDeletedCard] = React.useState({});

    function handleCardDelClick(deletedCard)  {
      setDeletedCard(deletedCard);
    }
  function hendleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
      })
      .then((res) => {
        setCards((state) => state.filter((item) => {
          return item._id !== card._id 
        }) 
        )
      })
      .then((res) => {
        closeAllPopups();  //закроем попап
      })
      .catch((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }

  const navigate = useNavigate(); 
  
  const [massage, setMessage] = React.useState('')

  function handleLogin(email, password ) {
    Auth.login(email, password)
      .then((data) => {      
        if (data.token){
          localStorage.setItem('jwt', data.token)
          setLoggedIn(true)
        }
      })
      .then(()=> {
        Auth.getToken(localStorage.getItem('jwt'))
          .then((res) =>{
            setUser(res.data);
            navigate('/')
          })
      .then(() => {
        
      })
          .catch((error) => {
            console.log(error); // выведем ошибку в консоль
          }) 
    })
      .catch(() => {
        setMessage('Что-то пошло не так! Попоробуйте еще раз.')
        setStatusForInfoTooltip('no')
        handleInfoTooltipOpen()
      })
      setMessage('')  
  }

  function handleInfoTooltipOpen() {
    setInfoTooltipOpened(true);
  }
  
  function handleRegister(email, password) {

    Auth.register(email, password)
      .then(() => {
        setMessage('Вы успешно зарегистрировались!')
        setStatusForInfoTooltip('ok')
        handleInfoTooltipOpen()
      })
      .catch(() => {
        setMessage('Что-то пошло не так! Попоробуйте еще раз.')
        setStatusForInfoTooltip('no')
        handleInfoTooltipOpen()
      })
  }
  
  React.useEffect(() => {
    tokenCheck();
  }, [])


  function tokenCheck() {
    const jwt =localStorage.getItem('jwt');

    if (jwt) {
      Auth.getToken(localStorage.getItem('jwt'))
        .then((res) =>{
          setLoggedIn(true);
          setUser(res.data);
          navigate('/')
          })
        .catch((error) => {
          console.log(error); // выведем ошибку в консоль
        })
    }
  }

  function signOut(){
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }


  return (
    <div className = "page">
      <div className="page__content">
        <Routes>
          <Route path='/sign-up' element={
            <div>
              <Header>
                <Link to='/sign-in' className="link link_header">
                  Войти
                </Link>
              </Header> 
              <Register handleSubmit={handleRegister} />
              <InfoTooltip isOpen={infoTooltipOpen} onClose={closeAllPopups} massage={massage} status={statusForInfoTooltip}/>
            </div>
          }/>

          <Route path='/sign-in' element={
            <div>
              <Header>
                <Link to='/sign-up' className="link link_header">
                  Регистрация
                </Link>
              </Header> 
              <Login handleSubmit={handleLogin}/>
              <InfoTooltip isOpen={infoTooltipOpen} onClose={closeAllPopups} massage={massage} status={statusForInfoTooltip}/>
            </div>
          }/>

          <Route path='/' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
            <CurrentUserContext.Provider value={currentUser}>
              <CurrentCardContext.Provider value={currentCard}> 
                <Header>
                  <div className='header__userEmail-block'>
                    <h3 className='header__userEmail'>{user.email}</h3>
                    <button className="esc" onClick={signOut}>
                      Выйти
                    </button>
                  </div>
                </Header> 
                <Main card={handleCardDelClick} onCardDelete={handlePreDeleteClick} onCardLike={handleCardLike}  onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
                <Footer />

                <EditProfilePopup onUpdateUser={handleUpdateUser}  isOpen={editProfileOpen} onClose={closeAllPopups} /> 
                <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={addPlaceOpen} onClose={closeAllPopups} title={'Новое место'} name={'new-place'} />
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={editAvatarOpen} onClose={closeAllPopups} /> 
                <PreDeletePopup deletedCard={deletedCard} onDeleteCard={hendleCardDelete} isOpen={preDeleteOpen} onClose={closeAllPopups}/> 
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

              </CurrentCardContext.Provider>
            </CurrentUserContext.Provider>  
          }/>
          }/>
        </Routes>
      </div>
    </div>  
  )
}

export default App;

